import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const NotificationScreen = ({ navigation }) => {

  // Mock data for demonstration
  const notifications = [
    { id: 1, name: "Someone just reviewed", review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem nam purus vulputate quis.", stars: 4 },
    { id: 2, name: "Someone just reviewed", review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem nam purus vulputate quis.", stars: 5 },
    { id: 3, name: "Someone just reviewed", review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem nam purus vulputate quis.", stars: 3 },
    { id: 4, name: "Someone just reviewed", review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem nam purus vulputate quis.", stars: 4 },
    { id: 5, name: "Someone just reviewed", review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem nam purus vulputate quis.", stars: 5 },
    { id: 6, name: "Someone just reviewed", review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem nam purus vulputate quis.", stars: 3 },
    { id: 7, name: "Someone just reviewed", review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem nam purus vulputate quis.", stars: 4 },
    { id: 8, name: "Someone just reviewed", review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem nam purus vulputate quis.", stars: 5 },
    { id: 9, name: "Someone just reviewed", review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem nam purus vulputate quis.", stars: 3 },

    // Add more notifications here
  ];

  // Function to render stars based on rating
  const renderStars = (count) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Text key={i} style={{color: i < count ? '#FFD700' : '#ccc'}}>★</Text>
      );
    }
    return stars;
  };

  const goToChangeAdminOverView = () => {
    // Implement  "Take Me To Home" functionality here
    navigation.navigate('AdminOverView');

  };

  const handleTakeMeToUserAccount = () => {
    // Implement  "Take Me To Home" functionality here
    navigation.navigate('UserAccount');

  };


  return (
    <View style={styles.container}>

    <TouchableOpacity style={styles.button} onPress={goToChangeAdminOverView}>
      <Text style={styles.buttonText}>Admin UIs</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={handleTakeMeToUserAccount}>
      <Text style={styles.buttonText}>User Account UIs</Text>
    </TouchableOpacity>


      <Text style={styles.header}>Notifications</Text>
      <ScrollView style={styles.list}>
        {notifications.map(notification => (
          <View key={notification.id} style={styles.entry}>
          <Image source={{ uri: 'https://picsum.photos/400/600?image=1' }} style={styles.image} />
          <View style={styles.infoContainer}>
              <Text style={styles.name}>{notification.name}</Text>
              <Text style={styles.review}>{notification.review}</Text>
              <View style={{ flexDirection: 'row' }}>
                {renderStars(notification.stars)}
              </View>
            </View>
            <TouchableOpacity onPress={() => console.log("Close notification")}>
              <Text style={{fontSize: 18, color: '#888'}}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
    marginTop: 100
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign:'center'
  },
  list: {
    flex: 1,
  },
  entry: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  review: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default NotificationScreen;
