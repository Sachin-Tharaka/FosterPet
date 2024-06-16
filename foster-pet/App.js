import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import LandingScreen from "./screens/LandingScreen";
import EmailVerificationScreen from "./screens/EmailVerificationScreen";
import BookingCardScreen from "./screens/BookingCardScreen";
import BookingHouseScreen from "./screens/BookingHouseScreen";
import NotificationScreen from "./screens/NotificationScreen";
import FosterProfile from "./screens/FosterProfile";
import LocationSetterScreen from "./screens/LocationSetterScreen";
import UserAccount from "./screens/UserAccount";
import BecomeAgent from "./screens/BecomeAgent";
import AgentHome from "./screens/KennelHome";
import AgentChat from "./screens/AgentChat";
import AgentApprovals from "./screens/KennelBookingScreen";
import AgentWallet from "./screens/AgentWallet";
import PetsScreen from "./screens/PetsScreen";
import PetProfileScreen from "./screens/PetProfileScreen";
import ChangeDetails from "./screens/ChangeDetails";
import SwitchAccounts from "./screens/SwitchAccounts";
import PaymentScreen from "./screens/PaymentScreen";
import AddPetScreen from "./screens/AddPetScreen";
import UpdatePetProfileScreen from "./screens/UpdatePetProfileScreen";
import VerificationScreenForForgetPassword from "./screens/VerificationScreenForForgetPassword";
import SaveNewPasswordScreen from "./screens/SaveNewPasswordScreen";
import MyKennelsScreen from "./screens/MyKennelsScreen";
import AddNewKennelScreen from "./screens/AddNewKennelScreen";
import UpdateKennelDataScreen from "./screens/UpdateKennelDataScreen";
import KennelReviewScreen from "./screens/KennelReviewScreen";
import BeAVolunteerScreen from "./screens/BeAVolunteerScreen";
import VolunteerScreen from "./screens/VolunteerScreen";
import UpdateVolunteerScreen from "./screens/UpdateVolunteerScreen";
import CustomerProfileScreen from "./screens/CustomerProfileScreen";
import CustomerPetsScreen from "./screens/CustomerPetsScreen";
import CustomerPetProfileScreen from "./screens/CustomerPetProfileScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Reset"
          component={ResetPasswordScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EmailVerification"
          component={EmailVerificationScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Booking"
          component={BookingCardScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BookingHouse"
          component={BookingHouseScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="FosterProfile"
          component={FosterProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LocationSetterScreen"
          component={LocationSetterScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="AgentWallet"
          component={AgentWallet}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="AgentApprovals"
          component={AgentApprovals}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="UserAccount"
          component={UserAccount}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BecomeAgent"
          component={BecomeAgent}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="AgentHome"
          component={AgentHome}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="AgentChat"
          component={AgentChat}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PetsScreen"
          component={PetsScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="PetProfileScreen"
          component={PetProfileScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChangeDetails"
          component={ChangeDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SwitchAccounts"
          component={SwitchAccounts}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddPetScreen"
          component={AddPetScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="UpdatePetProfileScreen"
          component={UpdatePetProfileScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="VerificationScreenForSaveNewPassword"
          component={VerificationScreenForForgetPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SaveNewPasswordScreen"
          component={SaveNewPasswordScreen}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen
          name="MyKennelsScreen"
          component={MyKennelsScreen}
          options={{
            headerShown: false,
          }}
        />


<Stack.Screen
          name="AddNewKennelScreen"
          component={AddNewKennelScreen}
          options={{
            headerShown: false,
          }}
        />


<Stack.Screen
          name="UpdateKennelDataScreen"
          component={UpdateKennelDataScreen}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen
          name="KennelReviewScreen"
          component={KennelReviewScreen}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen
          name="BeVolunteerScreen"
          component={BeAVolunteerScreen}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen
          name="VolunteerScreen"
          component={VolunteerScreen}
          options={{
            headerShown: false,
          }}
        />


<Stack.Screen
          name="UpdateVolunteerProfileScreen"
          component={UpdateVolunteerScreen}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen
          name="CustomerProfile"
          component={CustomerProfileScreen}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen
          name="CustomerPetsScreen"
          component={CustomerPetsScreen}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen
          name="CustomerPetProfileScreen"
          component={CustomerPetProfileScreen}
          options={{
            headerShown: false,
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
