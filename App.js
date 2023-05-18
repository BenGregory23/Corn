import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import Navigation from './navigation/Navigation';



export default function App() {
  return (
    <>
        <StatusBar style="light" />
      <SafeAreaView style={styles.topSafeArea} />
        <Navigation>
        </Navigation>
    
    </>
  
  );
}

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
    backgroundColor: 'black'
  },
  
});
