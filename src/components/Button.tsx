import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  ...props
}) => {
  const getButtonStyles = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryButton;
      case 'secondary':
        return styles.secondaryButton;
      case 'danger':
        return styles.dangerButton;
      case 'outline':
        return styles.outlineButton;
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyles = () => {
    if (variant === 'outline') {
      return styles.outlineText;
    }
    return styles.text;
  };

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.baseButton,
        getButtonStyles(),
        isDisabled && styles.disabledButton,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? '#2196f3' : '#ffffff'}
          size="small"
        />
      ) : (
        <Text style={getTextStyles()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    paddingVertical: 16, // py-4
    paddingHorizontal: 24, // px-6
    borderRadius: 8, // rounded-lg
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#1e88e5', // primary-600
  },
  secondaryButton: {
    backgroundColor: '#d81b60', // secondary-600
  },
  dangerButton: {
    backgroundColor: '#dc2626', // red-600
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#1e88e5', // primary-600
  },
  disabledButton: {
    opacity: 0.5,
  },
  text: {
    color: 'white',
    fontSize: 16, // text-base
    fontWeight: '600', // font-semibold
  },
  outlineText: {
    color: '#1e88e5', // primary-600
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button;
