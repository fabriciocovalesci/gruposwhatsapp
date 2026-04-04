import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export type OrigemPesquisaGrupo = "categorias";

export interface RegistrarPesquisaGrupoInput {
  termoBruto: string;
  termoNormalizado: string;
  resultados: number;
  origem: OrigemPesquisaGrupo;
}

/**
 * Registra o termo pesquisado (ex.: /categorias?search=).
 * `criadoEm` guarda data e hora no Firestore (UTC); o admin exibe em horário de Brasília.
 */
export async function registrarPesquisaGrupo(
  input: RegistrarPesquisaGrupoInput
): Promise<void> {
  const termo = input.termoBruto.trim().slice(0, 200);
  if (!termo) return;

  await addDoc(collection(db, "pesquisas_grupos"), {
    termo,
    termoNormalizado: input.termoNormalizado.slice(0, 200),
    resultados: input.resultados,
    origem: input.origem,
    criadoEm: serverTimestamp(),
  });
}
