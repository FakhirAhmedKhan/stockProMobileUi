import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SideNav from '../components/SideNav';
import CustomerScreen from '../screens/CustomerScreen';
import DashboardScreen from '../screens/DashboardScreen';
import InvoiceScreen from '../screens/InvoiceScreen';
import OrdersScreen from '../screens/OrdersScreen';
import {ProductDetailScreen} from '../screens/ProductScreen/ProductDetailScreen';
import ProductScreen from '../screens/ProductScreen/ProductScreen';
import ProfileScreen from '../screens/ProfileScreen';
import StockDetailScreen from '../screens/StockDetailTabs/StockDetailScreen';
import StockScreen from '../screens/StockScreen';
import SuppliersScreen from '../screens/SuppliersScreen';

export type DashboardTabParamList = {
  DashboardHome: undefined;
  Suppliers: undefined;
  Customer: undefined;
  Stock: undefined;
  Product: undefined;
  Orders: undefined;
  Invoice: undefined;
  Profile: undefined;
  StockDetails: { stockId: string };
  ProductDetails: { id: string };
};

const Stack = createNativeStackNavigator<DashboardTabParamList>();

const DashboardNavigator: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <SideNav open={open} onClose={() => setOpen(false)} />

      <Stack.Navigator
        initialRouteName="DashboardHome"
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: '#fff' },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingHorizontal: 12 }}
              onPress={() => setOpen(prev => !prev)}
            >
              <Icon name="menu" size={24} color="#111827" />
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen name="DashboardHome" component={DashboardScreen} options={{ title: 'Dashboard' }} />
        <Stack.Screen name="Suppliers" component={SuppliersScreen} options={{ title: 'Suppliers' }} />
        <Stack.Screen name="Customer" component={CustomerScreen} options={{ title: 'Customers' }} />
        <Stack.Screen name="Stock" component={StockScreen} options={{ title: 'Stock' }} />
        <Stack.Screen name="Product" component={ProductScreen} options={{ title: 'Product' }} />
        <Stack.Screen name="ProductDetails" component={ProductDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Orders" component={OrdersScreen} options={{ title: 'Orders' }} />
        <Stack.Screen name="Invoice" component={InvoiceScreen} options={{ title: 'Invoice' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        <Stack.Screen name="StockDetails" component={StockDetailScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </View>
  );
};

export default DashboardNavigator;
