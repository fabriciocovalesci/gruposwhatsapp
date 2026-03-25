import {
  collection, getDocs, addDoc, updateDoc,
  doc, query, where, orderBy, serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

// Re-exporta dados estáticos para conveniência
export type { Categoria } from './categorias';
export { categoriasPorGrupo, todasCategorias, getLabelCategoria } from './categorias';

export interface Grupo {
  id?: string;
  nome: string;
  descricao: string;
  categoria: string;
  tipo: 'grupo' | 'canal';
  link: string;
  membros?: number;
  destaque?: boolean;
  foto?: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  email?: string;
  tags?: string[];
}

export async function getGruposAprovados(): Promise<Grupo[]> {
  const q = query(
    collection(db, 'grupos'),
    where('status', '==', 'aprovado'),
    orderBy('criadoEm', 'desc'),
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Grupo));
}

export async function getGruposPorStatus(status: string): Promise<Grupo[]> {
  const q = query(
    collection(db, 'grupos'),
    where('status', '==', status),
    orderBy('criadoEm', 'desc'),
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Grupo));
}

export async function atualizarStatus(id: string, status: 'aprovado' | 'rejeitado') {
  await updateDoc(doc(db, 'grupos', id), { status });
}

export async function enviarGrupo(dados: Omit<Grupo, 'id' | 'status'>) {
  await addDoc(collection(db, 'grupos'), {
    ...dados,
    status: 'pendente',
    criadoEm: serverTimestamp(),
  });
}
