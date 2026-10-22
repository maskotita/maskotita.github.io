import type { CollectionSlug } from './catalog';

export interface NavLink {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface CollectionDef {
  slug: CollectionSlug;
  title: string;
  text: string;
  teaser: string;
  href: string;
  image: string;
}

export const COLLECTIONS: CollectionDef[] = [
  {
    slug: 'novedades',
    title: 'Novedades',
    text: 'Lo último que llegó al depósito de Guaymallén.',
    teaser: 'Lo último que llegó al depósito',
    href: '/collections/novedades',
    image: '/images/categories/gatos.svg',
  },
  {
    slug: 'mas-vendidos',
    title: 'Más vendidos',
    text: 'Los productos que todos nos piden.',
    teaser: 'Los que todos nos piden',
    href: '/collections/mas-vendidos',
    image: '/images/categories/perros.svg',
  },
  {
    slug: 'liquidacion',
    title: 'Liquidación',
    text: 'Ofertas con descuento que no vuelven. Hasta agotar stock.',
    teaser: 'Ofertas que no vuelven',
    href: '/collections/liquidacion',
    image: '/images/hero/hero-1.svg',
  },
];

export const NAV: NavItem[] = [
  { label: 'Inicio', href: '/' },
  {
    label: 'Perros',
    href: '/perros',
    children: [
      { label: 'Alimentos Secos', href: '/productos/?especie=perro&cat=alimentos-secos' },
    ],
  },
  {
    label: 'Gatos',
    href: '/gatos',
    children: [
      { label: 'Alimentos Secos', href: '/productos/?especie=gato&cat=alimentos-secos' },
    ],
  },
  { label: 'Marcas', href: '/marcas' },
  { label: 'Liquidación', href: '/collections/liquidacion' },
];

export interface Brand {
  name: string;
  slug: string;
}

export const BRANDS: Brand[] = [
  { name: 'Agility', slug: 'agility' },
  { name: 'Balanced', slug: 'balanced' },
  { name: 'Estampa', slug: 'estampa' },
  { name: 'Gran Pastor', slug: 'gran-pastor' },
  { name: 'Gran Persa', slug: 'gran-persa' },
  { name: 'Ken-L', slug: 'ken-l' },
  { name: 'Pro Quality', slug: 'pro-quality' },
  { name: 'Rey Can', slug: 'rey-can' },
  { name: 'Rey Cat', slug: 'rey-cat' },
  { name: 'Sabrositos', slug: 'sabrositos' },
];

export interface Category {
  name: string;
  slug: string;
}

export const CATEGORIES: Category[] = [
  { name: 'Alimentos Secos', slug: 'alimentos-secos' },
  { name: 'Alimentos Húmedos', slug: 'alimentos-humedos' },
  { name: 'Camas', slug: 'camas' },
  { name: 'Higiene', slug: 'higiene' },
  { name: 'Snacks', slug: 'snacks' },
  { name: 'Piedras Sanitarias', slug: 'piedras-sanitarias' },
  { name: 'Rascadores', slug: 'rascadores' },
];
