import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator } from "react-native";
import { db, collection, onSnapshot } from "../firebaseConfig";
import user from "../assets/user.jpg";

const HomeScreen = () => {
  const [expenses, setExpenses] = useState([]);
  const [creditCardBalance, setCreditCardBalance] = useState(12000); // Initial balance
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up real-time listener
    const unsubscribe = onSnapshot(collection(db, "expenses"), (querySnapshot) => {
      const expensesList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setExpenses(expensesList);
      setLoading(false); // Stop loading once data is fetched
    }, (error) => {
      console.error("Error fetching expenses:", error);
      setLoading(false); // Stop loading even if there is an error
    });

    // Cleanup listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  const getTotalAmount = () => {
    return expenses.reduce((total, item) => total + parseFloat(item.amount), 0);
  };

  const remainingCredit = creditCardBalance - getTotalAmount();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sandesh</Text>
        <Image source={user} style={styles.profileImage} />
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceTitle}>Total Balance</Text>
        <Text style={styles.balanceAmount}>₹{getTotalAmount().toFixed(2)}</Text>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Credit Card</Text>
          <Text style={styles.cardAmount}>₹{remainingCredit.toFixed(2)}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Recent Transactions</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#2E86C1" />
      ) : expenses.length === 0 ? (
        <Text style={styles.noExpenses}>No expenses recorded</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <Text>{item.title}</Text>
              <Text style={{ color: "red" }}>-₹{item.amount}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold" },
  profileImage: { width: 35, height: 35, borderRadius: 20 },
  balanceContainer: { backgroundColor: "white", padding: 20, borderRadius: 10, marginBottom: 20 },
  balanceTitle: { fontSize: 16, color: "gray" },
  balanceAmount: { fontSize: 24, fontWeight: "bold", color: "#2E86C1" },
  cardContainer: { marginBottom: 20 },
  card: { backgroundColor: "#2E86C1", padding: 20, borderRadius: 10 },
  cardTitle: { color: "white", fontSize: 16 },
  cardAmount: { color: "white", fontSize: 20, fontWeight: "bold" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  transactionItem: { flexDirection: "row", justifyContent: "space-between", padding: 15, backgroundColor: "white", marginBottom: 5, borderRadius: 10 },
  noExpenses: { textAlign: "center", fontSize: 16, color: "gray", marginTop: 20 },
});

export default HomeScreen;
