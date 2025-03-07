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
        if (!validate()) return;

        setLoading(true);
        try {
            const response = await axios.post(API_URL, {
                name: name,
                email: email,
                mobile: mobile,
                password: password
            });

            if (response.status === 201 || response.status === 200) {
                Alert.alert("Success", "User registered successfully!");
                navigation.navigate('Login'); // Redirect to Login screen
            } else {
                Alert.alert("Error", "Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            Alert.alert("Signup Failed", error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
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
