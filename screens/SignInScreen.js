import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar, 
} from 'react-native';
import { getAuth } from "firebase/auth";
import { firebaseApp } from '../App';
import { handleSignIn, handleSignUp } from '../utils/Auth';

const auth = getAuth(firebaseApp);

export const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    handleSignIn(auth, email, password);
  }

  const signUp = () => {
    handleSignUp(auth, email, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home")
      }
    })

    return unsubscribe
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar backgroundColor = "#000" barStyle = "light-content" />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TouchableOpacity onPress={signIn} style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={signUp} style={styles.buttonOutline}>
          <Text style={styles.buttonOutlineText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Define o fundo preto
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#008000', // Define a cor verde
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderColor: '#008000', // Define a cor verde
    borderWidth: 2,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  buttonOutlineText: {
    color: '#008000', // Define a cor verde
    fontWeight: '700',
    fontSize: 18,
  },
});
