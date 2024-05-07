import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Picker } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const BookingCardScreen = ({ navigation }) => {
  const [petType, setPetType] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [numPets, setNumPets] = useState(1);

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };

  const decreaseNumPets = () => {
    if (numPets > 1) {
      setNumPets(numPets - 1);
    }
  };

  const increaseNumPets = () => {
    setNumPets(numPets + 1);
  };

  const handleNext =()=>{
    const bookingData = {
        petType,
        petBreed,
        startDate,
        endDate,
        numPets,
      };
      navigation.navigate('BookingHouse', { bookingData });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Booking Card</Text>
      <Picker
        selectedValue={petType}
        onValueChange={(itemValue) => setPetType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Pet Type" value="" />
        <Picker.Item label="Dog" value="dog" />
        <Picker.Item label="Cat" value="cat" />
      </Picker>
      <Picker
        selectedValue={petBreed}
        onValueChange={(itemValue) => setPetBreed(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Pet Breed" value="" />
        {/* Add breeds based on the selected pet type */}
      </Picker>
      <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.button}>
        <Text>Select Start Date and Time</Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={handleStartDateChange}
        />
      )}
      <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.button}>
        <Text>Select End Date and Time</Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={handleEndDateChange}
        />
      )}
      <View style={styles.counterContainer}>
      <Text>Number of Pets: </Text>
        <TouchableOpacity onPress={decreaseNumPets} style={styles.counterButton}>
          <Text>-</Text>
        </TouchableOpacity>
        <Text> {numPets} </Text>
        <TouchableOpacity onPress={increaseNumPets} style={styles.counterButton}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleNext} style={styles.button}>
        <Text>Next</Text>
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
});

export default BookingCardScreen;
