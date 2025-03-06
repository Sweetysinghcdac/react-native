import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Users = () => {
    const [users, setUsers] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const email = await AsyncStorage.getItem("EMAIL");
        
        // Dummy users for testing
        const dummyUsers = [
            { id: '1', name: 'John Doe', email: 'john@example.com', avatar: require('../images/user.png') },
            { id: '2', name: 'Jane Smith', email: 'jane@example.com', avatar: require('../images/user.png') },
            { id: '3', name: 'Alice Johnson', email: 'alice@example.com', avatar: require('../images/user.png') }
        ];
        
        setUsers(dummyUsers);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Chat App</Text>
            </View>

            <FlatList 
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.userItem} 
                        onPress={() => navigation.navigate('Chat', { data: item })}
                    >
                        <Image source={item.avatar} style={styles.userIcon} />
                        <Text style={styles.name}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default Users;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    header: {
        width: '100%',
        height: 60,
        backgroundColor: 'white',
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'purple',
        fontSize: 20,
        fontWeight: '600',
    },
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
    name: {
        color: 'black',
        marginLeft: 20,
        fontSize: 20,
    }
});
