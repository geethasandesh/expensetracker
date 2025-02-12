import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import rupee from "../assets/rupee.jpg"; // Import the rupee image

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Rupee Image */}
      <Image source={rupee} style={styles.rupeeImage} />

      {/* Title Text */}
      <Text style={styles.title}>Track your daily Expenses</Text>

      {/* Get Started Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.replace("Home")}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // Set background color to white
  },
  rupeeImage: {
    width: 320,  // Adjust size as needed
    height: 320,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 3, // For Android shadow
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
