import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const TrainList = ({ route, navigation }) => {
  const { trains } = route.params; // Trains data passed from HomeScreen

  const handleTrainSelect = (train) => {
    // Navigate to AddPassenger screen with the selected train
    navigation.navigate("AddPassenger", { train });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Trains</Text>
      <FlatList
        data={trains}
        keyExtractor={(item) => item.TrainNo.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.trainItem}
            onPress={() => handleTrainSelect(item)}
          >
            <Text style={styles.trainText}>Train No: {item.TrainNo}</Text>
            <Text style={styles.trainText}>Source: {item.Source}</Text>
            <Text style={styles.trainText}>Destination: {item.Destination}</Text>
            <Text style={styles.trainText}>Departure: {item.DepartureTime}</Text>
            <Text style={styles.trainText}>Arrival: {item.ArrivalTime}</Text>
          </TouchableOpacity>
        )}
      />
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  trainItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  trainText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default TrainList;