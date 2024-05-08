import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Navbar from '../components/Navbar';

const UserAccount = ({ navigation }) => {

  const goToBecomeAgent = () => {
    navigation.navigate('BecomeAgent');
  };

  const goToUserHome = () => {
    navigation.navigate('AgentHome');
  };

  return (
    <View style={styles.outerContainer}>
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
          <View>
            <Text>Other Agent UIs</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={goToUserHome}>
            <Text style={styles.buttonText}>User Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 60
  },
  container: {
    flex: 1
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
});

export default UserAccount;
