export type FieldErrors<T extends string> = Partial<Record<T, string>>;

export function validateName(name: string): string | undefined {
  const trimmed = name.trim();
  if (!trimmed) return 'Full name is required';
  if (trimmed.length < 2) return 'Name must be at least 2 characters';
  if (trimmed.length > 80) return 'Name must be 80 characters or less';
  if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) return 'Name can only contain letters, spaces, and . \' -';
  return undefined;
}

export function validateEmail(email: string): string | undefined {
  const trimmed = email.trim();
  if (!trimmed) return 'Email is required';
  if (trimmed.length > 254) return 'Email is too long';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'Enter a valid email address';
  return undefined;
}

export function validatePhone(phone: string, optional = true): string | undefined {
  const trimmed = phone.trim();
  if (!trimmed) return optional ? undefined : 'Phone number is required';
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) return 'Enter a valid phone number (10–15 digits)';
  return undefined;
}

export function validatePassword(password: string): string | undefined {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (password.length > 128) return 'Password is too long';
  if (!/[a-z]/.test(password)) return 'Include at least one lowercase letter';
  if (!/[A-Z]/.test(password)) return 'Include at least one uppercase letter';
  if (!/[0-9]/.test(password)) return 'Include at least one number';
  if (!/[^a-zA-Z0-9]/.test(password)) return 'Include at least one special character';
  return undefined;
}

export function validateConfirmPassword(password: string, confirm: string): string | undefined {
  if (!confirm) return 'Please confirm your password';
  if (password !== confirm) return 'Passwords do not match';
  return undefined;
}

export function validateLoginPassword(password: string): string | undefined {
  if (!password) return 'Password is required';
  return undefined;
}

export function validateMessage(message: string, min = 10, max = 2000): string | undefined {
  const trimmed = message.trim();
  if (!trimmed) return 'Message is required';
  if (trimmed.length < min) return `Message must be at least ${min} characters`;
  if (trimmed.length > max) return `Message must be ${max} characters or less`;
  return undefined;
}

export interface SignupFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export function validateSignupForm(data: SignupFormData): FieldErrors<keyof SignupFormData> {
  const errors: FieldErrors<keyof SignupFormData> = {};

  const fullName = validateName(data.fullName);
  if (fullName) errors.fullName = fullName;

  const email = validateEmail(data.email);
  if (email) errors.email = email;

  const phone = validatePhone(data.phone, true);
  if (phone) errors.phone = phone;

  const password = validatePassword(data.password);
  if (password) errors.password = password;

  const confirmPassword = validateConfirmPassword(data.password, data.confirmPassword);
  if (confirmPassword) errors.confirmPassword = confirmPassword;

  return errors;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export function validateLoginForm(data: LoginFormData): FieldErrors<keyof LoginFormData> {
  const errors: FieldErrors<keyof LoginFormData> = {};

  const email = validateEmail(data.email);
  if (email) errors.email = email;

  const password = validateLoginPassword(data.password);
  if (password) errors.password = password;

  return errors;
}
