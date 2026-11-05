import { describe, it, expect } from 'vitest';
import { COLLECTIONS, NAV } from './nav';
import { slugify, slugifyCategory } from './catalog';
import { navWithCatalog, buildNav, type ProductEntry } from './products';

const entry = (id: string, data: object): ProductEntry =>
  ({ id, collection: 'products', data }) as unknown as ProductEntry;

const entries = [
  entry('dog-seco', {
    name: 'Agility Adulto',
    brand: 'Agility',
    species: 'perro',
    category: 'Alimentos Secos',
    price: 10000,
    tags: [],
  }),
  entry('cat-snack', {
    name: 'Excellent Gato',
    brand: 'Excellent',
    species: 'gato',
    category: 'Snacks',
    price: 5000,
    tags: [],
  }),
  entry('ambos-cama', {
    name: 'Cama Grande',
    brand: 'Patitas',
    species: 'ambos',
    category: 'Camas',
    price: 8000,
    tags: [],
  }),
];

describe('COLLECTIONS', () => {
  it('expone las tres colecciones esperadas con href coherente', () => {
    expect(COLLECTIONS.map((c) => c.slug)).toEqual(['novedades', 'mas-vendidos', 'liquidacion']);
    for (const collection of COLLECTIONS) {
      expect(collection.href).toBe(`/collections/${collection.slug}`);
    }
  });
});

describe('NAV', () => {
  it('marca los items de especie para poder completarlos con el catálogo', () => {
    const perros = NAV.find((item) => item.href === '/perros');
    const gatos = NAV.find((item) => item.href === '/gatos');
    expect(perros?.species).toBe('perro');
    expect(gatos?.species).toBe('gato');
  });

  it('no lleva categorías escritas a mano (se arman con el catálogo)', () => {
    for (const item of NAV) {
      expect(item.children).toBeUndefined();
    }
  });
});

describe('navWithCatalog', () => {
  const nav = navWithCatalog(entries, NAV);

  it('los sub-links de cada especie usan las categorías de esa especie', () => {
    const perros = nav.find((item) => item.species === 'perro');
    const gatos = nav.find((item) => item.species === 'gato');

    expect(perros?.children).toEqual([
      { label: 'Alimentos Secos', href: '/productos/?especie=perro&cat=alimentos-secos' },
      { label: 'Camas', href: '/productos/?especie=perro&cat=camas' },
    ]);
    expect(gatos?.children).toEqual([
      { label: 'Camas', href: '/productos/?especie=gato&cat=camas' },
      { label: 'Snacks', href: '/productos/?especie=gato&cat=snacks' },
    ]);
  });

  it('el slug de cada sub-link es el canónico de la categoría', () => {
    for (const item of nav) {
      for (const child of item.children ?? []) {
        const params = new URLSearchParams(child.href.split('?')[1]);
        const cat = params.get('cat');
        expect(cat).toBeTruthy();
        expect(slugifyCategory(cat as string)).toBe(cat);
      }
    }
  });

  it('una categoría nueva del panel aparece sola en el menú', () => {
    const conHigiene = [
      ...entries,
      entry('perro-higiene', {
        name: 'Shampoo',
        brand: 'Clean',
        species: 'perro',
        category: 'Higiene',
        price: 3000,
        tags: [],
      }),
    ];

    const perros = navWithCatalog(conHigiene, NAV).find((item) => item.species === 'perro');
    expect(perros?.children?.map((c) => c.label)).toContain('Higiene');
  });

  it('si una especie no tiene categorías, el item queda sin desplegable', () => {
    const soloGatos = [
      entry('cat-seco', {
        name: 'Excellent Gato',
        brand: 'Excellent',
        species: 'gato',
        category: 'Alimentos Secos',
        price: 5000,
        tags: [],
      }),
    ];

    const perros = navWithCatalog(soloGatos, NAV).find((item) => item.species === 'perro');
    expect(perros?.children).toBeUndefined();
  });
});

describe('buildNav', () => {
  it('oculta las colecciones vacías', () => {
    const sinOfertas = [
      entry('dog-seco', {
        name: 'Agility Adulto',
        brand: 'Agility',
        species: 'perro',
        category: 'Alimentos Secos',
        price: 10000,
        tags: [],
      }),
    ];

    const labels = buildNav(sinOfertas).map((item) => item.label);
    expect(labels).toContain('Perros');
    expect(labels).not.toContain('Liquidación');
  });
});

describe('slugify', () => {
  it('deja los slugs en minúsculas y sin acentos', () => {
    expect(slugify('Alimentos Húmedos')).toBe('alimentos-humedos');
    expect(slugify('Pro Quality')).toBe('pro-quality');
  });
});
