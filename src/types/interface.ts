import { LoginScreenNavigationProp } from "./types";

export interface Customer {
    id?: string;
    name: string;
    email: string;
    phoneNumber: string;
    activeStatus?: boolean;
    [key: string]: any;
}

export interface Supplier {
    id?: string;
    name: string;
    email: string;
    phoneNumber: string;
    activeStatus?: boolean;
    [key: string]: any;
}
export interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

export const MainLogo = require("../../assets/MainLogo.png");
