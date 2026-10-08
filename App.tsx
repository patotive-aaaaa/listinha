import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import { colors } from "./components/colors";
import { useState, useEffect } from "react";
import ListaItens from "./components/ListaItens/ListaItens";
import {
  Produto, criarProduto, atualizarProduto,
  removerProduto, removerPorStatus, observarProdutos,
} from "./produtos";

export default function App() {
  const [lista, setLista] = useState<Produto[]>([]);

  useEffect(() => {
    const pararDeObservar = observarProdutos(setLista);
    return pararDeObservar;
  }, []);

  async function adicionarProduto(nome: string) {
    const nomeLimpo = nome.trim();
    if (nomeLimpo === "") return;
    try {
      await criarProduto(nomeLimpo);
    } catch (error) {
      console.log("Erro ao criar produto", error);
    }
  }

  async function remover(id: string) {
    try {
      await removerProduto(id);
    } catch (error) {
      console.log("Erro ao remover produto", error);
    }
  }

  async function alternarComprado(id: string) {
    const produto = lista.find((item) => item.id === id);
    if (!produto) return;
    try {
      await atualizarProduto(id, produto.nome, !produto.comprado);
    } catch (error) {
      console.log("Erro ao atualizar produto", error);
    }
  }

  async function limparItens(comprados: boolean) {
    try {
      await removerPorStatus(comprados);
    } catch (error) {
      console.log("Erro ao limpar itens", error);
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Header />
        <Form onAdicionar={adicionarProduto} />
        <ListaItens
          produtos={lista}
          remover={remover}
          alternarComprado={alternarComprado}
          limparItens={limparItens}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});