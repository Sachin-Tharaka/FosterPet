import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const BookingHouseScreen = ({ navigation, route }) => {
  const [location, setLocation] = useState('Unknown');
  const [filter, setFilter] = useState('All');
  const [availableHouses, setAvailableHouses] = useState([]);

  // Mock data for available houses
  const housesData = [
    { id: '1', name: 'House 1', type: 'Professional', location: 'Location 1' },
    { id: '2', name: 'House 2', type: 'Volunteer', location: 'Location 2' },
    { id: '3', name: 'House 3', type: 'Professional', location: 'Location 3' },
  ];

  useEffect(() => {
    // Set the user's location (you can use a real location service here)
    setLocation('Your Location');
    // Filter available houses based on the selected filter
    const filteredHouses = housesData.filter(house => filter === 'All' || house.type === filter);
    setAvailableHouses(filteredHouses);
  }, [filter]);

  const renderHouseCard = ({ item }) => (
    <View style={styles.houseCard}>
      <Text>Name: {item.name}</Text>
      <Text>Type: {item.type}</Text>
      <Text>Location: {item.location}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.locationText}>Location: {location}</Text>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setFilter('All')} style={[styles.filterButton, filter === 'All' && styles.activeFilter]}>
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('Professional')} style={[styles.filterButton, filter === 'Professional' && styles.activeFilter]}>
          <Text>Professional</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('Volunteer')} style={[styles.filterButton, filter === 'Volunteer' && styles.activeFilter]}>
          <Text>Volunteer</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={availableHouses}
        keyExtractor={item => item.id}
        renderItem={renderHouseCard}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  activeFilter: {
    backgroundColor: 'lightblue',
  },
  flatList: {
    flex: 1,
  },
  houseCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default BookingHouseScreen;
