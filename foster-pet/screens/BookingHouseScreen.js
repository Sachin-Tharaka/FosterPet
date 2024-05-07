import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import KennelService from '../services/KennelService';

const BookingHouseScreen = ({ navigation }) => {
  const token =  sessionStorage.getItem('token');
  const [kennels, setKennels] = useState([]);
  useEffect(() => {
    console.warn("token ",token);
    // Use KennelService to fetch all kennels
    getAllKennelNear(79.8,6.9,50000,token)
    
  }, []);
  
//get all kennel near
const getAllKennelNear = async(longitude, latitude, maxDistance, token) => {

  // call get all kennel near function
  try {
    const data = await KennelService.getAllKennelNear(longitude, latitude, maxDistance, token);
    
    console.log('kennel data:', data);
    setKennels(data);
    
  } catch (error) {
    // Handle  error 
    console.error('Error:', error.message);
    
  }

  
};
  
  

  const entries = [
    { name: "Doo Keepers (Kandy)", rating: "★★★★", id: 1 },
    { name: "Doo Keep (Kiribathgoda)", rating: "★★★★", id: 2 },
    { name: "Doo Keepers (Kelaniya)", rating: "★★★★", id: 3 },
    { name: "Doo Keepers (Kandy)", rating: "★★★★", id: 4 },
    { name: "Doo Keep (Kiribathgoda)", rating: "★★★★", id: 5 },
    { name: "Doo Keepers (Kelaniya)", rating: "★★★★", id: 6 },
    { name: "Doo Keepers (Kandy)", rating: "★★★★", id: 7 },
    { name: "Doo Keep (Kiribathgoda)", rating: "★★★★", id: 8 },
    { name: "Doo Keepers (Kelaniya)", rating: "★★★★", id: 9 }
    
  ];

  const goToChangeLocation = () => {
    //navigate to booking screen
    navigation.navigate('LocationSetterScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, the_jane</Text> 
      {/* // Add current user name here  */}

      <View style={styles.location_container}>
        <View style={styles.location_container_logo}>
          <Text style={styles.logo}>Logo</Text>
        </View>
        <View style={styles.location_container_text}>
          <Text style={styles.address}>Home</Text>
          <Text style={styles.addressDetails}>Kandy Road, Kelaniya</Text>
        </View>
        <TouchableOpacity style={styles.change_button} onPress={goToChangeLocation}>
          <Text style={styles.change_button}>Change</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Professional</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Volunteer</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.list}>
        {kennels.map(kennel => (
          <View key={kennel.kennelId} style={styles.entry}>
           <Image source={ { uri: `data:${kennel.image}`} } style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{kennel.kennelName}</Text>
              <Text style={styles.name}>{kennel.kennelAddress.city}</Text>
              <Text style={styles.rating}>★★★★</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
    marginTop:100
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  address: {
    fontSize: 20,
    fontWeight: '600',
    textAlign:'left'
    
  },
  addressDetails: {
    fontSize: 16,
    color: '#666666',
    textAlign:'left'


  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  location_container: {
    backgroundColor: 'skyblue',
    borderRadius: 50,
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: "space-around",
    marginBottom: 20,
    paddingTop:5,
    paddingBottom:10
  },
  
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    borderRadius: 20,
    elevation: 3,
  },

  change_button: {
    color:'blue',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },

  list: {
    flex: 1,
  },
  entry: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 16,
    color: '#888888',
  }
});

export default BookingHouseScreen;