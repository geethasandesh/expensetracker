import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard, Image } from "react-native";
import { db, collection, addDoc } from "../firebaseConfig"; // Import Firestore functions
import  busines from '../assets/business.png'; // Import the image

const AddExpenseScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const saveExpense = async () => {
    if (!title || !amount) {
      Alert.alert("Error", "Please enter both title and amount");
      return;
    }

    try {
      await addDoc(collection(db, "expenses"), {
        title,
        amount: parseFloat(amount),
        date: new Date().toISOString(),
      });

      setTitle("");
      setAmount("");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error adding expense:", error);
      Alert.alert("Error", "Failed to save expense");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Add Image above Expense Title */}
        <Image source={busines} style={styles.image} />

        <Text style={styles.label}>Expense Title</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />

        <Text style={styles.label}>Amount</Text>
        <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" />

        <Button title="Add Expense" onPress={saveExpense} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  label: { fontSize: 16, marginTop: 10 },
  input: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 },
  image: { width: 300, height:300, alignSelf:"center", marginBottom: 20 }, // Style the image
});

export default AddExpenseScreen;
