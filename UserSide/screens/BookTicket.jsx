import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../config";

const BookTicket = ({ route, navigation }) => {
  const { train, passengers, TicketId, NoOfPassengers, TotalFare } = route.params;
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("userData"); // Ensure the correct key
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUserId(parsedUser.id); // Extract `id` from stored user object
        }
      } catch (error) {
        console.error("Error retrieving UserId:", error);
      }
    };
    fetchUserId();
  }, []);

  const confirmBooking = async () => {
    if (!userId) {
      Toast.show({
        type: "error",
        text1: "⚠️ User not found",
        text2: "Please log in again.",
      });
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/ticket`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserId: userId, // ✅ Corrected `id` to `userId`
          TrainNo: train.TrainNo,
          TicketId,
          NoOfPassengers,
          BookingDate: new Date().toISOString().split("T")[0], // Current Date
          TotalFare,
          passengers,
        }),
      });

      const data = await response.json();
      console.log("API Response:", data); // Debugging the response

      if ( data.success) {
        Toast.show({
          type: "success",
          text1: "✅ Booking Confirmed",
          text2: `Your Ticket ID: ${TicketId}`,
        });

        setTimeout(() => {
          navigation.replace("Home");
        }, 3000);
      } else {
        Toast.show({
          type: "error",
          text1: data.message || "Please try again!",
          text2: `Your Ticket ID: ${TicketId}`
        });
        setTimeout(() => {
          navigation.replace("Home");
        }, 3000);
      }
    } catch (error) {
      console.error("Booking Error:", error);
      Toast.show({
        type: "error",
        text1: "⚠️ Error",
        text2: "An error occurred while booking the ticket.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Details</Text>
      <Text>🚆 Train No: {train.TrainNo}</Text>
      <Text>📍 From: {train.Source}</Text>
      <Text>📍 To: {train.Destination}</Text>
      <Text>🕒 Departure: {train.DepartureTime}</Text>
      <Text>🕒 Arrival: {train.ArrivalTime}</Text>
      <Text>🎫 Ticket ID: {TicketId}</Text>
      <Text>👥 Passengers: {NoOfPassengers}</Text>
      <Text>💰 Total Fare: ₹{TotalFare}</Text>

      <TouchableOpacity style={styles.bookButton} onPress={confirmBooking}>
        <Text style={styles.bookButtonText}>Confirm Booking</Text>
      </TouchableOpacity>

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  bookButton: { backgroundColor: "blue", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 20 },
  bookButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default BookTicket;
