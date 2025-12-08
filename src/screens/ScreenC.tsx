import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import Header from '../components/Header';

const ScreenC: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <Header
        title="Screen C"
        subtitle="Settings & Preferences"
        showIcon={true}
        iconName="settings"
        iconColor="#9c27b0"
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <LinearGradient
          colors={['#a855f7', '#9333ea']} // purple-500 to purple-600
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.heroSection}
        >
          <View style={styles.heroHeader}>
            <Icon name="construct" size={40} color="#fff" />
            <Text style={styles.heroTitle}>
              Customize Your Experience
            </Text>
          </View>
          <Text style={styles.heroDescription}>
            Personalize your app settings and preferences to match your trading
            style.
          </Text>
        </LinearGradient>

        {/* Account Settings */}
        <Text style={styles.sectionTitle}>
          Account Settings
        </Text>

        <View style={styles.settingsGroup}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="person-circle" size={24} color="#2196f3" />
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Profile</Text>
                <Text style={styles.settingSubtitle}>Manage your account</Text>
              </View>
            </View>
            <Icon name="chevron-forward" size={20} color="#999" />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="shield-checkmark" size={24} color="#4caf50" />
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Security</Text>
                <Text style={styles.settingSubtitle}>Password & authentication</Text>
              </View>
            </View>
            <Icon name="chevron-forward" size={20} color="#999" />
          </View>

          <View style={[styles.settingItem, { borderBottomWidth: 0 }]}>
            <View style={styles.settingLeft}>
              <Icon name="card" size={24} color="#ff9800" />
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Payment Methods</Text>
                <Text style={styles.settingSubtitle}>Manage payment options</Text>
              </View>
            </View>
            <Icon name="chevron-forward" size={20} color="#999" />
          </View>
        </View>

        {/* App Preferences */}
        <Text style={styles.sectionTitle}>
          App Preferences
        </Text>

        <View style={styles.settingsGroup}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="notifications" size={24} color="#2196f3" />
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Notifications</Text>
                <Text style={styles.settingSubtitle}>Push notifications</Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#d1d5db', true: '#90caf9' }}
              thumbColor={notificationsEnabled ? '#2196f3' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="moon" size={24} color="#9c27b0" />
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Dark Mode</Text>
                <Text style={styles.settingSubtitle}>Enable dark theme</Text>
              </View>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#d1d5db', true: '#ce93d8' }}
              thumbColor={darkModeEnabled ? '#9c27b0' : '#f4f3f4'}
            />
          </View>

          <View style={[styles.settingItem, { borderBottomWidth: 0 }]}>
            <View style={styles.settingLeft}>
              <Icon name="finger-print" size={24} color="#4caf50" />
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Biometric Login</Text>
                <Text style={styles.settingSubtitle}>Use fingerprint/face ID</Text>
              </View>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: '#d1d5db', true: '#a5d6a7' }}
              thumbColor={biometricEnabled ? '#4caf50' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Support Section */}
        <Text style={styles.sectionTitle}>
          Support & About
        </Text>

        <View style={styles.settingsGroup}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="help-circle" size={24} color="#2196f3" />
              <Text style={[styles.settingTitle, { marginLeft: 12 }]}>
                Help Center
              </Text>
            </View>
            <Icon name="chevron-forward" size={20} color="#999" />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="document-text" size={24} color="#ff9800" />
              <Text style={[styles.settingTitle, { marginLeft: 12 }]}>
                Terms & Privacy
              </Text>
            </View>
            <Icon name="chevron-forward" size={20} color="#999" />
          </View>

          <View style={[styles.settingItem, { borderBottomWidth: 0 }]}>
            <View style={styles.settingLeft}>
              <Icon name="information-circle" size={24} color="#9c27b0" />
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>App Version</Text>
                <Text style={styles.settingSubtitle}>v1.0.0</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            title="Save Preferences"
            onPress={() => {}}
            variant="primary"
            style={{ marginBottom: 16 }}
          />

          <Button
            title="Reset to Defaults"
            onPress={() => {}}
            variant="outline"
            style={{ marginBottom: 32 }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    padding: 24, // p-6
  },
  heroSection: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  heroDescription: {
    color: '#f3e8ff', // purple-100
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  settingsGroup: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24, // mb-6
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingInfo: {
    marginLeft: 12, // ml-3
  },
  settingTitle: {
    fontSize: 16, // text-base
    fontWeight: '600',
    color: '#1f2937', // gray-800
  },
  settingSubtitle: {
    fontSize: 12, // text-xs
    color: '#6b7280', // gray-500
  },
  actionButtons: {
    marginTop: 8,
  },
});

export default ScreenC;
