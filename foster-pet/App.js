import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import LandingScreen from './screens/LandingScreen';
import EmailVerificationScreen from './screens/EmailVerificationScreen';
import BookingCardScreen from './screens/BookingCardScreen';
import BookingHouseScreen from './screens/BookingHouseScreen';
import NotificationScreen from './screens/NotificationScreen'
import FosterProfile from './screens/FosterProfile'
import LocationSetterScreen from './screens/LocationSetterScreen';
import AdminOverView from './screens/AdminOverView';
import AdminOrders from './screens/AdminOrders';
import AdminComplaints from './screens/AdminComplaints';
import AdminUserManagement from './screens/AdminUserManagement';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Welcome'
      >
         <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false
          }}
        />

    <Stack.Screen
          name="Reset"
          component={ResetPasswordScreen}
          options={{
            headerShown: false
          }}
        />
      <Stack.Screen
          name="Signup"
          component={RegisterScreen}
          options={{
            headerShown: false
          }}
        />  
      <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false
          }}
        />  
        <Stack.Screen
          name="EmailVerification"
          component={EmailVerificationScreen}
          options={{
            headerShown: false
          }}
        />  
        <Stack.Screen
          name="Booking"
          component={BookingCardScreen}
          options={{
            headerShown: false
          }}
        />  
      <Stack.Screen
          name="BookingHouse"
          component={BookingHouseScreen}
          options={{
            headerShown: false
          }}
        /> 
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{
            headerShown: false
          }}
        /> 
        
        <Stack.Screen
          name="FosterProfile"
          component={FosterProfile}
          options={{
            headerShown: false
          }}
        /> 
        <Stack.Screen
        name="LocationSetterScreen"
        component={LocationSetterScreen}
        options={{
          headerShown: false
        }}
      /> 
      <Stack.Screen
        name="AdminUserManagement"
        component={AdminUserManagement}
        options={{
          headerShown: false
        }}
      /> 
      
      <Stack.Screen
      name="AdminComplaints"
      component={AdminComplaints}
      options={{
        headerShown: false
      }}
    /> 
    
    <Stack.Screen
    name="AdminOrders"
    component={AdminOrders}
    options={{
      headerShown: false
    }}
  /> 
  
  <Stack.Screen
  name="AdminOverView"
  component={AdminOverView}
  options={{
    headerShown: false
  }}
/> 

 
<Stack.Screen
name="AgentWallet"
component={AgentWallet}
options={{
  headerShown: false
}}
/> 

<Stack.Screen
name="AgentApprovals"
component={AgentApprovals}
options={{
  headerShown: false
}}
/> 
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}


