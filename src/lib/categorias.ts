// Dados estáticos — sem Firebase, seguros para usar no frontmatter Astro

export interface Categoria {
  slug: string;
  label: string;
}

export const categoriasPorGrupo = [
  {
    grupo: 'Tecnologia & Trabalho',
    items: [
      { slug: 'tecnologia',       label: 'Tecnologia'        },
      { slug: 'programacao',      label: 'Programação'       },
      { slug: 'design',           label: 'Design'            },
      { slug: 'marketing',        label: 'Marketing Digital' },
      { slug: 'vagas',            label: 'Vagas de Emprego'  },
      { slug: 'freelancer',       label: 'Freelancer'        },
    ],
  },
  {
    grupo: 'Finanças & Negócios',
    items: [
      { slug: 'financas',         label: 'Finanças'          },
      { slug: 'investimentos',    label: 'Investimentos'     },
      { slug: 'cripto',           label: 'Criptomoedas'      },
      { slug: 'empreendedorismo', label: 'Empreendedorismo'  },
      { slug: 'renda-extra',      label: 'Renda Extra'       },
    ],
  },
  {
    grupo: 'Educação & Idiomas',
    items: [
      { slug: 'educacao',   label: 'Educação'         },
      { slug: 'concursos',  label: 'Concursos'        },
      { slug: 'idiomas',    label: 'Idiomas'          },
      { slug: 'enem',       label: 'ENEM'             },
      { slug: 'cursos',     label: 'Cursos Gratuitos' },
    ],
  },
  {
    grupo: 'Saúde & Bem-estar',
    items: [
      { slug: 'saude',     label: 'Saúde'     },
      { slug: 'fitness',   label: 'Fitness'   },
      { slug: 'nutricao',  label: 'Nutrição'  },
      { slug: 'meditacao', label: 'Meditação' },
    ],
  },
  {
    grupo: 'Entretenimento',
    items: [
      { slug: 'games',    label: 'Games'           },
      { slug: 'series',   label: 'Séries & Filmes' },
      { slug: 'musica',   label: 'Música'          },
      { slug: 'humor',    label: 'Humor'           },
      { slug: 'esportes', label: 'Esportes'        },
      { slug: 'animes',   label: 'Animes'          },
    ],
  },
  {
    grupo: 'Compras & Ofertas',
    items: [
      { slug: 'ofertas',    label: 'Ofertas'    },
      { slug: 'cashback',   label: 'Cashback'   },
      { slug: 'importados', label: 'Importados' },
    ],
  },
  {
    grupo: 'Estilo de Vida',
    items: [
      { slug: 'viagens',   label: 'Viagens'   },
      { slug: 'culinaria', label: 'Culinária' },
      { slug: 'pets',      label: 'Pets'      },
      { slug: 'moda',      label: 'Moda'      },
      { slug: 'politica',  label: 'Política'  },
      { slug: 'religiao',  label: 'Religião'  },
    ],
  },
];

export const todasCategorias: Categoria[] = categoriasPorGrupo.flatMap(g => g.items);

export function getLabelCategoria(slug: string): string {
  return todasCategorias.find(c => c.slug === slug)?.label ?? slug;
}
