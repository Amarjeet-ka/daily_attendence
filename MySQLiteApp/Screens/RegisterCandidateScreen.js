import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { insertUser } from '../Database';

const RegisterCandidateScreen = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState(''); // Add state for the address field
  const [registrationStatus, setRegistrationStatus] = useState('');

  const handleRegister = () => {
    insertUser(name, dob, age, mobile, address); // Pass the address to insertUser

    setRegistrationStatus('User registration successful.');

    setName('');
    setDob('');
    setAge('');
    setMobile('');
    setAddress(''); // Clear the address field

    Alert.alert('Success', 'User registration successful.');

    setTimeout(() => {
      setRegistrationStatus('');
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register New User</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth (YYYY-MM-DD)"
        value={dob}
        onChangeText={setDob}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Address" // Add a placeholder for the address field
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Register" onPress={handleRegister} />

      {registrationStatus ? <Text>{registrationStatus}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default RegisterCandidateScreen;
