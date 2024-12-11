import { ComponentProps } from 'react';

import { classNames } from '#core/react';
import { Link, LinkProps } from '#routing/react';

export type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary';
  link?: LinkProps;
};

export const Button = ({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  link,
  ...props
}: ButtonProps) => {
  // const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors';
  const baseStyles =
    'ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
  const getVariantClassName = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  };

  if (link) {
    return (
      <Link
        className={classNames(
          baseStyles,
          getVariantClassName[variant],
          className,
        )}
        {...link}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classNames(
        baseStyles,
        getVariantClassName[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
