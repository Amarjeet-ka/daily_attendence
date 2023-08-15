import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { getAllUsers } from '../Database';
import MoneyDetailsPopup from './MoneyDetailsPopup'; // Import the MoneyDetailsPopup component

const StudentListScreen = ({ navigation }) => {
  const [studentList, setStudentList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isMoneyPopupVisible, setIsMoneyPopupVisible] = useState(false);

  useEffect(() => {
    getAllUsers((users) => {
      setStudentList(users);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Full Student List</Text>
      <FlatList
        data={studentList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>User Id: {item.id}</Text>
            <Text>Name: {item.name}</Text>
            <Text>Date of Birth: {item.dob}</Text>
            <Text>Age: {item.age}</Text>
            <Text>Mobile Number: {item.mobile}</Text>
            <Text>Address: {item.address}</Text>
            <Button
              title="Show details"
              onPress={() => {
                setSelectedStudent({ name: item.name, mobile: item.mobile });
                setIsMoneyPopupVisible(true);
              }}
            />
          </View>
        )}
      />

      {/* Display the money details popup */}
      <MoneyDetailsPopup
        visible={isMoneyPopupVisible}
        onClose={() => setIsMoneyPopupVisible(false)}
        studentName={selectedStudent ? selectedStudent.name : ''}
        studentMobile={selectedStudent ? selectedStudent.mobile : ''}
        moneyData="Placeholder: No money data available"
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

export default StudentListScreen;
