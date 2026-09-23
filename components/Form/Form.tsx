import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { styles } from "./styles";
import { Check } from "lucide-react";
import { colors } from "../colors";

interface FormProps {
  onAdicionar: (nome: string) => void;
}

export default function Form({ onAdicionar }: FormProps) {
  const [texto, setTexto] = useState("");

  function handleAdicionar() {
    if (texto.trim() === "") return;
    onAdicionar(texto);
    setTexto(""); // limpa o campo
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={texto}
        onChangeText={setTexto}
        placeholder="O que você quer comprar?"
      />

      <TouchableOpacity style={styles.button} onPress={handleAdicionar}>
        <Check color={colors.surface} size={16} />
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}