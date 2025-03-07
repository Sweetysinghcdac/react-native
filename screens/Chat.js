import React, { useEffect, useState } from 'react';
import { 
  View, 
  TextInput, 
  FlatList, 
  Text, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  StyleSheet, 
  Platform, 
  Keyboard, 
  TouchableWithoutFeedback, 
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import echo from '../echo';

const API_MESSAGES = "http://192.168.2.7:8000/api/messages"; // Fetch Messages API
const API_SEND_MESSAGE = "http://192.168.2.7:8000/api/send-message"; // Send Message API

const Chat = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const userId = route.params?.userId || '123'; // Replace with actual user ID

  useEffect(() => {
    fetchMessages(); // Fetch messages when the component loads

    // Listen for new messages via Laravel Reverb WebSockets
    echo.channel('chat-channel').listen('.message-sent', (data) => {
      setMessages(prevMessages => [...prevMessages, data.message]);
    });

    return () => {
      echo.leaveChannel('chat-channel');
    };
  }, []);

  // ✅ Fetch Previous Messages from Laravel API
  const fetchMessages = async () => {
    try {
      const token = await AsyncStorage.getItem("AUTH_TOKEN");

      if (!token) {
        console.error("No authentication token found.");
        Alert.alert("Authentication Error", "Please log in again.");
        return;
      }

      const response = await axios.get(API_MESSAGES, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        setMessages(response.data.messages);
      } else {
        console.error("Failed to fetch messages:", response.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      if (error.response && error.response.status === 401) {
        Alert.alert("Session Expired", "Please log in again.");
        await AsyncStorage.clear();
        navigation.replace("Login");
      }
    }
  };

  // ✅ Send a New Message
  const sendMessage = async () => {
    if (!inputText.trim()) return;

    try {
        const token = await AsyncStorage.getItem("AUTH_TOKEN");

        if (!token) {
            Alert.alert("Authentication Error", "Please log in again.");
            return;
        }

        const response = await axios.post("http://192.168.2.7:8000/api/send-message", {
            message: inputText
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json' // ✅ Ensure Laravel treats this as an API request
            }
        });

        if (response.status === 200) {
            setMessages(prevMessages => [...prevMessages, response.data.message]); // Append new message
            setInputText('');
        } else {
            Alert.alert("Error", "Message not sent.");
        }
    } catch (error) {
        console.error("Message sending failed:", error);

        let errorMessage = "Failed to send message. Please try again.";
        if (error.response) {
            errorMessage = error.response.data.message || errorMessage;
        }

        Alert.alert("Error", errorMessage);
    }
};


  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 80}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
        <FlatList
          data={messages}
          keyExtractor={(item) => String(item.id)}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
          renderItem={({ item }) => (
            <View style={[styles.message, item.user_id === userId ? styles.userMessage : styles.botMessage]}>
              <Text style={styles.messageText}>{item.message}</Text>
            </View>
          )}
        />

          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input} 
              placeholder="Type a message..." 
              value={inputText} 
              onChangeText={setInputText} 
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: { flex: 1 },
  message: { padding: 10, marginVertical: 5, marginHorizontal: 10, borderRadius: 8, maxWidth: '70%' },
  userMessage: { backgroundColor: '#007AFF', alignSelf: 'flex-end' },
  botMessage: { backgroundColor: '#E5E5EA', alignSelf: 'flex-start' },
  messageText: { color: 'white' },
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 10, 
    borderTopWidth: 1, 
    borderColor: '#ddd', 
    backgroundColor: 'white', 
    position: 'absolute', 
    bottom: 0, 
    width: '100%' 
  },
  input: { 
    flex: 1, 
    padding: 10, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 8, 
    marginRight: 10 
  },
  sendButton: { 
    backgroundColor: '#007AFF', 
    paddingVertical: 10, 
    paddingHorizontal: 15, 
    borderRadius: 8 
  },
  sendText: { 
    color: 'white', 
    fontWeight: 'bold' 
  },
});
