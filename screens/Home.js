import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
// https://youtu.be/CeW1M_7AFOU?si=UxFUqLQhudIHe03R
const Home = () => {
  const navigation=useNavigation();
  useEffect( () => {
    setTimeout( ()=>{
      // navigation.navigate('Login');
      chechLogin();

    },2000);
    const chechLogin=async()=>{
      const id= await AsyncStorage.getItem("USERID");
      if(id!==null){
        navigation.navigate('MainScreen');
      }
      else{
        navigation.navigate('Login');
      }
    }
  })
  // useState( () => {
  //   navigation.navigate('SignUp')
  // }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Chat App</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'purple',
    justifyContent:'center',
    alignItems:'center'
  },
  logo:{
    fontSize:30,
    color:'white',
    textAlign:'center'
  },

})