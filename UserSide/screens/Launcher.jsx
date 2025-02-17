import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';


import Train from './Train';
import Route from './Route';
import Station from './Station';
import Schedule from './Schedule';
import Login from './Login';
import Admin from './Admin';
import HomeScreen from './HomePage';
import TrainList from './TrainList';
import UserLogin from './UserLogin';
import UserRegistration from './UserRegistration';
import UserScreen from './UserScreen';
import Passenger from './AddPassenger';
import BookTicket from './BookTicket';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Train Management System</Text>
      <Text style={styles.subtitle}>
        Welcome to the Train Management System. Use the navigation bar to access different functionalities.
      </Text>
    </View>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: '#002147' },
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'gray',
      }}
    >
      <Drawer.Screen name="Admin" component={Dashboard} options={{ drawerIcon: () => <Ionicons name="home" size={20} color="white" /> }} />
      <Drawer.Screen name="Add Train" component={Train} options={{ drawerIcon: () => <Ionicons name="add-circle" size={20} color="white" /> }} />
      <Drawer.Screen name="Routes" component={Route} options={{ drawerIcon: () => <Ionicons name="git-branch" size={20} color="white" /> }} />
      <Drawer.Screen name="Stations" component={Station} options={{ drawerIcon: () => <Ionicons name="train" size={20} color="white" /> }} />
      <Drawer.Screen name="Train Schedule" component={Schedule} options={{ drawerIcon: () => <Ionicons name="time" size={20} color="white" /> }} />
      <Drawer.Screen name="Add Admin" component={Admin} options={{ drawerIcon: () => <Ionicons name="person-add" size={20} color="white" /> }} />
    </Drawer.Navigator>
  );
}

function Launcher() {
  return (
    
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="TrainList" component={TrainList} options={{ headerShown: true }} />
          <Stack.Screen name="UserLogin" component={UserLogin} options={{ headerShown: true }} />
          <Stack.Screen name="UserScreen" component={UserScreen} options={{ headerShown: true }} />
          <Stack.Screen name="AddPassenger" component={Passenger} options={{ headerShown: true }} />
          <Stack.Screen name="UserRegistration" component={UserRegistration} options={{ headerShown: true }} />
          <Stack.Screen name="AdminLogin" component={Login} options={{ headerShown: true }} />
          <Stack.Screen name="AdminDashboard" component={DrawerNavigator} options={{ headerShown: true }} />
          <Stack.Screen name="BookTicket" component={BookTicket} options={{ headerShown: true }} />
        </Stack.Navigator>
      </NavigationContainer>
   
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: 'center', paddingHorizontal: 20 }
});

export default Launcher;
