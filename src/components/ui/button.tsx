import type { ReactNode } from 'react';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, Text } from 'react-native';

export type ButtonVariant = 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link';
export type ButtonSize = 'default' | 'xs' | 'sm' | 'lg' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg';

export type ButtonProps = PressableProps & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  children,
  variant = 'default',
  size = 'default',
  style,
  ...props
}: ButtonProps) {
  const variantStyles = {
    default: styles.default,
    outline: styles.outline,
    secondary: styles.secondary,
    ghost: styles.ghost,
    destructive: styles.destructive,
    link: styles.link,
  } as const;

  const sizeStyles = {
    default: styles.sizeDefault,
    xs: styles.sizeXs,
    sm: styles.sizeSm,
    lg: styles.sizeLg,
    icon: styles.sizeIcon,
    'icon-xs': styles.sizeIconXs,
    'icon-sm': styles.sizeIconSm,
    'icon-lg': styles.sizeIconLg,
  } as const;

  return (
    <Pressable
      accessibilityRole="button"
      style={[styles.base, variantStyles[variant], sizeStyles[size], style]}
      {...props}
    >
      <Text style={[styles.label, variant === 'link' && styles.linkLabel]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  default: {
    backgroundColor: '#111827',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  secondary: {
    backgroundColor: '#f3f4f6',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  destructive: {
    backgroundColor: '#fee2e2',
  },
  link: {
    backgroundColor: 'transparent',
  },
  sizeDefault: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  sizeXs: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  sizeSm: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  sizeLg: {
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  sizeIcon: {
    width: 36,
    height: 36,
  },
  sizeIconXs: {
    width: 24,
    height: 24,
  },
  sizeIconSm: {
    width: 32,
    height: 32,
  },
  sizeIconLg: {
    width: 40,
    height: 40,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  linkLabel: {
    color: '#111827',
  },
});

export const buttonVariants = {};

