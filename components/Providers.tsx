'use client';

import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../redux/store';
import { loginSuccess } from '../redux/slices/authSlice';

function AuthHydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('tripzen_token');
    if (!token) return;

    fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.user) dispatch(loginSuccess({ user: data.user, token }));
      })
      .catch(() => localStorage.removeItem('tripzen_token'));
  }, [dispatch]);

  return <>{children}</>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthHydrator>{children}</AuthHydrator>
    </Provider>
  );
}
