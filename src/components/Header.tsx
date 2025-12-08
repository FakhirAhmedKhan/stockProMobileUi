import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showIcon?: boolean;
  iconName?: string;
  iconColor?: string;
  style?: ViewStyle;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showIcon = false,
  iconName = 'apps',
  iconColor = '#2196f3',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        {showIcon && (
          <View style={styles.iconContainer}>
            <Icon name={iconName} size={28} color={iconColor} />
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && (
            <Text style={styles.subtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 16, // py-4
    paddingHorizontal: 24, // px-6
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb', // border-gray-200
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12, // mr-3
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24, // text-2xl
    fontWeight: 'bold',
    color: '#1f2937', // gray-800
  },
  subtitle: {
    fontSize: 14, // text-sm
    color: '#6b7280', // gray-500
    marginTop: 4, // mt-1
  },
});

export default Header;
