import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, Image } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PetsService from '../services/PetsService';
import * as ImagePicker from 'expo-image-picker';

const AddPetScreen = ({ navigation }) => {
  const [petType, setPetType] = useState('');
  const [petName, setPetName] = useState('');
  const [petAddress1, setPetAddress1] = useState('');
  const [petAddress2, setPetAddress2] = useState('');
  const [petCity, setPetCity] = useState('');
  const [petZip, setPetZip] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petWeight, setPetWeight] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petMediConditions, setPetMediConditions] = useState('');
  const [petVaccinationStatus, setPetVaccinationStatus] = useState('');
  const [kasl_regNo, setKasl_regNo] = useState('');
  const [petImages, setPetImages] = useState([]);
  const [error, setError] = useState('');

  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const addNewPet = async () => {
    console.log('adding new pet....');
    // Convert petAge and petWeight to numbers
    const age = parseInt(petAge);
    const weight = parseFloat(petWeight);

    // Check if age and weight are valid numbers
    if (isNaN(age) || isNaN(weight)) {
      setError('Age and weight must be numbers');
      return;
    }

    if (!petType || !petName || !petAddress1 || !petCity || !petZip || !age || !weight || !petBreed || !petMediConditions || !petVaccinationStatus || !kasl_regNo || images.length === 0) {
      setError('All fields are required, including at least one image');
      return;
    }

    console.log('petImages:', images);

    try {

      const token = await AsyncStorage.getItem('token');
      const ownerId = await AsyncStorage.getItem('userId');

      const formData = new FormData();
      formData.append('petType', petType);
      formData.append('petName', petName);
      formData.append('petAddress1', petAddress1);
      formData.append('petAddress2', petAddress2);
      formData.append('petCity', petCity);
      formData.append('petZip', petZip);
      formData.append('petAge', age.toString());
      formData.append('petWeight', weight.toString());
      formData.append('petBreed', petBreed);
      formData.append('petMediConditions', petMediConditions);
      formData.append('petVaccinationStatus', petVaccinationStatus);
      formData.append('ownerId', ownerId);
      formData.append('kasl_regNo', kasl_regNo);
      // formData.append('petImages', images.at(0));

      images.forEach((image, index) => {
          formData.append('petImages', {
            uri: image.uri,
            name: `image_${index}.jpg`,
            type: 'image/jpeg',
          });
      });
      console.log('Calling backend...');
      const response = await PetsService.addNewPet(formData,token);
      console.log('pets data:', response);
      if (response.success) {
        navigation.navigate('PetsScreen');
      } else {
        setError("Failed to add new pet");
      }

      // Clear input fields after adding a new pet
      setPetType('');
      setPetName('');
      setPetAddress1('');
      setPetAddress2('');
      setPetCity('');
      setPetZip('');
      setPetAge('');
      setPetWeight('');
      setPetBreed('');
      setPetMediConditions('');
      setPetVaccinationStatus('');
      setKasl_regNo('');
      setPetImages([]);
    } catch (error) {
      console.error('Error:', error.message);
      setError("Failed to add new pet")
    }
  };

    const pickImages = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            base64: false,
        });

        if (!result.canceled) {
            setImages(result.assets);
        }
    };

  return (
    <ScrollView>
      <View style={styles.container}>
      {/*<Button title="Select and Upload Files" onPress={selectFiles} />*/}
      {/*{selectedFiles.length > 0 && (*/}
      {/*  <Button title="Upload Files" onPress={uploadFiles} />*/}
      {/*)}*/}
        <Text style={styles.header}>Add New Pet</Text>
        {error && <Text style={styles.error}>{error}</Text>}
       <TextInput
  style={styles.input}
  placeholder="Pet Type"
  value={petType}
  onChangeText={setPetType}
/>
<TextInput
  style={styles.input}
  placeholder="Pet Name"
  value={petName}
  onChangeText={setPetName}
/>
<TextInput
  style={styles.input}
  placeholder="Pet Address Line 1"
  value={petAddress1}
  onChangeText={setPetAddress1}
/>
<TextInput
  style={styles.input}
  placeholder="Pet Address Line 2"
  value={petAddress2}
  onChangeText={setPetAddress2}
/>
<TextInput
  style={styles.input}
  placeholder="Pet City"
  value={petCity}
  onChangeText={setPetCity}
/>
<TextInput
  style={styles.input}
  placeholder="Pet Zip"
  value={petZip}
  onChangeText={setPetZip}
/>
<TextInput
  style={styles.input}
  placeholder="Pet Age"
  value={petAge}
  onChangeText={setPetAge}
  keyboardType="numeric"
/>
<TextInput
  style={styles.input}
  placeholder="Pet Weight"
  value={petWeight}
  onChangeText={setPetWeight}
  keyboardType="numeric"
/>
<TextInput
  style={styles.input}
  placeholder="Pet Breed"
  value={petBreed}
  onChangeText={setPetBreed}
/>
<TextInput
  style={styles.input}
  placeholder="Medical Conditions"
  value={petMediConditions}
  onChangeText={setPetMediConditions}
/>
<TextInput
  style={styles.input}
  placeholder="Vaccination Status"
  value={petVaccinationStatus}
  onChangeText={setPetVaccinationStatus}
/>
<TextInput
  style={styles.input}
  placeholder="KASL Registration Number"
  value={kasl_regNo}
  onChangeText={setKasl_regNo}
/>

        <Button title="Choose Images" onPress={pickImages} />
        {/* {images.length > 0 && images.map((imageUri, index) => (
          <Image key={index} source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
        ))} */}
        {images.map((image, index) => (
        <Image key={index} source={image} style={{ width: 200, height: 200 }} />
      ))}
        <Button title="Add Pet" onPress={addNewPet} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
    marginTop: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 5,
    marginBottom: 10,
  },
});

export default AddPetScreen;
