// Dados estáticos — sem Firebase, seguros para usar no frontmatter Astro

export interface Categoria {
  slug: string;
  label: string;
}

export const categoriasPorGrupo = [
  {
    grupo: 'Tecnologia & Trabalho',
    items: [
      { slug: 'tecnologia', label: 'Tecnologia' },
      { slug: 'programacao', label: 'Programação' },
      { slug: 'design', label: 'Design' },
      { slug: 'marketing', label: 'Marketing Digital' },
      { slug: 'vagas', label: 'Vagas de Empregos' },
      { slug: 'freelancer', label: 'Freelancer' },
      { slug: 'profissoes', label: 'Profissões' },
      { slug: 'ganhar-dinheiro', label: 'Ganhar Dinheiro' },
    ],
  },
  {
    grupo: 'Finanças & Negócios',
    items: [
      { slug: 'financas', label: 'Finanças' },
      { slug: 'investimentos', label: 'Investimentos e Finanças' },
      { slug: 'cripto', label: 'Criptomoedas' },
      { slug: 'empreendedorismo', label: 'Negócios & Empreendedorismo' },
      { slug: 'renda-extra', label: 'Renda Extra' },
    ],
  },
  {
    grupo: 'Educação & Idiomas',
    items: [
      { slug: 'educacao', label: 'Educação' },
      { slug: 'concursos', label: 'Concursos' },
      { slug: 'idiomas', label: 'Idiomas' },
      { slug: 'enem', label: 'ENEM' },
      { slug: 'cursos', label: 'Cursos Gratuitos' },
    ],
  },
  {
    grupo: 'Saúde & Bem-estar',
    items: [
      { slug: 'saude', label: 'Saúde' },
      { slug: 'fitness', label: 'Fitness' },
      { slug: 'emagrecimento', label: 'Emagrecimento e Perda de Peso' },
      { slug: 'nutricao', label: 'Nutrição' },
      { slug: 'meditacao', label: 'Meditação' },
    ],
  },
  {
    grupo: 'Entretenimento',
    items: [
      { slug: 'games', label: 'Games e Jogos' },
      { slug: 'series', label: 'Filmes e Séries' },
      { slug: 'musica', label: 'Música' },
      { slug: 'humor', label: 'Memes, Engraçados e Zoeira' },
      { slug: 'esportes', label: 'Esportes' },
      { slug: 'futebol', label: 'Futebol' },
      { slug: 'animes', label: 'Desenhos e Animes' },
      { slug: 'tv', label: 'TV' },
      { slug: 'videos', label: 'Vídeos' },
      { slug: 'fas', label: 'Fãs' },
      { slug: 'figurinhas', label: 'Figurinhas e Stickers' },
      { slug: 'shitpost', label: 'Shitpost' },
    ],
  },
  {
    grupo: 'Compras & Ofertas',
    items: [
      { slug: 'ofertas', label: 'Ofertas' },
      { slug: 'compra-e-venda', label: 'Compra e Venda' },
      { slug: 'achadinhos', label: 'Achadinhos' },
      { slug: 'vendas-online', label: 'Vendas Online' },
      { slug: 'cashback', label: 'Cashback' },
      { slug: 'importados', label: 'Importados' },
      { slug: 'imobiliaria', label: 'Imobiliária' },
      { slug: 'carros', label: 'Carros e Motos' },
    ],
  },
  {
    grupo: 'Estilo de Vida',
    items: [
      { slug: 'viagens', label: 'Viagem e Turismo' },
      { slug: 'cidades', label: 'Cidades' },
      { slug: 'culinaria', label: 'Culinária' },
      { slug: 'receitas', label: 'Receitas' },
      { slug: 'pets', label: 'Pets' },
      { slug: 'moda', label: 'Moda e Beleza' },
      { slug: 'politica', label: 'Política' },
      { slug: 'religiao', label: 'Religião' },
      { slug: 'amizade', label: 'Amizade' },
      { slug: 'amor-e-romance', label: 'Amor e Romance' },
      { slug: 'namoro', label: 'Namoro' },
      { slug: 'eventos', label: 'Eventos' },
      { slug: 'noticias', label: 'Notícias' },
      { slug: 'frases', label: 'Frases e Mensagens' },
    ],
  },
  {
    grupo: 'Geral',
    items: [
      { slug: 'redes-sociais', label: 'Redes Sociais' },
      { slug: 'links', label: 'Links' },
      { slug: 'divulgacao', label: 'Divulgação' },
      { slug: 'outros', label: 'Outros' },
    ],
  },
];

export const todasCategorias: Categoria[] = categoriasPorGrupo.flatMap(g => g.items);

export function getLabelCategoria(slug: string): string {
  return todasCategorias.find(c => c.slug === slug)?.label ?? slug;
}
