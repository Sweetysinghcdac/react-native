import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebaseConfig';
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// import { app } from "../firebaseConfig"; // Ensure the correct path

// import { v4 as uuidv4 } from 'uuid';  // Use 'uuid' package

const SignUp = () => {
    const [name, setName]= useState('');
    const [email, setEmail]= useState('');
    const [mobile, setMobile]= useState('');
    const [password, setPassword]= useState('');
    const [confirmPassword, setConfirmPassword]= useState('');

    const navigation = useNavigation();
    
    // const registerUser = async () => {
    //     try {
    //         await addDoc(collection(db, "users"), {
    //             name,
    //             email,
    //             password,
    //             mobile,
    //             userId: uuidv4(),
    //         });
    //         console.log("User created successfully!");
    //     } catch (error) {
    //         console.error("Error creating user:", error);
    //     }
    // };


    const registerUser = async () => {
        try {
           
            console.log("User created successfully!");
            navigation.navigate('Login');
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };


    // const userId= uuid.v4()
    // const registerUser= ()=>{
    //     firestore().collection("users").doc(userId).set({
    //         name:name,
    //         email:email,
    //         password:password,
    //         mobile:mobile,
    //         userId:userId,

    //     }).then(res=>{
    //         console.log("user created")
    //     }).catch(error =>{
    //         console.log(error)
    //     })
    // }
    const validate = ()=>{
        let isValid=true;
        if(name==''){
            isValid=false
        }
        if(email==''){
            isValid=false
        }
        if(mobile==''){
            isValid=false
        }
        if(password==''){
            isValid=false
        }
        if(confirmPassword==''){
            isValid=false
        }
        if(confirmPassword!==password){
            isValid=false
        }

      return isValid;

    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SignUp</Text>
            <TextInput placeholder="Name" style={[styles.input, { marginTop: 50 }]}
                value={name} onChangeText={setName} />
            <TextInput placeholder="Enter Email" style={[styles.input, { marginTop: 20 }]}
                value={email} onChangeText={setEmail} />
            <TextInput keyboardType="number-pad" placeholder="Enter Mobile No."
                style={[styles.input, { marginTop: 20 }]} value={mobile} onChangeText={setMobile} />
            <TextInput placeholder="Enter Password" style={[styles.input, { marginTop: 20 }]}
                value={password} onChangeText={setPassword} secureTextEntry />
            <TextInput placeholder="Confirm Password" style={[styles.input, { marginTop: 20 }]}
                value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
            <TouchableOpacity style={styles.btn}  onPress={()=>{
                if(validate()){
                    registerUser();
                }
                else{
                    Alert.alert("Please Enter the above details")
                }
            } }>
                <Text style={styles.btnText}>Sign Up</Text>
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