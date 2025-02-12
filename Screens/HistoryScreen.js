import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { db, collection, onSnapshot, deleteDoc, doc } from "../firebaseConfig";

const HistoryScreen = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up real-time listener
    const unsubscribe = onSnapshot(collection(db, "expenses"), (querySnapshot) => {
      const expensesList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setExpenses(expensesList);
      setLoading(false); // Stop loading once data is fetched
    }, (error) => {
      console.error("Error fetching expenses:", error);
      Alert.alert("Error", "Failed to load expenses.");
      setLoading(false);
    });

    // Cleanup listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  const clearExpenses = async () => {
    if (expenses.length === 0) {
      Alert.alert("No Expenses", "There are no expenses to delete.");
      return;
    }

    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete all expenses?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              for (let expense of expenses) {
                await deleteDoc(doc(db, "expenses", expense.id));
              }
              setExpenses([]); // Clear the local state
              Alert.alert("Success", "All expenses have been deleted.");
            } catch (error) {
              console.error("Error deleting expenses:", error);
              Alert.alert("Error", "Failed to delete expenses.");
            }
            setLoading(false);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense History</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#2E86C1" />
      ) : expenses.length === 0 ? (
        <Text style={styles.noExpenses}>No expenses recorded</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.expenseText}>{item.title}</Text>
              <Text style={styles.amount}>₹{item.amount}</Text>
            </View>
          )}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Clear History" color="#D9534F" onPress={clearExpenses} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#2E86C1",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  expenseText: {
    fontSize: 16,
    fontWeight: "500",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  noExpenses: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default HistoryScreen;
