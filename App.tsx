import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import { colors } from "./components/colors";
import { useState, useEffect } from "react";
import { ProdutoItem } from "./interfaces/ProdutoItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListaItens, { DATA } from "./components/ListaItens/ListaItens";

const CHAVE_STORAGE = "@minha_lista_compras";

export default function App() {
  const [lista, setLista] = useState<ProdutoItem[]>([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        const json = await AsyncStorage.getItem(CHAVE_STORAGE);
        setLista(json !== null ? JSON.parse(json) : DATA);        
      } catch (error) {
        console.log("Erro ao carregar produtos", error);
      } finally {
        setCarregado(true);
      }
    }
    carregar();
  }, []);

  useEffect(() => {
    if (!carregado) return; 

    async function salvar(novaLista: ProdutoItem[]) {
      try {
        await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(novaLista));
      } catch (error) {
        console.log("Erro ao salvar produtos", error);
      }
    }
    salvar(lista);
  }, [lista, carregado]);

  function adicionarProduto(nome: string) {
    const nomeLimpo = nome.trim();
    if (nomeLimpo === "") return;

    const novoProduto: ProdutoItem = {
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      nome: nomeLimpo,
      comprado: false,
    };
    setLista((atual) => [...atual, novoProduto]);
  }

  function removerProduto(id: string) {
    setLista((atual) => atual.filter((item) => item.id !== id));
  }

  function alternarComprado(id: string) {
    setLista((atual) =>
      atual.map((item) =>
        item.id === id ? { ...item, comprado: !item.comprado } : item
      )
    );
  }

  function limparItens(comprados: boolean) {
    setLista((atual) => atual.filter((item) => item.comprado !== comprados));
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Header />
        <Form onAdicionar={adicionarProduto} />
        <ListaItens
          produtos={lista}
          remover={removerProduto}
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