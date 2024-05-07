import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const AdminComplaints = ({ navigation }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Sample data for the complaints list
  const complaintsData = [
    { id: '1', title: "Didn't get hourly pet update", customer: 'Tom Cruise', date: 'May 26, 2023, 6:30 PM', priority: 'HIGH'},
    { id: '2', title: 'Account changes', customer: 'Matt Damon', date: 'May 26, 2023, 8:00 AM', priority: 'LOW'},
    { id: '3', title: 'Pet update', customer: 'Robert Downey', date: 'May 26, 2023, 7:30 PM', priority: 'HIGH'},
    // Add more items here
  ];

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
    <Image source={{ uri: 'https://picsum.photos/400/600?image=1' }} style={styles.profilePic} />
    <View style={styles.detailContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>Updated 1 day ago</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.customerName}>{item.customer}</Text>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={[styles.priority, { color: item.priority === 'HIGH' ? '#FF0000' : item.priority === 'NORMAL' ? '#FFA500' : '#008000' }]}>{item.priority}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.menuIcon} onPress={toggleNavbar}>
          <FontAwesome name={isCollapsed ? 'bars' : 'times'} size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>All Complaints</Text>
        <FlatList
          data={complaintsData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </ScrollView>
      
      {!isCollapsed && (
        <View style={styles.sidebar}>
          <TouchableOpacity style={styles.closeIcon} onPress={toggleNavbar}>
            <FontAwesome name="times" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.navItem} onPress={() => navigation.navigate('AdminOverView')}>Overview</Text>
          <Text style={styles.navItem} onPress={() => navigation.navigate('AdminOrders')}>Approvals</Text>
          <Text style={styles.navItem} onPress={() => navigation.navigate('AdminComplaints')}>Complaints</Text>
          <Text style={styles.navItem} onPress={() => navigation.navigate('AdminUserManagement')}>User Management</Text>
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
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  detailContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  infoContainer: {
    alignItems: 'flex-end',
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    color: '#999',
  },
  priority: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sidebar: {
    position: 'absolute',
    width: 200,
    height: '100%',
    backgroundColor: '#2C3E50',
    paddingTop: 20,
    left: 0,
    top: 0,
  },
  navItem: {
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  menuIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 2,
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 2,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50  // Add margin to avoid overlap with the menu icon
  },
});

export default AdminComplaints;
