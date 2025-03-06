import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Users = () => {

    const  [users, setUsers]= useState([]);
    const navigation= useNavigation()

    useEffect( ()=>{
        getUsers();
    },[]);

    const getUsers= async()=>{
        const email = await AsyncStorage.getItem("EMAIl")
        
    }
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.container}>Chat App</Text>
        </View>
        <FlatList data={users} renderItem={({item,index})=>{
            return(
                <TouchableOpacity style={styles.userItem} onPress={()=>{
                    navigation.navigate('chat',{data:item})
                }}>
                    <Image source={require('../images/user.png')} style={styles.userIcon} />
                    <Text style={styles.userIcon} >{item.name}</Text>

                </TouchableOpacity>
            )

        }} />
    </View>
  )
}

export default Users

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1,
    },
    header:{
        width:'100%',
        height:60,
        backgroundColor:'white',
        elevation:5,
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        color:'purple',
        fontSize:20,
        fontWeight:'600',
    },
    userItem:{
        // width:Dimensions.get(window).width -50,
        alignItems:'center',
        marginTop:20,
        flexDirection:'row',
        height:60,
        borderWidth:0.5,
        borderRadius:10,
        paddingLeft:20,
        alignItems:'center'
    },
    userIcon:{
        width:40,
        height:40,
    },
    name:{
        color:'black',
        marginLeft:20,
        fontSize:20
    }
})