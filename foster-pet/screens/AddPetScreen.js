import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PetsService from '../services/PetsService';

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

      images.forEach((image, index) => {
        formData.append(`petImages${index}`, {
          uri: image.uri,
          name: `image${index}.jpg`,
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

  const handleImageUpload = async () => {
    
    //   mediaType: 'photo',
    //   quality: 0.8,
    // };
  
    // ImagePicker.launchImageLibrary(options, (response) => {
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else {
    //     const source = { uri: response.uri };
    //     setImages([...images, source]);
    //   }
    // });
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setImages([...images, imageUri]);
      }
    });
  };
  
  const uploadFiles = async () => {
    try {
      console.log(selectFiles);
      const formData = new FormData();
      selectedFiles.forEach((file, index) => {
        formData.append(`file${index}`, {
          uri: file.uri,
          type: file.type,
          name: file.name,
        });
      });

      const response = await axios.post('YOUR_UPLOAD_URL', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Files uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const selectFiles = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      setSelectedFiles(results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the file selection');
      } else {
        console.log('Error while selecting the file', err);
      }
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
      <Button title="Select and Upload Files" onPress={selectFiles} />
      {selectedFiles.length > 0 && (
        <Button title="Upload Files" onPress={uploadFiles} />
      )}
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

        <Button title="Choose Images" onPress={handleImageUpload} />
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
