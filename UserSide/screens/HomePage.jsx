import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import logo from "../assets/logo.png";
import BASE_URL from "../config";

const HomeScreen = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [trains, setTrains] = useState([]);
  const navigation = useNavigation();

  const handleSearch = async () => {
    if (!source || !destination) {
      Alert.alert("Error", "Please enter both source and destination.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(`${BASE_URL}/train/search`, {
        params: { Source: source, Destination: destination },
      });

      if (response.data.length > 0) {
        setTrains(response.data);
        navigation.navigate("TrainList", { trains: response.data });
      } else {
        Alert.alert("No Trains Found", "No trains are available for the given source and destination.");
      }
    } catch (error) {
      console.error("Search error:", error);
      Alert.alert("Error", "Failed to fetch train details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <View style={styles.loginContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("UserLogin")}> 
          <Text style={styles.loginButtonText}>User Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("AdminLogin")}> 
          <Text style={styles.loginButtonText}>Admin Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.title}>Find Your Train</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Source"
          value={source}
          onChangeText={setSource}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Destination"
          value={destination}
          onChangeText={setDestination}
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Search Trains</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F0FE",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  loginContainer: {
    position: "absolute",
    top: 40,
    right: 20,
    flexDirection: "row",
    gap: 12,
  },
  loginButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    elevation: 3,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  searchContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#F4F6F8",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    color: "#333",
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
