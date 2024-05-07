import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AdminComplaints from './AdminComplaints';

const AdminUserManagement = ({ navigation }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const users = [
    { name: 'Nipuni Perera', time: 'Mon - Sat: 8am - 7pm', phone: '123-456-7890', id: 1 },
    { name: 'Mahela Dissa', time: 'Mon - Sat: 8am - 7pm', phone: '123-456-7890', id: 2 },
    { name: 'Sachin Thara', time: 'Mon - Sat: 8am - 7pm', phone: '123-456-7890', id: 3 }
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.menuIcon} onPress={toggleNavbar}>
          <FontAwesome name={isCollapsed ? 'bars' : 'times'} size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.header}>User Management</Text>
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.detail}>{item.time}</Text>
              <Text style={styles.detail}>{item.phone}</Text>
              <TouchableOpacity style={styles.buttonSmallBlue} onPress={() => {}}>
                <Text style={styles.buttonTextWhite}>Details and Actions</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
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
    display:'flex',
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'start',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,

  },
  detail: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,

  },
  buttonSmallBlue: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 5
  },
  buttonTextWhite: {
    fontSize: 12,
    color: '#FFF'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50  // Add margin to avoid overlap with the menu icon
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
});

export default AdminUserManagement;
