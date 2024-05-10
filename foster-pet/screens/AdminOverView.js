import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Ensure you have Expo or change to react-native-vector-icons
import { LineChart } from 'react-native-chart-kit';
import AdminNavbar from '../components/AdminNav';

const screenWidth = Dimensions.get('window').width;

const AdminOverView = ({ navigation }) => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ['Fostering trends'] // optional
  };
  
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const goToOverview = () => {
    navigation.navigate('AdminOverView');
  };
  const goToOrders = () => {
    navigation.navigate('AdminOrders');
  }; 
  const goToComplaints = () => {
    navigation.navigate('AdminComplaints');
  };
  const goToUserManagement = () => {
    navigation.navigate('AdminUserManagement');
  };

  return (
    <View style={styles.container}>
      <AdminNavbar />
      <ScrollView style={styles.content}>
        <Text style={styles.header}>Overview</Text>
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Active Agents</Text>
            <Text style={styles.cardContent}>60</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Ongoing Fosterings</Text>
            <Text style={styles.cardContent}>16</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Active Users</Text>
            <Text style={styles.cardContent}>43</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Completed</Text>
            <Text style={styles.cardContent}>64</Text>
          </View>
        </View>
        <LineChart
          data={data}
          width={screenWidth * 0.8}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
        />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Details')}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    width: '48%' // Adjust the width for desktop layout
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  cardContent: {
    fontSize: 16
  },
  chart: {
    alignSelf: 'center'
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    width: '50%', // Adjust the width for desktop layout
    alignSelf: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default AdminOverView;
