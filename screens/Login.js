import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = "http://192.168.2.7:8000/api/login"; // Your Laravel API URL

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation();

    const loginUser = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password');
            return;
        }
    
        setVisible(true);
    
        try {
            const response = await axios.post("http://192.168.2.7:8000/api/login", { email, password }, {
                headers: { 'Content-Type': 'application/json' }
            });
    
            if (response.status === 200) {
                const { user, token } = response.data;
    
                // ✅ Save user details & token
                await AsyncStorage.setItem('USER_NAME', user.name);
                await AsyncStorage.setItem('USER_EMAIL', user.email);
                await AsyncStorage.setItem('USER_ID', String(user.id));
                await AsyncStorage.setItem('AUTH_TOKEN', token); // Store the token
    
                Alert.alert("Success", "Login Successful!");
                navigation.replace('MainScreen');
            } else {
                Alert.alert("Login Failed", response.data.message || "Invalid credentials");
            }
        } catch (error) {
            // console.error("Login Error:", error);
            Alert.alert("Login Failed", "Invalid email or password.");
        } finally {
            setVisible(false);
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                placeholder='Enter Email'
                style={[styles.input, { marginTop: 100 }]}
                value={email}
                onChangeText={text => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                placeholder='Enter Password'
                style={[styles.input, { marginTop: 20 }]}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />

            <TouchableOpacity style={styles.btn} onPress={loginUser}>
                <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.orLogin} onPress={() => navigation.navigate('SignUp')}>
                Or Sign Up
            </Text>

            <Loader visible={visible} />
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    title: { fontSize: 30, color: 'black', alignSelf: 'center', marginTop: 100, fontWeight: '600' },
    input: { width: '90%', height: 50, borderWidth: 0.5, borderRadius: 10, alignSelf: 'center', paddingLeft: 20 },
    btn: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 50,
        backgroundColor: 'purple',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: { color: 'white', fontSize: 20 },
    orLogin: { alignSelf: 'center', marginTop: 50, fontSize: 20, textDecorationLine: 'underline', fontWeight: '600', color: 'black' },
});
