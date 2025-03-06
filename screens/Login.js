import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Login = () => {
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');

    const [visible, setVisible]=useState(false);
    const navigation = useNavigation();

    const loginUser=()=>{
        setVisible(true);
        if('email'==''){
           
            Alert.alert('enter  email')
            setVisible(false);

        }
        else{
            setVisible(false);
            goToNext("name","email","password")
        }
    }


    const goToNext=async(name, email, userId)=>{
        await AsyncStorage.setItem('NAME',name);
        await AsyncStorage.setItem('EMAIL',email);
        await AsyncStorage.setItem('PASSWORD',password);
        navigation.navigate('Main');


    }
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
    
        <TouchableOpacity style={styles.btn} onPress={()=>{
            loginUser();
            // navigation.navigate('h');
        }}>
            <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.orLogin} onPress={ () =>{
                navigation.navigate('SignUp')
            }}>Or Sign Up</Text>

        
        <Loader visible={visible} />

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