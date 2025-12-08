import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import DashboardScreen from '../screens/DashboardScreen';
import ScreenA from '../screens/ScreenA';
import ScreenB from '../screens/ScreenB';
import ScreenC from '../screens/ScreenC';

export type DashboardTabParamList = {
  DashboardHome: undefined;
  ScreenA: undefined;
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
          let iconName: string = 'home';

          if (route.name === 'DashboardHome') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'ScreenA') {
            iconName = focused ? 'analytics' : 'analytics-outline';
          } else if (route.name === 'ScreenB') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'ScreenC') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196f3',
        tabBarInactiveTintColor: '#9e9e9e',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
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
        name="ScreenA"
        component={ScreenA}
        options={{
          tabBarLabel: 'Analytics',
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
