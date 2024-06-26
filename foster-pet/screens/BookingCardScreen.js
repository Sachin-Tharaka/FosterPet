import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import PetsService from "../services/PetsService";
import BookingService from "../services/BookingService";

const BookingCardScreen = ({ route, navigation }) => {
  const { kennelID } = route.params || { kennelID: "" };
  const { volunteerID } = route.params || { volunteerID: "" };

  const [petID, setPetID] = useState("");
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
  const [error, setError] = useState("");

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const ownerID = await AsyncStorage.getItem("userId");
        if (token) {
          getPetsByOwnerId(ownerID, token);
        } else {
          console.log("Please login");
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Error getting token:", error.message);
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
      console.error("Error:", error.message);
    }
  };

  const handleBooking = async () => {
    setError("");
    if (!petID) {
      setError("Pet is required.");
      return;
    } else if (!selectedStartDate) {
      setError("Start date is required.");
      return;
    } else if (!startTime) {
      setError("Start time is required.");
      return;
    } else if (!selectedEndDate) {
      setError("End date is required.");
      return;
    } else if (!endTime) {
      setError("End time is required.");
      return;
    }
  
    try {
      const token = await AsyncStorage.getItem("token");
      const ownerID = await AsyncStorage.getItem("userId");
  
      const startDate = new Date(
        selectedStartDate.setHours(startTime.getHours(), startTime.getMinutes())
      ).toISOString();
  
      const endDate = new Date(
        selectedEndDate.setHours(endTime.getHours(), endTime.getMinutes())
      ).toISOString();
  
      const data = {
        petID,
        kennelID:kennelID || null,
        volunteerID: volunteerID || null, 
        startDate,
        endDate,
      };
      console.log("Booking data: ", data);
  
      const responseData = await BookingService.booking(data, token);
      console.log("Booking completed:", responseData);
      navigation.navigate("MyBookingScreen");
    } catch (error) {
      console.error("Booking failed:", error.message);
      setError("Booking failed");
    }
  };
  

  const startDate = new Date(
    selectedStartDate.setHours(startTime.getHours(), startTime.getMinutes())
  ).toISOString();

  const endDate = new Date(
    selectedEndDate.setHours(endTime.getHours(), endTime.getMinutes())
  ).toISOString();

  const backToHome = () => {
    navigation.navigate("BookingHouse");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={backToHome} style={styles.iconContainer}>
        <Icon name="arrow-left" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.text}>Booking Card</Text>
      {error && <Text style={styles.error}>{error}</Text>}

      <Picker
        selectedValue={petID}
        onValueChange={(itemValue, itemIndex) => setPetID(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Pet" value="" />
        {pets.map((pet) => (
          <Picker.Item key={pet.petID} label={pet.petName} value={pet.petID} />
        ))}
      </Picker>
      <TouchableOpacity
        onPress={() => setShowStartDatePicker(true)}
        style={styles.setterButton}
      >
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

      <TouchableOpacity
        onPress={() => setShowStartTimePicker(true)}
        style={styles.setterButton}
      >
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

      <Text style={styles.showerText}>Start Date and Time: {startDate}</Text>

      <TouchableOpacity
        onPress={() => setShowEndDatePicker(true)}
        style={styles.setterButton}
      >
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

      <TouchableOpacity
        onPress={() => setShowEndTimePicker(true)}
        style={styles.setterButton}
      >
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
      <Text style={styles.showerText}>End Date and Time: {endDate}</Text>
      <View style={styles.counterContainer}>
        <Text>Number of Pets: </Text>
        <TouchableOpacity
          onPress={() => setNumPets(Math.max(1, numPets - 1))}
          style={styles.counterButton}
        >
          <Text>-</Text>
        </TouchableOpacity>
        <Text> {numPets} </Text>
        <TouchableOpacity
          onPress={() => setNumPets(numPets + 1)}
          style={styles.counterButton}
        >
          <Text>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleBooking} style={styles.button}>
        <Text style={styles.buttonText}>Place Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  error: {
    fontSize: 16,
    color: "red",
    marginBottom: 10,
  },
  picker: {
    width: "90%",
    marginVertical: 10,
    height: 40,
    padding: 10,
    backgroundColor: "#E0E0E0",
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
  },
  setterButton: {
    padding: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  showerText: {
    fontSize: 16,
    color: "black",
    marginVertical: 10,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  counterButton: {
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: 10,
  },
});

export default BookingCardScreen;
