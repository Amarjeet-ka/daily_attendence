import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { deleteUserByNameAndMobile } from '../Database'; // Import the appropriate deleteUserByNameAndMobile function

const DeleteCandidateScreen = () => {
  const [nameToDelete, setNameToDelete] = useState('');
  const [mobileToDelete, setMobileToDelete] = useState('');

  const handleDelete = () => {
    if (!nameToDelete || !mobileToDelete) {
      Alert.alert('Error', 'Please enter both the name and mobile number of the candidate to delete.');
      return;
    }

    deleteUserByNameAndMobile(nameToDelete, mobileToDelete, (rowsAffected) => {
      if (rowsAffected > 0) {
        Alert.alert('Success', 'Candidate deleted successfully.');
        setNameToDelete('');
        setMobileToDelete('');
      } else {
        Alert.alert('Error', 'Candidate not found or deletion failed.');
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delete Candidate</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Candidate Name"
        value={nameToDelete}
        onChangeText={setNameToDelete}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Candidate Mobile Number"
        value={mobileToDelete}
        onChangeText={setMobileToDelete}
        keyboardType="phone-pad"
      />
      <Button title="Delete" onPress={handleDelete} />
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

export default DeleteCandidateScreen;
