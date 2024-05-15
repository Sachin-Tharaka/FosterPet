import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import PaymentService from "../services/PaymentService";

const PaymentScreen = () => {
  const petType = "Dog";
  const hourlyRate = 15;
  const duration = 2;
  const totalAmount = hourlyRate * duration;

  return (
    <View style={styles.container}>
      <StripeProvider publishableKey="pk_test_51PGFGO2Mzh1pKqwn6HSotqsp8Dx27Ybk9OqinB1tWnl9Hm5PvQC6c17JMEJWGX72Uopgr9D6u6F8WgvcXlv4TSdX00HphqP7y4">
        <View style={styles.checkoutContainer}>
          <Text style={styles.title}>Payment Details</Text>
          <Text style={styles.info}>Pet Type: {petType}</Text>
          <Text style={styles.info}>Hourly Rate: ${hourlyRate}/hr</Text>
          <Text style={styles.info}>Duration: {duration} hours</Text>
          <Text style={styles.totalAmount}>Total Amount: ${totalAmount}</Text>
          <View style={styles.checkoutButton}>
            <PaymentService />
          </View>
        </View>
      </StripeProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  checkoutContainer: {
    marginTop: 20,
    width: "90%",
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: "auto",
    marginBottom: 30,
    color: "#333",
  },
  info: {
    fontSize: 18,
    color: "#666",
    marginBottom: 5,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff4500",
    marginTop: 10,
  },
  checkoutButton: {
    marginTop: 40,
  },
});

export default PaymentScreen;
