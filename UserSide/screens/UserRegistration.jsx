import React, { useState } from 'react';
import axios from "axios";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message'; // For validation popup

const UserRegistration = ({ navigation }) => {
  // State for input fields
  const [data, setData] = useState({
    Name: "",
    EmailId: "",
    Password: "",
    Gender: "Male", // Default gender
    Age: "",
    MobileNo: "",
    City: "",
    State: "",
    Pincode: "",
  });

  // Handle form submission
  const HandleRegister = async () => {
    const { Name, EmailId, Password, Gender, Age, MobileNo, City, State, Pincode } = data;

    // Validation
    if (!Name || !EmailId || !Password || !Gender || !Age || !MobileNo || !City || !State || !Pincode) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'All fields are required!',
        visibilityTime: 3000,
      });
      return;
    }

    // Send data to the backend
    try {
      const result = await axios.post(`${BASE_URL}/user`, data); // Updated endpoint for user registration
      console.log(result);

      // Show success toast
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'User Registration Successful!',
        visibilityTime: 3000,
      });

      // Delay navigation to login screen after showing toast message
      setTimeout(() => {
        navigation.navigate('UserLogin'); // Navigate to User Login after successful registration
      }, 3000); // Wait for 3 seconds before navigating
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Registration Failed!',
        visibilityTime: 3000,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>User Registration</Text>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={data.Name}
        onChangeText={(value) => setData({ ...data, Name: value })}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email ID"
        keyboardType="email-address"
        value={data.EmailId}
        onChangeText={(value) => setData({ ...data, EmailId: value })}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={data.Password}
        onChangeText={(value) => setData({ ...data, Password: value })}
      />

      {/* Gender Selection */}
      <View style={styles.radioGroup}>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.radioButtons}>
          <View style={styles.radioButton}>
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              checked={data.Gender === "Male"}
              onChange={() => setData({ ...data, Gender: "Male" })}
            />
            <label htmlFor="male">Male</label>
          </View>
          <View style={styles.radioButton}>
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              checked={data.Gender === "Female"}
              onChange={() => setData({ ...data, Gender: "Female" })}
            />
            <label htmlFor="female">Female</label>
          </View>
          <View style={styles.radioButton}>
            <input
              type="radio"
              id="other"
              name="gender"
              value="Other"
              checked={data.Gender === "Other"}
              onChange={() => setData({ ...data, Gender: "Other" })}
            />
            <label htmlFor="other">Other</label>
          </View>
        </View>
      </View>

      {/* Age Input */}
      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={data.Age}
        onChangeText={(value) => setData({ ...data, Age: value })}
      />

      {/* Mobile No Input */}
      <TextInput
        style={styles.input}
        placeholder="Mobile No"
        keyboardType="phone-pad"
        value={data.MobileNo}
        onChangeText={(value) => setData({ ...data, MobileNo: value })}
      />

      {/* City Input */}
      <TextInput
        style={styles.input}
        placeholder="City"
        value={data.City}
        onChangeText={(value) => setData({ ...data, City: value })}
      />

      {/* State Input */}
      <TextInput
        style={styles.input}
        placeholder="State"
        value={data.State}
        onChangeText={(value) => setData({ ...data, State: value })}
      />

      {/* Pincode Input */}
      <TextInput
        style={styles.input}
        placeholder="Pincode"
        keyboardType="numeric"
        value={data.Pincode}
        onChangeText={(value) => setData({ ...data, Pincode: value })}
      />

      {/* Register Button */}
      <Button title="Register" onPress={HandleRegister} />
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  radioGroup: {
    marginBottom: 15,
    width: '100%',
  },
  radioButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default UserRegistration;