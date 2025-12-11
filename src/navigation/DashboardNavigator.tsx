import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BarChart3, LayoutDashboard, Settings, Users } from 'lucide-react-native';
import React from 'react';
import DashboardScreen from '../screens/DashboardScreen';
import ScreenB from '../screens/ScreenB';
import ScreenC from '../screens/ScreenC';
import SuppliersScreen from '../screens/SuppliersScreen';

export type DashboardTabParamList = {
  DashboardHome: undefined;
  Suppliers: undefined;
  ScreenB: undefined;
  ScreenC: undefined;
};

const Tab = createBottomTabNavigator<DashboardTabParamList>();

const DashboardNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'DashboardHome') {
            return <LayoutDashboard size={size} color={color} />;
          } else if (route.name === 'Suppliers') {
            return <Users size={size} color={color} />;
          } else if (route.name === 'ScreenB') {
            return <BarChart3 size={size} color={color} />;
          } else if (route.name === 'ScreenC') {
            return <Settings size={size} color={color} />;
          }
          return null;
        },
        tabBarActiveTintColor: '#3b82f6', // blue-500
        tabBarInactiveTintColor: '#9ca3af', // gray-400
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb', // gray-200
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen
        name="DashboardHome"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
        }}
      />
      <Tab.Screen
        name="Suppliers"
        component={SuppliersScreen}
        options={{
          tabBarLabel: 'Suppliers',
        }}
      />
      <Tab.Screen
        name="ScreenB"
        component={ScreenB}
        options={{
          tabBarLabel: 'Markets',
        }}
      />
      <Tab.Screen
        name="ScreenC"
        component={ScreenC}
        options={{
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardNavigator;
