import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import ImageGallery from '../components/ImageGallery';
import Navbar from '../components/Navbar';

const HomeScreen = ({ navigation }) => {

  const [searchText, setSearchText] = useState('');

  // Dummy images
  const images = Array.from({ length: 10 }).map((_, index) => ({
    source: {
      uri: `https://picsum.photos/400/600?image=${index + 1}`,
    },
  }));

  // Handle search function
  const handleSearch = () => {
    // Implement search functionality here
  };

  // Handle book a foster house
  const handleBookFosterHouse = () => {
    //navigate to booking screen
    navigation.navigate('Booking');
  };

  // Handle take me to a home
  const handleTakeMeToHome = () => {
    // Implement  "Take Me To Home" functionality here
    navigation.navigate('BookingHouse');

  };

  // Handle take me to a home
  const handleTakeMeToNotification = () => {
    // Implement  "Take Me To Home" functionality here
    navigation.navigate('NotificationScreen');

  };

  const handleTakeMeToFosterProfile = () => {
    // Implement  "Take Me To Home" functionality here
    navigation.navigate('FosterProfile');

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Foster Pet</Text>
      <TouchableOpacity style={styles.button} onPress={handleBookFosterHouse}>
        <Text style={styles.buttonText}>Book A Foster House</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleTakeMeToHome}>
        <Text style={styles.buttonText}>Take Me To Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleTakeMeToNotification}>
        <Text style={styles.buttonText}>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleTakeMeToFosterProfile}>
        <Text style={styles.buttonText}>Foster Profile</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <Text>All results</Text>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Display the image gallery */}
        <ImageGallery images={images} />
      </ScrollView>
      <View>
        
        <Navbar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:30,
    marginHorizontal:10
    
  },
  contentContainer: {
    // flexGrow: 1,
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingLeft: 10,
    marginTop:10
  },
  
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
});

export default HomeScreen;
