import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import UserService from '../services/UserService';

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword,setConfirmPassword]=useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState(''); 
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError,setConfirmPasswordError]=useState('');
  const [error,setError]=useState('');

  const handleRegister = async() => {
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setError('');
    
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!firstName) {
      setFirstNameError('First name is required.');
      return;
    } else if (!lastName) {
      setLastNameError('Last name is required.');
      return;
    }
    else if (!email) {
      setEmailError('Email is required.');
      return;
    } else if (!regex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    } else if (!password) {
      setPasswordError('Password is required.');
      return;
    }else if(password.length<8){
        setPasswordError('Password must have minimum 8 charactors');
      return;
    }else if(!confirmPassword){
        setConfirmPasswordError('Confirm Password is required.');
      return;
    }else if(password!==confirmPassword){
        setConfirmPasswordError('Confirm Password should be match with password.');
      return;
    }

    // call register function
    try {
      const userData = await UserService.register(firstName,lastName, email, password);
      
      console.log('Registered:', userData);
      sessionStorage.setItem('token',userData.token);
      //navigate to home screen
    navigation.navigate('Home');
    } catch (error) {
      // Handle registration error 
      console.error('Registration failed:', error.message);
      setError('Already have an account with this Email Address');
    }

    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={(text) => setFirstName(text)}
        value={firstName}
      />
      {firstNameError && <Text style={styles.error}>{firstNameError}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={(text) => setLastName(text)}
        value={lastName}
      />
      {lastNameError && <Text style={styles.error}>{lastNameError}</Text>}
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

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        secureTextEntry={true}
      />
      {confirmPasswordError && <Text style={styles.error}>{confirmPasswordError}</Text>}

      <Text>
 Already have an account?{' '}
  <Text style={styles.login} onPress={() => navigation.navigate('Login')}>
    Login
  </Text>
</Text>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
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
  login: {
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
