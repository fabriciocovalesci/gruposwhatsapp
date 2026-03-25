import type { MainMenuItem, MenuNavigation } from "~/types";

export const menuMain: MainMenuItem[] = [
	{
		id: "home",
		label: "Início",
		url: "/",
	},
	{
		id: "categorias",
		label: "Categorias",
		url: "/categorias",
	},
	{
		id: "enviar-grupo",
		label: "Enviar Grupo",
		url: "/enviar-grupo",
	},
];

export const menuNavigation: MenuNavigation = {
	prettyName: "Navegação",
	items: [
		{
			name: "Início",
			url: "/",
		},
		{
			name: "Categorias",
			url: "/categorias",
		},
		{
			name: "Enviar Grupo",
			url: "/enviar-grupo",
		},
	],
};

export const menuService: MenuNavigation = {
	prettyName: "Utilidades",
	items: [
		{
			name: "Como criar grupo",
			url: "/#como-criar",
		},
		{
			name: "Como entrar",
			url: "/#como-entrar",
		},
		{
			name: "Como sair",
			url: "/#como-sair",
		},
	],
};

export const menuMisc: MenuNavigation = {
	prettyName: "Mais",
	items: [
		{
			name: "Contato",
			url: "/contact",
		},
	],
};

export const menuLegal: MenuNavigation = {
	prettyName: "Legal",
	items: [
		{
			name: "Termos de Uso",
			url: "/termos",
		},
		{
			name: "Política de Privacidade",
			url: "/privacidade",
		},
	],
};
