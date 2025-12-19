import CustomersTab from "@/screens/StockDetailTabs/CustomersTab";
import ImagesTab from "@/screens/StockDetailTabs/ImagesTab";
import OrdersTab from "@/screens/StockDetailTabs/OrdersTab";
import ProductTab from "@/screens/StockDetailTabs/ProductTab";
import RepairsTab from "@/screens/StockDetailTabs/RepairsTab";
import ReturnsTab from "@/screens/StockDetailTabs/ReturnsTab";
import { Dimensions } from "react-native";

export const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  emerald: "bg-emerald-100 text-emerald-600",
  purple: "bg-purple-100 text-purple-600",
  orange: "bg-orange-100 text-orange-600",
  red: "bg-red-100 text-red-600",
  rose: "bg-rose-100 text-rose-600",
};

export const { width } = Dimensions.get('window');

export const TABS = [
  { id: 'Products', label: 'Products', icon: 'cube-outline', component: ProductTab },
  { id: 'Orders', label: 'Orders', icon: 'cart-outline', component: OrdersTab },
  { id: 'Customers', label: 'Customers', icon: 'people-outline', component: CustomersTab },
  { id: 'Returns', label: 'Returns', icon: 'return-up-back-outline', component: ReturnsTab },
  { id: 'Repairs', label: 'Repairs', icon: 'hammer-outline', component: RepairsTab },
  { id: 'Images', label: 'Images', icon: 'images-outline', component: ImagesTab },
];

export const categoryOptions = ["Mobile", "Electronics", "Clothing", "Food", "Books", "Furniture"]


export const storageOptions = ['64GB', '128GB', '256GB', '512GB', '1TB']
export const colorOptions = [
  'Space Black',
  'Silver',
  'Gold',
  'Blue',
  'Pink',
  'Graphite',
  'Purple',
]
export const conditionOptions = ['Excellent', 'Good', 'Fair', 'Poor']