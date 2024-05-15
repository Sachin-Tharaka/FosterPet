import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PetsService from '../services/PetsService';


const PetProfileScreen = ({ route, navigation }) => {
    const { petID } = route.params || { PetID: '' };
  const [pet, setPet] = useState([]);
  

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        // Token exists, fetch pet data
        
        getPetById(petID, token);
      } else {
        // Token doesn't exist, navigate to Login screen
        console.log("Please login");
        navigation.navigate('Login');
      }
    };
    getToken();
  }, []);

  

  //get pet by id
  const getPetById = async (id, token) => {
    // call get pets by userid function
    try {
      const data = await PetsService.getPetById(id, token);
      console.log('pets data:', data);
      setPet(data);
    } catch (error) {
      // Handle error 
      console.error('Error:', error.message);
    }
  };

  

    return (
    
        <View style={styles.container}>
        <View style={styles.petContainer}>
        <TouchableOpacity style={styles.button} >
    <Text style={styles.buttonText}>Edit Account</Text>
  </TouchableOpacity>
        <Image
  style={styles.petImage}
  source={pet.petImages && pet.petImages.length > 0 ? { uri: pet.petImages[0] } : null}
/>
          <Text style={styles.petName}>{pet.petName}</Text>
          <Text>{pet.petType}</Text>
          <Text>{pet.petBreed}</Text>
          <Text>{pet.petAge} years old</Text>
          <Text>{pet.petWeight} lbs</Text>
          <Text>Medical Conditions: {pet.petMediConditions}</Text>
          <Text>Vaccination Status: {pet.petVaccinationStatus}</Text>
          <Text>Owner: {pet.ownerName}</Text>
          <Text>Contact: {pet.ownerPhone}</Text>
          <Text>Email: {pet.ownerEmail}</Text>
          <Text style={styles.petAddress}>
  {pet.petAddress && `${pet.petAddress.address1}, ${pet.petAddress.address2}, ${pet.petAddress.city}, ${pet.petAddress.zipCode}`}
</Text>
        </View>

      <ScrollView style={styles.scrollView}>
  <View style={styles.images}>
    {pet.petImages && Array.isArray(pet.petImages) && pet.petImages.map((image, index) => (
      <Image key={index} source={{ uri: image }} style={styles.image} />
    ))}
  </View>
</ScrollView>

      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#ffffff',
      marginTop: 100
    },
    petImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
      },
      button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
      },
      scrollView: {
        maxHeight: 200, 
      },
  });



export default PetProfileScreen;
