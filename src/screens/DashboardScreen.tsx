import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { logout } from '../../Service/AuthService';
import Button from '../components/Button';
import Header from '../components/Header';

type DashboardStackParamList = {
  DashboardHome: undefined;
  ScreenA: undefined;
  ScreenB: undefined;
  ScreenC: undefined;
};

type RootStackParamList = {
  Auth: undefined;
  Dashboard: undefined;
};

type DashboardScreenNavigationProp = NativeStackNavigationProp<
  DashboardStackParamList,
  'DashboardHome'
>;

interface DashboardScreenProps {
  navigation: any; // Combined navigation prop
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Auth' }],
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Dashboard"
        subtitle="Welcome to StockPro"
        showIcon={true}
        iconName="grid"
        iconColor="#2196f3"
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Welcome Card */}
        <LinearGradient
          colors={['#2196f3', '#1e88e5']} // primary-500 to primary-600
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.welcomeCard}
        >
          <View style={styles.welcomeCardContent}>
            <Icon name="person-circle" size={50} color="#fff" />
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeTitle}>
                Hello, Trader!
              </Text>
              <Text style={styles.welcomeSubtitle}>
                Ready to explore?
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Navigation Cards */}
        <Text style={styles.sectionTitle}>
          Explore Screens
        </Text>

        {/* Screen A Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconCircle, { backgroundColor: '#dbeafe' }]}>
              <Icon name="analytics" size={28} color="#2196f3" />
            </View>
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>Screen A</Text>
              <Text style={styles.cardSubtitle}>
                Analytics & Reports
              </Text>
            </View>
          </View>
          <Button
            title="Open Screen A"
            onPress={() => navigateToScreen('ScreenA')}
            variant="primary"
          />
        </View>

        {/* Screen B Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconCircle, { backgroundColor: '#dcfce7' }]}>
              <Icon name="stats-chart" size={28} color="#4caf50" />
            </View>
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>Screen B</Text>
              <Text style={styles.cardSubtitle}>
                Market Statistics
              </Text>
            </View>
          </View>
          <Button
            title="Open Screen B"
            onPress={() => navigateToScreen('ScreenB')}
            variant="primary"
          />
        </View>

        {/* Screen C Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconCircle, { backgroundColor: '#f3e8ff' }]}>
              <Icon name="settings" size={28} color="#9c27b0" />
            </View>
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>Screen C</Text>
              <Text style={styles.cardSubtitle}>
                Settings & Preferences
              </Text>
            </View>
          </View>
          <Button
            title="Open Screen C"
            onPress={() => navigateToScreen('ScreenC')}
            variant="primary"
          />
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="danger"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb', // gray-50
  },
  scrollContent: {
    padding: 24, // p-6
  },
  welcomeCard: {
    borderRadius: 16, // rounded-2xl
    padding: 24, // p-6
    marginBottom: 24, // mb-6
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4, // shadow-lg
  },
  welcomeCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12, // mb-3
  },
  welcomeTextContainer: {
    marginLeft: 16, // ml-4
    flex: 1,
  },
  welcomeTitle: {
    color: 'white',
    fontSize: 20, // text-xl
    fontWeight: 'bold',
  },
  welcomeSubtitle: {
    color: '#bbdefb', // primary-100
    fontSize: 14, // text-sm
  },
  sectionTitle: {
    fontSize: 18, // text-lg
    fontWeight: 'bold',
    color: '#1f2937', // gray-800
    marginBottom: 16, // mb-4
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12, // rounded-xl
    padding: 20, // p-5
    marginBottom: 16, // mb-4
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2, // shadow-md
    borderWidth: 1,
    borderColor: '#f3f4f6', // gray-100
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12, // mb-3
  },
  iconCircle: {
    padding: 12, // p-3
    borderRadius: 9999, // rounded-full
  },
  cardHeaderText: {
    marginLeft: 16, // ml-4
    flex: 1,
  },
  cardTitle: {
    fontSize: 18, // text-lg
    fontWeight: 'bold',
    color: '#1f2937', // gray-800
  },
  cardSubtitle: {
    fontSize: 14, // text-sm
    color: '#6b7280', // gray-500
  },
  logoutContainer: {
    marginTop: 16,
    marginBottom: 32,
  },
});

export default DashboardScreen;
