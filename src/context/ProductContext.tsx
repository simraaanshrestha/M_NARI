import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  removeProduct: (id: number) => void;
  updateProduct: (id: number, product: Partial<Omit<Product, 'id'>>) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Éclat Solitaire',
    price: 'Rs 12,400',
    category: 'Rings',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    name: 'Nari Heritage Necklace',
    price: 'Rs 28,000',
    category: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    name: 'Aura',
    price: 'Rs 8,200',
    category: 'Earrings',
    image: 'https://www.caratdiamonds.com/cdn/shop/files/IMG_20251208_104557.jpg?v=1765791169'
  },
  {
    id: 4,
    name: 'Celestial Diamond Band',
    price: 'Rs 15,600',
    category: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 5,
    name: 'Royal Luxě',
    price: 'Rs 12,400',
    category: 'Earrings',
    image: 'https://www.caratdiamonds.com/cdn/shop/files/IMG_20251206_111610cc.jpg?v=1765194032'
  },
  {
    id: 6,
    name: 'Lumière  ',
    price: 'Rs 8,000',
    category: 'Rings',
    image: 'https://www.caratdiamonds.com/cdn/shop/files/05_0f15270c-91dd-46af-ad46-ff5fc66a966e.jpg?v=1749284563'
  },
  {
    id: 7,
    name: 'Eternity',
    price: 'Rs 15,600',
    category: 'Rings',
    image: 'https://www.caratdiamonds.com/cdn/shop/files/10cc_5cd9f41b-0ad6-474d-a45a-75b5d61abf4f.jpg?v=1749287857'
  },
  {
    id: 8,
    name: 'Fairyy',
    price: 'Rs 1500',
    category: 'Necklaces',
    image: 'https://i5.walmartimages.com/asr/28bf5b7a-8723-4207-af88-4094fe428402.a678335e1582f1f1680af938992da07a.jpeg'
  },
  {
    id: 9,
    name: "Swarovski",
    price: 'Rs 2000',
    category: 'necklaces',
    image: 'https://tanysjewellery.com/cdn/shop/files/4_11010653-80b8-4bdf-b231-cca4dba5cbbe_1200x1200.jpg?v=1737228421'
  },
  {
    id: 10,
    name: "Nari's B",
    price: 'Rs 1700',
    category: 'Bracelets',
    image: 'https://michaelgabriels.com/cdn/shop/files/14ct_round_tennis_bracelet_michaelgabriels.jpg?v=1772669345'
  },
  {
    id: 11,
    name: 'Emerald Snake',
    price: 'Rs 2,200',
    category: 'Rings',
    image: 'https://sensitivestones.com/cdn/shop/articles/coiled-snake-ring-gold-green-on-woman-closeup_022bd7ad-012a-4016-aab2-a58cad6cb6bf.webp?v=1777958862&width=360'
  },
  {
    id: 12,
    name: 'Lia',
    price: 'Rs 999',
    category: 'Earrings',
    image: 'https://michaelgabriels.com/cdn/shop/files/2ct_round_stud_earring_michaelgabriels.jpg?v=1771446484'
  },
  {
    id: 13,
    name: 'Arc',
    price: 'Rs 1,599',
    category: 'Neclaces',
    image: 'https://www.caratdiamonds.com/cdn/shop/files/12copycc_2a970b90-841a-4e6a-b4e4-85211705853c.jpg?v=1753699834'
  },
  {
    id: 14,
    name: 'Mavi',
    price: 'Rs 2,200',
    category: 'Earings',
    image: 'https://www.caratdiamonds.com/cdn/shop/files/4copycc_b866386d-bb4e-483b-a489-a7cec6fb842d.jpg?v=1753686051'
  },
  {
    id: 13,
    name: 'Pearl Charm',
    price: 'Rs 1,350',
    category: 'Neclaces',
    image: 'https://www.thejewelbox.in/cdn/shop/files/LuxuryRoundPearlCharmPendantGoldNecklace-TheJewelbox-1_3ead782f-b789-4c6f-8894-a2eabfccb426.png?v=1755710555'
  },

];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Date.now() };
    setProducts((prev) => [...prev, newProduct]);
  };

  const removeProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProduct = (id: number, updatedFields: Partial<Omit<Product, 'id'>>) => {
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, ...updatedFields } : p));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, removeProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
