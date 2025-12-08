import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AuthNavigator from './AuthNavigator';
import DashboardNavigator from './DashboardNavigator';

export type RootStackParamList = {
  Auth: undefined;
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
      initialRouteName="Auth"
    >
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Dashboard" component={DashboardNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
