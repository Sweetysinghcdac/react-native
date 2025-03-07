import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const API_URL = "http://192.168.2.7:8000/api/users"; // Laravel API endpoint

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        getUsers(); // Call the function when component loads
    }, []);

    // ✅ Function to fetch users from Laravel API
    const getUsers = async () => {
        try {
            const token = await AsyncStorage.getItem("AUTH_TOKEN");

            if (!token) {
                console.error("No auth token found.");
                Alert.alert("Session Expired", "Please log in again.");
                navigation.replace("Login"); // Redirect to Login
                return;
            }

            const response = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
                setUsers(response.data.users);
            } else {
                console.error("Failed to fetch users:", response.data);
            }
        } catch (error) {
            console.error("Error fetching users:", error);

            if (error.response && error.response.status === 401) {
                Alert.alert("Session Expired", "Your login session has expired. Please log in again.");
                await AsyncStorage.clear(); // Clear old token
                navigation.replace("Login"); // Redirect to Login screen
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Chat App</Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="purple" style={{ marginTop: 20 }} />
            ) : (
                <FlatList 
                    data={users}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.userItem} 
                            onPress={() => navigation.navigate('Chat', { data: item })}
                        >
                            <Image 
                                source={{ uri: item.avatar || 'https://via.placeholder.com/40' }} 
                                style={styles.userIcon} 
                            />
                            <Text style={styles.name}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

export default Users;

const styles = StyleSheet.create({
    container: { backgroundColor: 'white', flex: 1 },
    header: {
        width: '100%',
        height: 60,
        backgroundColor: 'white',
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: { color: 'purple', fontSize: 20, fontWeight: '600' },
    userItem: {
        width: Dimensions.get('window').width - 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        height: 60,
        borderWidth: 0.5,
        borderRadius: 10,
        paddingLeft: 20,
    },
    userIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    name: { color: 'black', marginLeft: 20, fontSize: 20 },
});
