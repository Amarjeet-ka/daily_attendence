import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  const navigateToStudentList = () => {
    navigation.navigate('StudentList');
  };

  const navigateToMarkAttendance = () => {
    navigation.navigate('MarkAttendance');
  };

  const navigateToDeleteCandidate = () => {
    navigation.navigate('DeleteCandidate');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <TouchableOpacity style={styles.button} onPress={navigateToRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToStudentList}>
        <Text style={styles.buttonText}>Student List</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToMarkAttendance}>
        <Text style={styles.buttonText}>Mark Attendance</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToDeleteCandidate}>
        <Text style={styles.buttonText}>Delete Candidate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    width: 200,
    marginTop: 20,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
