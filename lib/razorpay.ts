import { apiJson } from './apiClient';

export interface CreateOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  mock?: boolean;
}

export interface RazorpaySuccessResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayCheckoutOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  handler: (response: RazorpaySuccessResponse) => void;
  modal?: { ondismiss?: () => void };
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => { open: () => void };
  }
}

async function verifyMock(bookingId: string, orderId: string, token: string) {
  const { ok, data } = await apiJson<{ message?: string }>('/api/payments/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      bookingId,
      razorpayOrderId: orderId,
      razorpayPaymentId: `pay_mock_${Date.now()}`,
      razorpaySignature: 'mock',
    }),
  });
  if (!ok) throw new Error(data.message || 'Payment verification failed');
  return data;
}

/** Opens Razorpay Checkout and verifies payment on success. Mock flow only when orderData.mock is true. */
export async function payWithRazorpay(
  orderData: CreateOrderResponse,
  bookingId: string,
  token: string,
  options?: { description?: string; onDismiss?: () => void }
): Promise<unknown> {
  if (orderData.mock) {
    return verifyMock(bookingId, orderData.orderId, token);
  }

  if (orderData.orderId.startsWith('order_mock_')) {
    throw new Error('This booking has an invalid payment session. Please book the trip again.');
  }

  if (!window.Razorpay) {
    throw new Error('Razorpay checkout failed to load. Please refresh and try again.');
  }

  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay!({
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      order_id: orderData.orderId,
      name: 'TripZen',
      description: options?.description ?? 'Trip Booking',
      handler: async (response) => {
        try {
          const { ok, data } = await apiJson<{ message?: string; success?: boolean }>(
            '/api/payments/verify',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                bookingId,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            }
          );
          if (!ok) throw new Error(data.message || 'Payment verification failed');
          resolve(data);
        } catch (err) {
          reject(err);
        }
      },
      modal: {
        ondismiss: () => {
          options?.onDismiss?.();
          reject(new Error('Payment cancelled'));
        },
      },
    });
    rzp.open();
  });
}
