import React, { useState, useEffect } from "react";
import { View, Modal, Text, Button, StyleSheet, TextInput } from "react-native";
import { insertMoney, getMoneyDetails } from "../Database"; // Import your insertMoney and getMoneyDetails functions

const MoneyDetailsPopup = ({
  visible,
  onClose,
  studentName,
  studentMobile,
}) => {
  const [moneyAmount, setMoneyAmount] = useState("");
  const [moneyData, setMoneyData] = useState([]);

  useEffect(() => {
    // Fetch money data when the component mounts or student details change
    if (studentName && studentMobile) {
      getMoneyDetails(studentName, studentMobile, (data) => {
        setMoneyData(data); // Set the money data array retrieved from the database
      });
    }
  }, [studentName, studentMobile]);

  const handleAddMoney = () => {
    if (moneyAmount.trim() === "") {
      return; // Don't proceed if the amount is empty
    }

    const timestamp = new Date().toLocaleString(); // Get current timestamp
    insertMoney(studentName, studentMobile, parseInt(moneyAmount), timestamp);
    onClose(); // Close the popup after adding money
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Money Details</Text>
          <Text>Student Name: {studentName}</Text>
          <Text>Mobile Number: {studentMobile}</Text>
          <Text>Money Data:</Text>
          <View>
            {moneyData.map((entry, index) => (
              <Text key={index}>
                ₹{entry.amount} - {entry.date}
              </Text>
            ))}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Enter Money Amount"
            value={moneyAmount}
            onChangeText={setMoneyAmount}
            keyboardType="numeric"
          />
          <Button title="Add Money" onPress={handleAddMoney} />
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default MoneyDetailsPopup;
