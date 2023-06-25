import React, { useEffect, useRef } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableHighlight,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import { useState } from 'react';

import { ActivityIndicator } from 'react-native';
import sha256 from 'crypto-js/sha256';

const SignUpScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSignUp = () => {
    const url = 'https://evening-shore-83627.herokuapp.com/register';

    if (email === '' || password === '' || name === '') {
      alert('Please fill in all fields');
      return;
    }

    const hashedPassword = sha256(password).toString();

    fetch(
      url +
        '?email=' +
        email +
        '&password=' +
        hashedPassword +
        '&name=' +
        name,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((data) => {
      navigation.replace('Login');
    });
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.box}>
          <AnimatedLottieView
            source={require('../assets/popcorn.json')}
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
          />
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.title}>Join us now!</Text>
          </Animated.View>
        </View>

        <View style={styles.box}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="white"
              onChangeText={setEmail}
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="white"
              onChangeText={setName}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="white"
              onChangeText={setPassword}
              textContentType="newPassword"
              secureTextEntry={true}
              autoCorrect={false}
            />
          </View>
          <TouchableHighlight onPress={() => navigation.replace('Login')}>
            <Text style={styles.signUpButton}>
              Already have an account? Log in
            </Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.logInButton}
            onPress={handleSignUp}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#00ff00" />
            ) : (
              <Text style={styles.logInText}>Sign up</Text>
            )}
          </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    maxHeight: 400,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    fontSize: 17,
    borderWidth: 2,
    width: 270,
    padding: 10,
    margin: 6,
    borderRadius: 12,
    color: 'white',
    backgroundColor: 'black',
    borderColor: 'white',
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logInButton: {
    backgroundColor: '#34D1BF',
    padding: 10,
    borderRadius: 12,
    width: 270,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50,
  },
  logInText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  signUpButton: {
    color: 'white',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
