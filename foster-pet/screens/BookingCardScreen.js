import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import PetsService from '../services/PetsService';
import BookingService from '../services/BookingService';

const BookingCardScreen = ({ navigation }) => {
  const [petID, setPetID] = useState('');
  const [kennelID, setKennelID] = useState('');
  const [volunteerID, setVolunteerID] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [numPets, setNumPets] = useState(1);
  const [pets, setPets] = useState([]);
  const [error, setError] = useState('');
  const [formattedStartDateTime, setFormattedStartDateTime] = useState('');
  const [formattedEndDateTime, setFormattedEndDateTime] = useState('');

  
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
    } else if (!startDate) {
      setError('Start date is required.');
      return;
    }else if (!startTime) {
      setError('Start time is required.');
      return;
    } else if (!endDate) {
      setError('End date is required.');
      return;
    }else if (!endTime) {
      setError('End time is required.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const responseData = await BookingService.booking(petID, ownerID, kennelID, volunteerID, startDate, endDate, token);
      console.log('Booking completed:', responseData);
     
    } catch (error) {
      console.error('Booking failed:', error.message);
      setError("Booking failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Booking Card</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <Picker
        selectedValue={petID}
        onValueChange={(itemValue) => setPetID(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Pet" value="" />
        {pets.map(pet => (
          <Picker.Item key={pet.id} label={pet.name} value={pet.id} />
        ))}
      </Picker>

      <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.button}>
        <Text>Select Start Date</Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartDatePicker(false);
            if (selectedDate) {
              setStartDate(selectedDate);
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

<Text>Start Date and Time: {`${startDate.toLocaleDateString()} ${startTime.toLocaleTimeString()}`}</Text>
      

      <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.button}>
        <Text>Select End Date</Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            setShowEndDatePicker(false);
            if (selectedDate) {
              setEndDate(selectedDate);
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
<Text>End Date and Time: {`${endDate.toLocaleDateString()} ${endTime.toLocaleTimeString()}`}</Text>
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
  picker: {
    height: 50,
    width: '80%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
  },
  button: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'lightblue',
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
