import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import KennelService from "../services/KennelService";
import UserService from "../services/UserService";
import VounteerService from "../services/VounteerService";
import Navbar from "../components/Navbar";

const BookingHouseScreen = ({ navigation }) => {
  const [kennels, setKennels] = useState([]);
  const [volunteersData, setVolunteersData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      if (token) {
        // Token exists, fetch kennels, volunteers, and user data
        getUserById(userId, token);
        getAllKennel(token);
        getAllVolunteer(token);
      } else {
        // Token doesn't exist, navigate to Login screen
        console.log("Please login");
        navigation.navigate("Login");
      }
    };
    getToken();
  }, [selectedLocation]);

  // get all kennel near
  const getAllKennelNear = async (longitude, latitude, maxDistance, token) => {
    try {
      const data = await KennelService.getAllKennelNear(
        longitude,
        latitude,
        maxDistance,
        token
      );
      setKennels(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // get all volunteer near
  const getAllVolunteerNear = async (
    longitude,
    latitude,
    maxDistance,
    token
  ) => {
    try {
      const data = await VounteerService.getAllVolunteerNear(
        longitude,
        latitude,
        maxDistance,
        token
      );
      setVolunteersData(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // get user by id
  const getUserById = async (id, token) => {
    try {
      const data = await UserService.getUserById(id, token);
      setUserData(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const goToChangeLocation = () => {
    navigation.navigate("LocationSetterScreen", { setLocation: setSelectedLocation });
    console.log("selected location", selectedLocation);
  };

  const getAllKennel = async (token) => {
    try {
      const data = await KennelService.getAllKennels(token);
      setKennels(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const getAllVolunteer = async (token) => {
    try {
      const data = await VounteerService.getAllVolunteers(token);
      setVolunteersData(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const getAll = () => {
    setCategory("all");
  };

  const getProfessional = () => {
    setCategory("prop");
  };

  const getVolunteer = () => {
    setCategory("vol");
  };

  // Filter data based on the selected category
  const filteredData = () => {
    if (category === "all") {
      return [...kennels, ...volunteersData];
    } else if (category === "prop") {
      return kennels;
    } else if (category === "vol") {
      return volunteersData;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {userData.firstName}</Text>

      <View style={styles.location_container}>
        <View style={styles.location_container_details}>
          <View style={styles.location_container_icon}>
            <Icon name="map-marker" size={32} color="#333" />
          </View>
          <TouchableOpacity
            style={styles.location_container_text}
            onPress={goToChangeLocation}
          >
            <Text style={styles.address}>{selectedLocation.label}</Text>
            <Text style={styles.addressDetails}>{selectedLocation.address}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.change_button}
          onPress={goToChangeLocation}
        >
          <Text style={styles.change_button}>Change</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={getAll}>
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={getProfessional}>
          <Text>Professional</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={getVolunteer}>
          <Text>Volunteer</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.list}>
        {filteredData().map((item) => (
          <TouchableOpacity
            key={item.kennelId || item.volunteerId}
            style={styles.entry}
            onPress={() =>
              item.kennelId
                ? navigation.navigate("FosterProfile", {
                    kennelId: item.kennelId,
                  })
                : navigation.navigate("VolunteerProfileScreen", {
                    volunteerId: item.volunteerId,
                  })
            }
          >
            <Image source={{ uri: item.images[0] }} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>
                {item.kennelName || item.volunteerName}
              </Text>
              <Text style={styles.name}>
                {item.kennelAddress?.city || item.volunteerAddress?.city}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ffffff",
    marginTop: 60,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  location_container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  location_container_details: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  location_container_icon: {
    marginRight: 10,
  },
  location_container_text: {
    flex: 1,
  },
  address: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addressDetails: {
    fontSize: 14,
    color: "#666",
  },
  change_button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#cccccc",
    padding: 10,
    borderRadius: 5,
  },
  list: {
    flex: 1,
  },
  entry: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BookingHouseScreen;
