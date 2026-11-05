import type { CollectionSlug } from './catalog';

export interface NavLink {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  /**
   * Especie del item. Si está definido, sus sub-links se arman con las
   * categorías que el catálogo tiene para esa especie (ver navWithCatalog).
   */
  species?: 'perro' | 'gato';
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

/**
 * Menú principal.
 *
 * Los items de especie ("Perros", "Gatos") no traen sub-links-written: se
 * arman en runtime con las categorías que hay en el catálogo, así una
 * categoría nueva cargada desde el panel aparece sola en el menú.
 */
export const NAV: NavItem[] = [
  { label: 'Inicio', href: '/' },
  {
    label: 'Perros',
    href: '/perros',
    species: 'perro',
  },
  {
    label: 'Gatos',
    href: '/gatos',
    species: 'gato',
  },
  { label: 'Marcas', href: '/marcas' },
  { label: 'Liquidación', href: '/collections/liquidacion' },
];
