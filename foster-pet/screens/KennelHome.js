import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import KennelService from '../services/KennelService';

const KennelHome = ({ route, navigation }) => {
  const { kennelID } = route.params;
  const [kennelData, setKennelData] = useState([]);

  useEffect(() => {
    console.log("kennel id ", kennelID);
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      if (token) {
        // Token exists, fetch kennels and user data
        getKennelById(kennelID, token);
      } else {
        // Token doesn't exist, navigate to Login screen
        console.log("Please login");
        navigation.navigate("Login");
      }
    };
    getToken();
  }, []);

  // get kennel by id
  const getKennelById = async (id, token) => {
    try {
      const data = await KennelService.getKennelById(id, token);
      console.log("kennel data:", data);
      setKennelData(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const updateData = () => {
    console.log('navigate to update kennel screen');
    navigation.navigate("UpdateKennelDataScreen",{kennelId:kennelID});
  };

  const viewReviews = () => {
    console.log('navigate to reviews screen');
    navigation.navigate("KennelReviewScreen",{kennelId:kennelID});
  };

  const viewBooking=()=>{
    console.log('navigate to booking screen');
    navigation.navigate("KennelBookingScreen",{kennelId:kennelID});
  }

  const addchargingRates=()=>{
    console.log('navigate to charing rates screen');
    navigation.navigate("AddKennelChargingRatesScreen",{kennelId:kennelID});
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.header}>Home</Text>

        <View style={styles.user_header}>
          <Image
            source={{
              uri:
                kennelData.images && kennelData.images.length > 0
                  ? kennelData.images[0]
                  : '',
            }}
            style={styles.logo}
          />

          <Text style={styles.title}>{kennelData.kennelName}</Text>
          <Text style={styles.location}>
            {kennelData.kennelAddress
              ? `${kennelData.kennelAddress.address1}, ${kennelData.kennelAddress.address2}, ${kennelData.kennelAddress.city},${kennelData.kennelAddress.zipCode}.`
              : "Address not available"}
          </Text>
          <Text>Owner Name: {kennelData.ownerName}</Text>
          <Text>Owner Email: {kennelData.ownerEmail}</Text>
          <Text>Owner Phone: {kennelData.ownerPhone}</Text>

          <View style={styles.paymentRatesContainer}>
            <Text style={styles.paymentRatesTitle}>Payment Rates:</Text>
            {kennelData.paymentRates && kennelData.paymentRates.map((rate, index) => (
              <Text key={index} style={styles.paymentRate}>{rate.animalType}: {rate.rate}</Text>
            ))}
          </View>
        </View>

        <ScrollView horizontal style={styles.imagesContainer}>
          {kennelData.images &&
            Array.isArray(kennelData.images) &&
            kennelData.images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.image} />
            ))}
        </ScrollView>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={updateData}>Change Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={viewBooking}>Booking</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={viewReviews}>Reviews</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={addchargingRates}>Add Charging Rates</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  location: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  user_header: {
    alignItems: 'center',
    marginTop: 20,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    width: '80%',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
  },
  imagesContainer: {
    marginVertical: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
  paymentRatesContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  paymentRatesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentRate: {
    fontSize: 16,
    color: 'gray',
  },
});

export default KennelHome;
