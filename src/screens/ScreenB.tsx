import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';

const ScreenB: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header
        title="Screen B"
        subtitle="Market Statistics"
        showIcon={true}
        iconName="stats-chart"
        iconColor="#4caf50"
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <LinearGradient
          colors={['#22c55e', '#16a34a']} // green-500 to green-600
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.heroSection}
        >
          <View style={styles.heroHeader}>
            <Icon name="pulse" size={40} color="#fff" />
            <Text style={styles.heroTitle}>
              Market Overview
            </Text>
          </View>
          <Text style={styles.heroDescription}>
            Stay updated with real-time market statistics and trading volumes
            across all major exchanges.
          </Text>
        </LinearGradient>

        {/* Market Stats Grid */}
        <View style={styles.gridContainer}>
          <View style={styles.gridRow}>
            <View style={[styles.statCard, { marginRight: 8 }]}>
              <Icon name="globe" size={24} color="#2196f3" />
              <Text style={styles.statValue}>145</Text>
              <Text style={styles.statLabel}>Markets</Text>
            </View>

            <View style={[styles.statCard, { marginLeft: 8 }]}>
              <Icon name="people" size={24} color="#ff9800" />
              <Text style={styles.statValue}>2.4M</Text>
              <Text style={styles.statLabel}>Active Users</Text>
            </View>
          </View>

          <View style={styles.gridRow}>
            <View style={[styles.statCard, { marginRight: 8 }]}>
              <Icon name="swap-horizontal" size={24} color="#4caf50" />
              <Text style={styles.statValue}>$8.2B</Text>
              <Text style={styles.statLabel}>24h Volume</Text>
            </View>

            <View style={[styles.statCard, { marginLeft: 8 }]}>
              <Icon name="flash" size={24} color="#f44336" />
              <Text style={styles.statValue}>1,234</Text>
              <Text style={styles.statLabel}>Trades/min</Text>
            </View>
          </View>
        </View>

        {/* Top Movers */}
        <Text style={styles.sectionTitle}>
          Top Movers
        </Text>

        <View style={styles.moversContainer}>
          <View style={styles.moverItem}>
            <View style={styles.moverLeft}>
              <Icon name="arrow-up-circle" size={24} color="#4caf50" />
              <View style={styles.moverInfo}>
                <Text style={styles.moverSymbol}>AAPL</Text>
                <Text style={styles.moverName}>Apple Inc.</Text>
              </View>
            </View>
            <View style={styles.moverRight}>
              <Text style={styles.moverPrice}>$175.43</Text>
              <Text style={styles.moverChangePositive}>+5.2%</Text>
            </View>
          </View>

          <View style={styles.moverItem}>
            <View style={styles.moverLeft}>
              <Icon name="arrow-up-circle" size={24} color="#4caf50" />
              <View style={styles.moverInfo}>
                <Text style={styles.moverSymbol}>TSLA</Text>
                <Text style={styles.moverName}>Tesla Inc.</Text>
              </View>
            </View>
            <View style={styles.moverRight}>
              <Text style={styles.moverPrice}>$242.84</Text>
              <Text style={styles.moverChangePositive}>+3.8%</Text>
            </View>
          </View>

          <View style={[styles.moverItem, { borderBottomWidth: 0 }]}>
            <View style={styles.moverLeft}>
              <Icon name="arrow-down-circle" size={24} color="#f44336" />
              <View style={styles.moverInfo}>
                <Text style={styles.moverSymbol}>MSFT</Text>
                <Text style={styles.moverName}>Microsoft Corp.</Text>
              </View>
            </View>
            <View style={styles.moverRight}>
              <Text style={styles.moverPrice}>$378.91</Text>
              <Text style={styles.moverChangeNegative}>-1.2%</Text>
            </View>
          </View>
        </View>

        {/* Alert Card */}
        <View style={styles.alertCard}>
          <View style={styles.alertContent}>
            <Icon name="notifications" size={24} color="#4caf50" />
            <View style={styles.alertTextContainer}>
              <Text style={styles.alertTitle}>Market Alert</Text>
              <Text style={styles.alertMessage}>
                The market is showing strong bullish momentum. Consider
                reviewing your portfolio allocation.
              </Text>
            </View>
          </View>
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
    borderRadius: 16, // rounded-2xl
    padding: 24, // p-6
    marginBottom: 24, // mb-6
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16, // mb-4
  },
  heroTitle: {
    color: 'white',
    fontSize: 24, // text-2xl
    fontWeight: 'bold',
    marginLeft: 16, // ml-4
  },
  heroDescription: {
    color: '#dcfce7', // green-100
    fontSize: 16, // text-base
  },
  gridContainer: {
    marginBottom: 24, // mb-6
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16, // mb-4
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 12, // rounded-xl
    padding: 16, // p-4
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 20, // text-xl
    fontWeight: 'bold',
    color: '#1f2937', // gray-800
    marginTop: 8, // mt-2
  },
  statLabel: {
    fontSize: 14, // text-sm
    color: '#6b7280', // gray-500
  },
  sectionTitle: {
    fontSize: 18, // text-lg
    fontWeight: 'bold',
    color: '#1f2937', // gray-800
    marginBottom: 16, // mb-4
  },
  moversContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16, // mb-4
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  moverItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6', // gray-100
  },
  moverLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  moverInfo: {
    marginLeft: 12, // ml-3
  },
  moverSymbol: {
    fontSize: 16, // text-base
    fontWeight: '600',
    color: '#1f2937', // gray-800
  },
  moverName: {
    fontSize: 12, // text-xs
    color: '#6b7280', // gray-500
  },
  moverRight: {
    alignItems: 'flex-end',
  },
  moverPrice: {
    fontSize: 16, // text-base
    fontWeight: 'bold',
    color: '#1f2937', // gray-800
  },
  moverChangePositive: {
    fontSize: 14, // text-sm
    color: '#16a34a', // green-600
    fontWeight: '600',
  },
  moverChangeNegative: {
    fontSize: 14, // text-sm
    color: '#dc2626', // red-600
    fontWeight: '600',
  },
  alertCard: {
    backgroundColor: '#f0fdf4', // green-50
    borderRadius: 12,
    padding: 20,
    marginBottom: 24, // mb-6
    borderWidth: 1,
    borderColor: '#bbf7d0', // green-200
  },
  alertContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  alertTextContainer: {
    marginLeft: 12, // ml-3
    flex: 1,
  },
  alertTitle: {
    fontSize: 16, // text-base
    fontWeight: '600',
    color: '#166534', // green-800
    marginBottom: 8, // mt-2?? no mb-2
  },
  alertMessage: {
    fontSize: 14, // text-sm
    color: '#15803d', // green-700
  },
});

export default ScreenB;
