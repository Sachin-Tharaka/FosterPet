import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'; // Import Text from react-native
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const AdminNavbar = () => {
    const navigation = useNavigation();

    const navigateToOverView = () => {
        navigation.navigate('AdminOverView');
    };
      
    const navigateToApprovals = () => {
        navigation.navigate('AdminOrders');
    };
      
    const navigateToComplaints = () => {
        navigation.navigate('AdminComplaints');
    };
      
    const navigateToUsers = () => {
        navigation.navigate('AdminUserManagement');
    };
      
    return (
        <View style={styles.navBar}>
            <TouchableOpacity onPress={navigateToOverView} style={styles.navItem}>
                <Text style={styles.navText}>Overview</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToApprovals} style={styles.navItem}>
                <Text style={styles.navText}>Approvals</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToComplaints} style={styles.navItem}>
                <Text style={styles.navText}>Complaints</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToUsers} style={styles.navItem}>
                <Text style={styles.navText}>User Management</Text>
            </TouchableOpacity>
        </View>
    );
};
  
const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 80, // Increased height for desktop
        paddingHorizontal: 20, // Increased padding for desktop
        borderBottomWidth: 1, // Add a border for visual separation
        borderBottomColor: '#ddd', // Border color
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', // Add a shadow for depth
        width: '100%', // Make the navigation bar span the full width
    },
    navItem: {
        padding: 10, // Increase padding for better clickability
    },
    navText: {
        fontSize: 18, // Larger font size for better readability
        fontWeight: 'bold', // Bold text for emphasis
        color: '#333', // Darker text color for better contrast
    }
});
  
export default AdminNavbar;
