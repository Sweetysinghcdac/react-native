import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
// https://youtu.be/CeW1M_7AFOU?si=UxFUqLQhudIHe03R
const Home = () => {
  const navigation=useNavigation();
  useEffect( () => {
    setTimeout( ()=>{
      navigation.navigate('SignUp');
    },2000)
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
  }


})