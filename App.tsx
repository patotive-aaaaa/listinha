import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import ListaItens from "./components/ListaItens/ListaItens";
import { colors } from "./components/colors";
import { useState } from "react";
import { ProdutoItem } from "./interfaces/ProdutoItem";

export default function App() {

  const [lista, setLista] = useState<ProdutoItem[]>([]);
const [produto, setProduto] = useState("");

function adicionar(){
  if (produto.trim() === ''){
    return;
  }
    const novoProduto: ProdutoItem = {
      id: crypto.randomUUID(),
      nome: produto,
      comprado: false,
    };
    const novaLista = [...lista, novoProduto];
    setLista(novaLista);
    setProduto('');
  }

  function remover(id: string) {
    const novaLista = lista.filter((item) => item.id !== id);
    setLista(novaLista);
  }

  function alternarComprado(id: string) {
    const novaLista = lista.map((item) => {
      if (item.id === id) {
        return { ...item, comprado: !item.comprado };
      }
      return item;
    });
    setLista(novaLista);
  }''

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Header />
        <Form adicionarProduto={adicionar} produto={produto} setProduto={setProduto} />
        <ListaItens produtos={lista} />
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
