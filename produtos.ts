import {
  addDoc, collection, deleteDoc, doc, getDocs, onSnapshot,
  orderBy, query, serverTimestamp, updateDoc, where, writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";
import { ProdutoItem } from "./interfaces/ProdutoItem";

export type Produto = ProdutoItem;

const produtosRef = collection(db, "produtos");
const produtosOrdenados = query(produtosRef, orderBy("criadoEm", "asc"));

export async function criarProduto(nome: string) {
  const ref = await addDoc(produtosRef, {
    nome: nome,
    comprado: false,
    criadoEm: serverTimestamp(),
  });
  return ref.id;
}

export async function listarProdutos() {
  const snapshot = await getDocs(produtosOrdenados);
  return snapshot.docs.map((d) => ({
    id: d.id,
    nome: d.data().nome,
    comprado: d.data().comprado,
  })) as Produto[];
}

export async function atualizarProduto(id: string, nome: string, comprado: boolean) {
  await updateDoc(doc(db, "produtos", id), { nome, comprado });
}

export async function removerProduto(id: string) {
  await deleteDoc(doc(db, "produtos", id));
}

export async function removerPorStatus(comprado: boolean) {
  const snapshot = await getDocs(query(produtosRef, where("comprado", "==", comprado)));
  const lote = writeBatch(db);
  snapshot.docs.forEach((d) => lote.delete(d.ref));
  await lote.commit();
}

export function observarProdutos(callback: (produtos: Produto[]) => void) {
  return onSnapshot(
    produtosOrdenados,
    (snapshot) => {
      const lista = snapshot.docs.map((d) => ({
        id: d.id,
        nome: d.data().nome,
        comprado: d.data().comprado,
      })) as Produto[];
      callback(lista);
    },
    (erro) => console.log("Erro ao observar produtos", erro)
  );
}