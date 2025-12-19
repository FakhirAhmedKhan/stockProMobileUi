import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Auth: undefined;
  Dashboard: undefined;
};

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Auth"
>;