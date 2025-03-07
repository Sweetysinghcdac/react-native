import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const id = await AsyncStorage.getItem("USER_ID");
                if (id !== null) {
                    navigation.replace('MainScreen'); // Prevents going back to Home
                } else {
                    navigation.replace('Login'); // Redirect to Login
                }
            } catch (error) {
                console.error("Error checking login:", error);
                navigation.replace('Login'); // Redirect to Login if error occurs
            }
        };

        setTimeout(() => {
            checkLogin();
        }, 2000);
    }, [navigation]); // Dependency array ensures effect runs only once

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Chat App</Text>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'purple',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
    },
});
