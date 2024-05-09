import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Navbar from '../components/Navbar';
import KennelService from '../services/KennelService';

const FosterProfile = ({ route, navigation } ) => {
  const { kennelId } = route.params;
  const [kennelData, setKennelData] = useState([]);

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        // Token exists, fetch kennels and user data
        getKennelById(kennelId, token);
      } else {
        // Token doesn't exist, navigate to Login screen
        console.log("Please login");
        navigation.navigate('Login');
      }
    };
    getToken();
  }, []);


  //get kennel by id
  const getKennelById = async (id, token) => {
    // call get kennel by id function
    try {
      const data = await KennelService.getKennelById(id, token);
      console.log('kennel data:', data);
      setKennelData(data);
    } catch (error) {
      // Handle error 
      console.error('Error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://picsum.photos/400/600?image=1' }} style={styles.logo} />
        <Text style={styles.title}>Doo Keepers</Text>
        <Text style={styles.location}>KANDY ROAD, KELANIYA</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>VIEW HISTORY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>MESSAGE</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.petsContainer}>
          <View style={styles.petRow}>
            <Image source={{ uri: 'https://picsum.photos/400/600?image=1' }} style={styles.petImage} />
            <Image source={{ uri: 'https://picsum.photos/400/600?image=1' }} style={styles.petImage} />
          </View>
          <View style={styles.petRow}>
            <Image source={{ uri: 'https://picsum.photos/400/600?image=1' }} style={styles.petImage} />
            <Image source={{ uri: 'https://picsum.photos/400/600?image=1' }} style={styles.petImage} />
          </View>
          <View style={styles.petRow}>
          <Image source={{ uri: 'https://picsum.photos/400/600?image=1' }} style={styles.petImage} />
          <Image source={{ uri: 'https://picsum.photos/400/600?image=1' }} style={styles.petImage} />
        </View>
        <View style={styles.petRow}>
          <Image source={{ uri: 'https://picsum.photos/400/600?image=1' }} style={styles.petImage} />
          <Image source={{ uri: 'https://picsum.photos/400/600?image=1' }} style={styles.petImage} />
        </View>
          {/* Add more rows as needed */}
        </View>
      </ScrollView>
      <View><Navbar /></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 60
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  location: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  buttonsContainer: {
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
    marginBottom: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  petsContainer: {
    marginBottom: 20,
  },
  petRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  petImage: {
    width: '50%',
    height: 150,
    margin: 5,
  },
});

export default FosterProfile;
