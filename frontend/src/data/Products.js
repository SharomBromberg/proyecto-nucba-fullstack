export const products = [
  {
    id: 1,
    title: "PlayStation 5",
    img: "/assets/product-pictures/ps5.png",
    desc: "Consola de última generación con gráficos en 4K.",
    price: 500,
    category: "Consolas",
  },
  {
    id: 2,
    title: "Xbox Series X",
    img: "/assets/product-pictures/xbox.png",
    desc: "La consola más potente de Microsoft.",
    price: 500,
    category: "Consolas",
  },
  {
    id: 3,
    title: "Nintendo Switch",
    img: "/assets/product-pictures/switch.png",
    desc: "Híbrida, para jugar en casa y en movimiento.",
    price: 300,
    category: "Consolas",
  },
  {
    id: 4,
    title: "Auriculares Gamer RGB",
    img: "/assets/product-pictures/headph.png",
    desc: "Auriculares con micrófono y luces RGB.",
    price: 80,
    category: "Accesorios",
  },
  {
    id: 5,
    title: "Control de Xbox Inalámbrico",
    img: "/assets/product-pictures/control.png",
    desc: "Control original para Xbox Series y PC.",
    price: 60,
    category: "Accesorios",
  },
  {
    id: 6,
    title: "Control DualSense",
    img: "/assets/product-pictures/dualsense.png",
    desc: "Control con retroalimentación háptica y gatillos adaptativos.",
    price: 70,
    category: "Accesorios",
  },
  {
    id: 7,
    title: "FIFA 23",
    img: "/assets/product-pictures/fifa23.png",
    desc: "Juego de fútbol con gráficos mejorados y modos online.",
    price: 50,
    category: "juegos",
  },
  {
    id: 8,
    title: "Call of Duty: Modern Warfare II",
    img: "/assets/product-pictures/modernwarfare.png",
    desc: "Juego de disparos en primera persona con campañas y multijugador.",
    price: 60,
    category: "juegos",
  },
  {
    id: 9,
    title: "Playera de Mario",
    img: "/assets/product-pictures/shirt.png",
    desc: "Playera oficial con diseño de Mario Bros.",
    price: 20,
    category: "Merchandising",
  },
  {
    id: 10,
    title: "Figura de acción de Master Chief",
    img: "/assets/product-pictures/actfig.png",
    desc: "Figura coleccionable de Halo.",
    price: 30,
    category: "Merchandising",
  },
  {
    id: 11,
    title: "Bundle PS5 + FIFA 23",
    img: "/assets/product-pictures/bps5fifa.png",
    desc: "Incluye consola PS5 y el juego FIFA 23.",
    price: 530,
    category: "Bundles",
  },
  {
    id: 12,
    title: "Bundle Xbox Series X + Game Pass",
    img: "/assets/product-pictures/bxboxgpass.png",
    desc: "Incluye consola y suscripción de 3 meses a Game Pass.",
    price: 520,
    category: "Bundles",
  },
];

export const TotalProducts = products.length;

export const Products = products.reduce((acc, product) => {
  if (!acc[product.category]) {
    acc[product.category] = [];
  }

  acc[product.category] = [...acc[product.category], product];

  return acc;
}, {});


// Otra forma
// const categories = [...new Set(products.map(product => product.category))]

// const Products = categories.reduce((acc, category) => {
//   acc[category] = products.filter(product => product.category === category)

//   return acc
// }, {})