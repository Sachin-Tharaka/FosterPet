import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BookingService from '../services/BookingService';

const KennelBookingScreen = ({ route, navigation }) => {
  const { kennelId } = route.params || { kennelId: "" };
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [bookingData, setBookingData] = useState([]);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        getBookingBYKennelId(kennelId, token);
      } else {
        console.log("Please login");
        navigation.navigate("Login");
      }
    };
    getToken();
  }, [navigation]);

  const getBookingBYKennelId = async (id, token) => {
    try {
      const data = await BookingService.getBookingByKennelId(id, token);
      console.log("booking data:", data);
      setBookingData(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleOwnerProfileClick = (ownerId) => {
    navigation.navigate("CustomerProfile", { customerId:ownerId });
  };

  const handlePetProfileClick = (petId) => {
    navigation.navigate("CustomerPetProfileScreen", { petID: petId });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.menuIcon} onPress={toggleNavbar}>
          <FontAwesome name={isCollapsed ? 'bars' : 'times'} size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Bookings</Text>
        {bookingData.map((booking) => (
          <View key={booking.bookingID} style={styles.itemContainer}>
            <View style={styles.detailContainer}>
              <Text style={styles.name}>Start Date: {new Date(booking.startDate).toLocaleString()}</Text>
              <Text style={styles.detail}>End Date: {new Date(booking.endDate).toLocaleString()}</Text>
              <Text style={styles.detail}>Status: {booking.status}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonSmallBlue}
                onPress={() => handleOwnerProfileClick(booking.ownerID)}
              >
                <Text style={styles.buttonTextWhite}>View Owner Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSmallBlue}
                onPress={() => handlePetProfileClick(booking.petID)}
              >
                <Text style={styles.buttonTextWhite}>View Pet Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      
      {!isCollapsed && (
        <View style={styles.sidebar}>
          <TouchableOpacity style={styles.closeIcon} onPress={toggleNavbar}>
            <FontAwesome name="times" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.navItem} onPress={() => navigation.navigate('AgentHome')}>Home</Text>
          <Text style={styles.navItem} onPress={() => navigation.navigate('AgentApprovals')}>Bookings</Text>
          <Text style={styles.navItem} onPress={() => navigation.navigate('AgentChat')}>Chats</Text>
          <Text style={styles.navItem} onPress={() => navigation.navigate('AgentWallet')}>Wallet</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
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
  detailContainer: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  detail: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  buttonSmallBlue: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 5,
    marginBottom: 5,
  },
  buttonTextWhite: {
    fontSize: 12,
    color: '#FFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
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
});

export default KennelBookingScreen;
