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
  ScrollView 
} from 'react-native';
import axios from 'axios';
import echo from '../echo';

const API_URL = "http://192.168.2.7:8000/api"; // Use your correct Laravel API IP

const Chat = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const userId = route.params?.userId || '123'; // Replace with actual user ID

  useEffect(() => {
    // Fetch previous messages
    axios.get(`${API_URL}/messages`, {
      headers: { Authorization: `Bearer YOUR_AUTH_TOKEN` }
    }).then(response => {
      setMessages(response.data);
    });

    // Listen for new messages
    echo.channel('chat-channel').listen('.message-sent', (data) => {
      setMessages(prevMessages => [data.message, ...prevMessages]);
    });

    return () => {
      echo.leaveChannel('chat-channel');
    };
  }, []);

  const sendMessage = async () => {
    if (inputText.trim().length === 0) return;

    await axios.post(`${API_URL}/send-message`, {
      message: inputText,
    }, {
      headers: { Authorization: `Bearer YOUR_AUTH_TOKEN` }
    });

    setInputText('');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 80} // Adjust for keyboard height
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            inverted
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }} // Ensure messages do not overlap input
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
              onFocus={() => console.log("Input Focused")}
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
