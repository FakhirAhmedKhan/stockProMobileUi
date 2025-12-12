import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';

const InvoiceScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header title="Invoice" subtitle="Invoices" showIcon iconName="document-text" />
      <View style={styles.content}>
        <Text style={styles.title}>Invoice</Text>
        <Text style={styles.subtitle}>Simple placeholder screen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f9fafb'},
  content: {flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24},
  title: {fontSize: 20, fontWeight: '700', color: '#111827'},
  subtitle: {fontSize: 14, color: '#6b7280', marginTop: 8},
});

export default InvoiceScreen;
