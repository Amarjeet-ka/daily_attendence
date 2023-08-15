import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet } from 'react-native';
import { markAttendance, getAllUsers, isAttendanceMarked } from '../Database';

const MarkAttendanceScreen = () => {
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState('morning');
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    // Fetch the list of students when the component mounts
    getAllUsers((users) => {
      setStudentList(users);
    });
  }, []);

  const handleMarkAttendance = (studentId) => {
    const currentTime = new Date().toLocaleTimeString();
    const attendanceDate = new Date().toLocaleDateString(); // Get the current date

    markAttendance(studentId, selectedTimeOfDay, attendanceDate, (rowsAffected) => {
      if (rowsAffected > 0) {
        Alert.alert('Success', 'Attendance marked successfully.');
        // Refresh the student list after marking attendance
        getAllUsers((users) => {
          setStudentList(users);
        });
      } else {
        Alert.alert('Error', 'Attendance marking failed.');
      }
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Morning" onPress={() => setSelectedTimeOfDay('morning')} />
      <Button title="Afternoon" onPress={() => setSelectedTimeOfDay('afternoon')} />
      <Button title="Night" onPress={() => setSelectedTimeOfDay('night')} />

      <Text style={styles.listTitle}>Student List:</Text>
      <FlatList
        data={studentList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Name: {item.name}</Text>
            <Text>Mobile: {item.mobile}</Text>
            <Button
              title={`Mark ${selectedTimeOfDay.charAt(0).toUpperCase() + selectedTimeOfDay.slice(1)} Attendance`}
              onPress={() => handleMarkAttendance(item.id)}
              disabled={item[`${selectedTimeOfDay}Attendance`] === 1}
            />
          </View>
        )}
      />
    </View>
  );
};

// ...rest of the styles and export statement

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  listTitle: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  item: {
    marginBottom: 20,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default MarkAttendanceScreen;
