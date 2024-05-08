import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Navbar from '../components/Navbar';

const FosterProfile = ({ navigation }) => {
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
