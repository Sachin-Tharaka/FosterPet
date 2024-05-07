import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';




const UserAccount = ({ navigation }) => {

  const goToBecomeAgent = () => {
    navigation.navigate('BecomeAgent');
  
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      <Image source={{ uri: 'https://picsum.photos/400/600?image=1' }} style={styles.logo} />

        <Text style={styles.title}>Nipuni Perera</Text>
        <Text style={styles.location}>Kotikawaththa</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Change Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToBecomeAgent}>
          <Text style={styles.buttonText}>Become an Agent</Text>
        </TouchableOpacity>
      </View>

     
    </ScrollView>
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
    marginBottom:10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  petsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  petImage: {
    width: 100,
    height: 150,
  },
  largeImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  }
});

export default UserAccount;
