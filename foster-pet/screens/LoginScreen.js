import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import UserService from '../services/UserService';
import Navbar from '../components/Navbar';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [error,setError]=useState('');

  const handleLogin = async() => {
    console.warn('Loging...');
    setEmailError('');
    setPasswordError('');
    setError('');
    
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email) {
      setEmailError('Email is required.');
      return;
    } else if (!regex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    } else if (!password) {
      setPasswordError('Password is required.');
      return;
    }

    // Call the login function
    try {
      const userData = await UserService.login(email, password);
      console.log('Logged in:', userData);
      sessionStorage.setItem('token',userData.token);

      //navigate to home
    navigation.navigate('Home');
    } catch (error) {
      // Handle login error 
      console.error('Login failed:', error.message);
      setError("Invalid Email Address or Password");
    }
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
      <Text style={styles.title}>Login Page</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      {emailError && <Text style={styles.error}>{emailError}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      {passwordError && <Text style={styles.error}>{passwordError}</Text>}

      <Text>
 Forgot Password?{' '}
  <Text style={styles.forgotPassword} onPress={() => navigation.navigate('Reset')}>
    Reset Password
  </Text>
</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
      <Text>
  You don't have an account?{' '}
  <Text style={styles.register} onPress={() => navigation.navigate('Signup')}>
    Register
  </Text>
</Text>
</View>
<Navbar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%'
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 0,
    marginTop: 20,
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: 100,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginTop: 5,
    marginBottom: 10,
  },
  forgotPassword: {
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  register: {
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
