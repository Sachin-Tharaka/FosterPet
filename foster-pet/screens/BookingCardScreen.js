import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PetsService from '../services/PetsService';
import BookingService from '../services/BookingService';

const BookingCardScreen = ({ route, navigation }) => {
  const { kennelID } = route.params || { kennelID: '' };
  
  const [petID, setPetID] = useState('');
  const [volunteerID, setVolunteerID] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [numPets, setNumPets] = useState(1);
  const [pets, setPets] = useState([]);
  const [error, setError] = useState('');
  const [showPetModal, setShowPetModal] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const ownerID = await AsyncStorage.getItem('userId');
        if (token) {
          getPetsByOwnerId(ownerID, token);
        } else {
          console.log("Please login");
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error getting token:', error.message);
      }
    };
    getToken();
  }, []);

  //get pet by owner id
  const getPetsByOwnerId = async (id, token) => {
    try {
      const data = await PetsService.getPetsByOwnerId(id, token);
      setPets(data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleBooking = async () => {
    setError(" ");
    if (!petID) {
      setError('Pet is required.');
      return;
    } else if (!selectedStartDate) {
      setError('Start date is required.');
      return;
    } else if (!startTime) {
      setError('Start time is required.');
      return;
    } else if (!selectedEndDate) {
      setError('End date is required.');
      return;
    } else if (!endTime) {
      setError('End time is required.');
      return;
    }
 
    try {
      const token = await AsyncStorage.getItem('token');
      const ownerID = await AsyncStorage.getItem('userId');
      
      console.log('petid: ',petID,'ownerid: ', ownerID,'kennelid: ', kennelID,'volunteerid: ', volunteerID, 'start date: ',startDate,'end date: ', endDate, token);
      const responseData = await BookingService.booking(petID, ownerID, kennelID, volunteerID, startDate, endDate, token);
      console.log('Booking completed:', responseData);

    } catch (error) {
      console.error('Booking failed:', error.message);
      setError("Booking failed");
    }
  };

  const startDate = selectedStartDate ? `${selectedStartDate.toISOString().split('T')[0]}T${startTime.toISOString().split('T')[1]}` : '';
  const endDate = selectedEndDate ? `${selectedEndDate.toISOString().split('T')[0]}T${endTime.toISOString().split('T')[1]}` : '';

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Booking Card</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      
      <TouchableOpacity onPress={() => setShowPetModal(true)} style={styles.button}>
        <Text>{petID ? pets.find(pet => pet.petID === petID).petName : 'Select Pet'}</Text>
      </TouchableOpacity>
      <Modal
        visible={showPetModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPetModal(false)}
      >
        <TouchableOpacity style={styles.modalBackground} onPress={() => setShowPetModal(false)}>
          <FlatList
            data={pets}
            keyExtractor={(item) => item.petID.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  setPetID(item.petID);
                  setShowPetModal(false);
                }}
              >
                <Text>{item.petName}</Text>
              </TouchableOpacity>
            )}
          />
        </TouchableOpacity>
      </Modal>

      <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.button}>
        <Text>Select Start Date</Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={selectedStartDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartDatePicker(false);
            if (selectedDate) {
              setSelectedStartDate(selectedDate);
            }
          }}
        />
      )}

      <TouchableOpacity onPress={() => setShowStartTimePicker(true)} style={styles.button}>
        <Text>Select Start Time</Text>
      </TouchableOpacity>
      {showStartTimePicker && (
        <DateTimePicker
          value={startTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={(event, selectedTime) => {
            setShowStartTimePicker(false);
            if (selectedTime) {
              setStartTime(selectedTime);
            }
          }}
        />
      )}

      <Text>Start Date and Time: {startDate}</Text>

      <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.button}>
        <Text>Select End Date</Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={selectedEndDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            setShowEndDatePicker(false);
            if (selectedDate) {
              setSelectedEndDate(selectedDate);
            }
          }}
        />
      )}

      <TouchableOpacity onPress={() => setShowEndTimePicker(true)} style={styles.button}>
        <Text>Select End Time</Text>
      </TouchableOpacity>
      {showEndTimePicker && (
        <DateTimePicker
          value={endTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={(event, selectedTime) => {
            setShowEndTimePicker(false);
            if (selectedTime) {
              setEndTime(selectedTime);
            }
          }}
        />
      )}
      <Text>End Date and Time: {endDate}</Text>
      <View style={styles.counterContainer}>
        <Text>Number of Pets: </Text>
        <TouchableOpacity onPress={() => setNumPets(Math.max(1, numPets - 1))} style={styles.counterButton}>
          <Text>-</Text>
        </TouchableOpacity>
        <Text> {numPets} </Text>
        <TouchableOpacity onPress={() => setNumPets(numPets + 1)} style={styles.counterButton}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleBooking} style={styles.button}>
        <Text>Book</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'lightblue',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop:250,
    paddingLeft:50,
    paddingRight:50
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    backgroundColor: 'white',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  counterButton: {
    borderWidth: 1,
    padding: 5,
  },
  error: {
    color: 'red',
    marginTop: 5,
    marginBottom: 10,
  },
});

export default BookingCardScreen;
