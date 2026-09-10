import { Text, TextInput, TouchableOpacity, View} from "react-native";
import React, { useState, useEffect } from 'react';
import { styles } from "./styles";
import { Check } from "lucide-react";
import { colors } from "../colors";
import { ProdutoItem } from "../../interfaces/ProdutoItem";


interface FormProps {
  adicionarProduto: () => void;
  produto: string;
  setProduto: (produto: string) => void;
}

export default function Form({ adicionarProduto, produto, setProduto }: FormProps) {


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={produto}
        onChangeText={(texto) => setProduto(texto)}
        placeholder="O que você quer comprar?"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {adicionarProduto()}}
        // TODO(aluno): ao tocar, adicionar um novo produto à lista (ex.: chamando uma função recebida via props que atualiza o estado da lista em ListaItens/App).
      >
        <Check color={colors.surface} size={16} />
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );

}