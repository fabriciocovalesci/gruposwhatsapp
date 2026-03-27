import {
  collection, getDocs, addDoc, updateDoc, getDoc,
  doc, query, where, serverTimestamp, orderBy, limit, startAfter
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

export async function getGrupoById(id: string): Promise<Grupo | null> {
  const ref = doc(db, 'grupos', id);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return { id: snap.id, ...snap.data() } as Grupo;
  }
  return null;
}

export async function atualizarStatus(id: string, status: 'aprovado' | 'rejeitado') {
  await updateDoc(doc(db, 'grupos', id), { status });
}

export async function alternarDestaque(id: string, atualDestaque: boolean) {
  await updateDoc(doc(db, 'grupos', id), { destaque: !atualDestaque });
}

export async function enviarGrupo(dados: Omit<Grupo, "id" | "status">) {
  const docRef = await addDoc(collection(db, "grupos"), {
    ...dados,
    status: "pendente",
    destaque: false,
    criadoEm: serverTimestamp(),
  });

  // Salva no Marketing/Newsletter se tiver e-mail
  if (dados.email) {
    try {
      await addDoc(collection(db, "leads"), {
        email: dados.email,
        origem: "enviar-grupo",
        data: serverTimestamp()
      });
    } catch (e) {
      console.error("Erro ao salvar lead:", e);
    }
  }

  return docRef.id;
}
export async function getGruposByIds(ids: string[]): Promise<Grupo[]> {
  if (!ids || ids.length === 0) return [];
  const promises = ids.map((id) => getGrupoById(id));
  const results = await Promise.all(promises);
  return results.filter((g) => g !== null) as Grupo[];
}
export async function editarGrupo(id: string, dados: any, statusAtual?: string) {
  const status = statusAtual === "aprovado" ? "aprovado" : "pendente";
  await updateDoc(doc(db, "grupos", id), {
    ...dados,
    status: status,
  });

  // Atualiza/Sincroniza no Marketing se tiver e-mail
  if (dados.email) {
    try {
      await addDoc(collection(db, "leads"), {
        email: dados.email,
        origem: "editar-grupo",
        data: serverTimestamp()
      });
    } catch (e) {
      console.error("Erro ao salvar lead na edição:", e);
    }
  }
}
export async function getGruposDestaque(limitNum = 10): Promise<Grupo[]> {
  const q = query(
    collection(db, 'grupos'),
    where('status', '==', 'aprovado'),
    where('destaque', '==', true),
    orderBy('criadoEm', 'desc'),
    limit(limitNum)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Grupo));
}

export async function getGruposPaginados(limitNum = 10, lastId?: string): Promise<{ grupos: Grupo[], lastId?: string }> {
  let q = query(
    collection(db, 'grupos'),
    where('status', '==', 'aprovado'),
    orderBy('criadoEm', 'desc'),
    limit(limitNum)
  );

  if (lastId) {
    const lastDoc = await getDoc(doc(db, 'grupos', lastId));
    if (lastDoc.exists()) {
      q = query(
        collection(db, 'grupos'),
        where('status', '==', 'aprovado'),
        orderBy('criadoEm', 'desc'),
        startAfter(lastDoc),
        limit(limitNum)
      );
    }
  }

  const snap = await getDocs(q);
  const grupos = snap.docs.map(d => ({ id: d.id, ...d.data() } as Grupo));
  const newLastId = snap.docs.length > 0 ? snap.docs[snap.docs.length - 1].id : undefined;

  return { grupos, lastId: newLastId };
}
