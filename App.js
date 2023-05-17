import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import Navigation from './navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import RandomMoviesProvider from './components/RandomMoviesProvider';

export default function App() {
  return (
  
      <Navigation/>
   

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
