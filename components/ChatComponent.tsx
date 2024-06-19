import React, {useState} from "react";
import {View, Text, TextInput, Button, StyleSheet} from "react-native";
import OpenAIService from "../OpenAIService";

const ChatComponent = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    console.log("CC - Sending input:", input);
    setResponse("Aguardando resposta...");
    await OpenAIService.getResponse(input).then(result => {
      console.log("json result", JSON.stringify(result));
      setResponse(result);
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ask me anything..."
        value={input}
        onChangeText={setInput}
      />
      <Button title="Send" onPress={handleSend} />
      <Text style={styles.response}>{response}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  response: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default ChatComponent;
