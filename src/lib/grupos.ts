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
  regras?: string[];
  criadoEm?: any;
}

export async function getGruposAprovados(): Promise<Grupo[]> {
  const q = query(
    collection(db, 'grupos'),
    where('status', '==', 'aprovado'),
  );
  const snap = await getDocs(q);
  return snap.docs
    .map(d => ({ id: d.id, ...d.data() } as Grupo))
    .sort((a: any, b: any) => {
      if (a.destaque && !b.destaque) return -1;
      if (!a.destaque && b.destaque) return 1;
      const timeA = a.criadoEm?.seconds || 0;
      const timeB = b.criadoEm?.seconds || 0;
      return timeB - timeA;
    });
}

export async function getGruposPorStatus(status: string): Promise<Grupo[]> {
  const q = query(
    collection(db, 'grupos'),
    where('status', '==', status),
  );
  const snap = await getDocs(q);
  return snap.docs
    .map(d => ({ id: d.id, ...d.data() } as Grupo))
    .sort((a: any, b: any) => {
      if (a.destaque && !b.destaque) return -1;
      if (!a.destaque && b.destaque) return 1;
      const timeA = a.criadoEm?.seconds || 0;
      const timeB = b.criadoEm?.seconds || 0;
      return timeB - timeA;
    });
}

export async function atualizarStatus(id: string, status: 'aprovado' | 'rejeitado') {
  await updateDoc(doc(db, 'grupos', id), { status });
}

export async function alternarDestaque(id: string, atualDestaque: boolean) {
  await updateDoc(doc(db, 'grupos', id), { destaque: !atualDestaque });
}

export async function enviarGrupo(dados: Omit<Grupo, 'id' | 'status'>) {
  await addDoc(collection(db, 'grupos'), {
    ...dados,
    status: 'pendente',
    criadoEm: serverTimestamp(),
  });
}
