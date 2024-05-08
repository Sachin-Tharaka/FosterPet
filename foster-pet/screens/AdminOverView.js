import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Ensure you have Expo or change to react-native-vector-icons
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const AdminOverView = ({ navigation }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

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
      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.menuIcon} onPress={toggleNavbar}>
          <FontAwesome name={isCollapsed ? 'bars' : 'times'} size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.header}>Overview</Text>
      

        <View style={styles.container}>
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
    
          <LineChart
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
          />
    
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Details')}>
            <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>
        </View>
        {/* Place additional UI components here as per your layout needs */}
      </ScrollView>
      
      {!isCollapsed && (
        <View style={styles.sidebar}>
          <TouchableOpacity style={styles.closeIcon} onPress={toggleNavbar}>
            <FontAwesome name="times" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.navItem} onPress={goToOverview}>Overview</Text>
          <Text style={styles.navItem} onPress={goToOrders}>Approvals</Text>
          <Text style={styles.navItem} onPress={goToComplaints}>Complaints</Text>
          <Text style={styles.navItem} onPress={goToUserManagement}>User Management</Text>
        </View>
      )}
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
  sidebar: {
    position: 'absolute',
    width: 200,
    height: '100%',
    backgroundColor: '#2C3E50',
    paddingTop: 20,
    left: 0,
    top: 0
  },
  navItem: {
    padding: 10,
    color: 'white',
    fontWeight: 'bold'
  },
  menuIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 2
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 2
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50  // Add margin to avoid overlap with the menu icon
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  statBox: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ECF0F1',
    borderRadius: 5,
    width: '22%'
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  statLabel: {
    fontSize: 14
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 20,
    marginBottom: 10
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  cardContent: {
    fontSize: 16
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default AdminOverView;
