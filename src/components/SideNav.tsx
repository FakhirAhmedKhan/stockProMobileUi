import { FileText, Home, Package, Settings, ShoppingBag, Users } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { navigate, navigationRef } from '../navigation/NavigationService';

const { width: WINDOW_WIDTH } = Dimensions.get('window');
const NAV_WIDTH = Math.min(300, Math.floor(WINDOW_WIDTH * 0.72));

interface SideNavProps {
  open: boolean;
  onClose: () => void;
}

const MenuItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  routeName: string;
  onPress?: () => void;
}> = ({ label, icon, routeName, onPress }) => {
  const handlePress = () => {
    // Check if navigation is ready and attempt to navigate via NavigationService
    // This avoids "no navigation context" errors
    if (navigationRef.isReady()) {
      navigate(routeName);
    }
    onPress?.();
  };

  return (
    <TouchableOpacity style={styles.menuItem} onPress={handlePress}>
      <View style={styles.iconWrap}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const SideNav: React.FC<SideNavProps> = ({ open, onClose }) => {
  const translateX = useRef(new Animated.Value(-NAV_WIDTH)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: open ? 0 : -NAV_WIDTH,
      duration: 240,
      useNativeDriver: true,
    }).start();
  }, [open, translateX]);

  return (
    <>
      {/* backdrop */}
      {open && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          style={styles.backdrop}
        />
      )}

      <Animated.View
        style={[
          styles.container,
          { width: NAV_WIDTH, transform: [{ translateX }] },
        ]}
      >
        <View style={styles.brandWrap}>
          <Text style={styles.brand}>StockPro</Text>
          <Text style={styles.brandSub}>Inventory</Text>
        </View>

        <View style={styles.menu}>
          <MenuItem label="Home" icon={<Home size={18} color="#374151" />} routeName="DashboardHome" onPress={onClose} />
          <MenuItem label="Stock" icon={<Package size={18} color="#374151" />} routeName="Stock" onPress={onClose} />
          <MenuItem label="Product" icon={<ShoppingBag size={18} color="#374151" />} routeName="Product" onPress={onClose} />
          <MenuItem label="Orders" icon={<FileText size={18} color="#374151" />} routeName="Orders" onPress={onClose} />
          <MenuItem label="Customers" icon={<Users size={18} color="#374151" />} routeName="Customer" onPress={onClose} />
          <MenuItem label="Supplier" icon={<Package size={18} color="#374151" />} routeName="Suppliers" onPress={onClose} />
          <MenuItem label="Invoice" icon={<FileText size={18} color="#374151" />} routeName="Invoice" onPress={onClose} />
          <MenuItem label="Profile" icon={<Settings size={18} color="#374151" />} routeName="Profile" onPress={onClose} />
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
    paddingTop: 40,
    paddingHorizontal: 12,
    zIndex: 40,
    elevation: 10,
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 30,
  },
  brandWrap: {
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    marginBottom: 8,
  },
  brand: { fontSize: 20, fontWeight: '700', color: '#111827' },
  brandSub: { fontSize: 12, color: '#6b7280' },
  menu: { marginTop: 12 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  iconWrap: { width: 28, alignItems: 'center' },
  label: { marginLeft: 12, fontSize: 16, color: '#374151', fontWeight: '600' },
});

export default SideNav;
