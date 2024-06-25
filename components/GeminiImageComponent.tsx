import React, {useState} from "react";
import {View, Image, Text, TextInput, Button, StyleSheet} from "react-native";
import {launchImageLibrary} from "react-native-image-picker";
import GeminiService from "../GeminiService";

const GeminiImageComponent = () => {
  const [input, setInput] = useState(
    "Me descreve essa imagem usando no maximo 10 palavras.",
  );
  const [response, setResponse] = useState("Aguardando envio de imagem...");
  const [imageUri, setImageUri] = useState<string | null>(null);

  const selectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      includeBase64: true,
    });

    if (result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri || null);
    }
  };

  const handleSend = async () => {
    setResponse("Aguardando resposta...");
    if (!imageUri || !input) {
      setResponse("Selecione uma imagem e escreva um prompt.");
      return;
    }

    try {
      const base64Image = imageUri.split(",")[1];
      const result = await GeminiService.getImageResponse(input, base64Image);
      setResponse(result.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error(error);
      setResponse("Error occurred while fetching response.");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Choose Image" onPress={selectImage} />
      {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
      <TextInput
        style={styles.input}
        placeholder="Image prompt..."
        value={input}
        onChangeText={setInput}
      />
      <Button
        title="Print URI"
        onPress={() => console.log(imageUri.split(",")[1])}
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
  image: {
    width: 200,
    height: 200,
    marginBottom: 12,
  },
  response: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default GeminiImageComponent;
