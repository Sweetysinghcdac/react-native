import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const API_URL = "http://192.168.2.7:8000/api/register"; // Laravel API URL

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const validate = () => {
        if (!name || !email || !mobile || !password || !confirmPassword) {
            Alert.alert("All fields are required!");
            return false;
        }
        if (password !== confirmPassword) {
            Alert.alert("Passwords do not match!");
            return false;
        }
        return true;
    };

    const registerUser = async () => {
        if (!name || !email || !mobile || !password || !confirmPassword) {
            Alert.alert("Error", "All fields are required.");
            return;
        }
    
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }
    
        try {
            const response = await axios.post(API_URL, {
                name,
                email,
                mobile,
                password
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
    
            if (response.status === 201) {
                const { user, token } = response.data;
    
                // ✅ Store user info & token
                await AsyncStorage.setItem('USER_NAME', user.name);
                await AsyncStorage.setItem('USER_EMAIL', user.email);
                await AsyncStorage.setItem('USER_ID', String(user.id));
                await AsyncStorage.setItem('AUTH_TOKEN', token);
    
                Alert.alert("Success", "Account created successfully!");
                navigation.replace('MainScreen');
            } else {
                Alert.alert("Signup Failed", "Please try again.");
            }
        } catch (error) {
            // ✅ Prevent error from logging in Metro
            if (error.response && error.response.status === 422) {
                const errorData = error.response.data.error; // Laravel returns validation errors in `error`
    
                let errorMessage = "Invalid input data.";
    
                if (typeof errorData === "object") {
                    errorMessage = Object.values(errorData).join("\n"); // Show all validation errors
                }
    
                Alert.alert("Signup Error", errorMessage);
            } else {
                Alert.alert("Signup Error", "Something went wrong. Please try again.");
            }
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput placeholder="Name" style={[styles.input, { marginTop: 50 }]}
                value={name} onChangeText={setName} />
            <TextInput placeholder="Enter Email" style={[styles.input, { marginTop: 20 }]}
                value={email} onChangeText={setEmail} keyboardType="email-address" />
            <TextInput keyboardType="number-pad" placeholder="Enter Mobile No."
                style={[styles.input, { marginTop: 20 }]} value={mobile} onChangeText={setMobile} />
            <TextInput placeholder="Enter Password" style={[styles.input, { marginTop: 20 }]}
                value={password} onChangeText={setPassword} secureTextEntry />
            <TextInput placeholder="Confirm Password" style={[styles.input, { marginTop: 20 }]}
                value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

            <TouchableOpacity style={styles.btn} onPress={registerUser} disabled={loading}>
                <Text style={styles.btnText}>{loading ? "Signing Up..." : "Sign Up"}</Text>
            </TouchableOpacity>

            <Text style={styles.orLogin} onPress={() => navigation.goBack()}>
                Or Login
            </Text>
        </View>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    title: { fontSize: 30, color: 'black', alignSelf: 'center', marginTop: 100, fontWeight: '600' },
    input: { width: '90%', height: 50, borderWidth: 0.5, borderRadius: 10, alignSelf: 'center', paddingLeft: 20 },
    btn: { width: '90%', height: 50, borderRadius: 10, alignSelf: 'center', marginTop: 50, backgroundColor: 'purple', justifyContent: 'center', alignItems: 'center' },
    btnText: { color: 'white', fontSize: 20 },
    orLogin: { alignSelf: 'center', marginTop: 50, fontSize: 20, textDecorationLine: 'underline', fontWeight: '600', color: 'black' },
});
