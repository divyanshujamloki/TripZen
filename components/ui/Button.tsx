import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
}

const variants = {
  primary: 'bg-white text-black hover:bg-[#e8e8ed] active:bg-[#d2d2d7]',
  secondary: 'border border-white/30 text-white hover:bg-white/10 active:bg-white/5',
  ghost: 'text-[#a1a1a6] hover:text-white hover:bg-white/5',
  link: 'text-white underline-offset-4 hover:underline p-0',
};

const sizes = {
  sm: 'px-4 py-2 text-xs sm:text-sm rounded-full',
  md: 'px-6 py-2.5 text-sm sm:text-base rounded-full',
  lg: 'px-8 py-3.5 text-base sm:text-lg rounded-full',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${variant !== 'link' ? sizes[size] : ''} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = 'Button';
export default Button;
