import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';




const Login = () => {
    const [name, setName]= useState('');
    const [email, setEmail]= useState('');
    const [mobile, setMobile]= useState('');
    const [password, setPassword]= useState('');
    const [confirmPassword, setconfirmPassword]= useState('');
   

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
     
     
      <TextInput placeholder='Enter Email'style={[styles.input, {marginTop:100}]} 
       value={email}
       onChangeText={text=>setEmail}
       />
   
      <TextInput placeholder='Enter Password'style={[styles.input, {marginTop:20}]}
       value={password}
       onChangeText={text=>setPassword}
        />
    
        <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.orLogin} onPress={ () =>{
                navigation.goBack();
            }}>Or Sign Up</Text>

    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    title:{
        fontSize:30,
        color:'black',
        alignSelf:'center',
        marginTop:100,
        fontWeight:600
    },
    input:{
        width:'90%',
        height:50,
        borderWidth:0.5,
        borderRadius:10,
        alignSelf:'center',
        paddingLeft:20
    },
    btn: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 50,
        backgroundColor: 'purple',
        justifyContent: 'center', // Center content vertically
        alignItems: 'center',     // Center content horizontally
    },
    btnText: {
        color: 'white',
        fontSize: 20,
    },
    orLogin:{
        alignSelf:'center',
        marginTop:50,
        fontSize:20,
        textDecorationLine:'underline',
        fontWeight:'600',
        color:'black'
    }

})