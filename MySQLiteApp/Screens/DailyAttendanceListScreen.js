import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getAllUsers } from '../Database';

const DailyAttendanceListScreen = () => {
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    getAllUsers((users) => {
      const filteredAttendance = users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          mobile: user.mobile,
          morningAttendance: user.morningAttendance,
          afternoonAttendance: user.afternoonAttendance,
          nightAttendance: user.nightAttendance,
          attendanceDate: user.attendanceDate,
        };
      });
      setAttendanceList(filteredAttendance);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Attendance List</Text>
      <FlatList
        data={attendanceList}
        keyExtractor={(item) => `${item.id}_${item.attendanceDate}`}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Name: {item.name}</Text>
            <Text>Mobile: {item.mobile}</Text>
            <Text>Attendance Date: {item.attendanceDate}</Text>
            <Text>Morning Attendance: {item.morningAttendance === 1 ? 'Present' : 'Absent'}</Text>
            <Text>Afternoon Attendance: {item.afternoonAttendance === 1 ? 'Present' : 'Absent'}</Text>
            <Text>Night Attendance: {item.nightAttendance === 1 ? 'Present' : 'Absent'}</Text>
          </View>
        )}
      />
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
  item: {
    marginBottom: 20,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default DailyAttendanceListScreen;
