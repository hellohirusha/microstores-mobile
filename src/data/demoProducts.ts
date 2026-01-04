export type DemoProduct = {
  id: number
  storeId: number
  name: string
  price: number
  stock: number
  image: any
}

export const DEMO_PRODUCTS: DemoProduct[] = [
  // Store 1 – Grocery
  {
    id: 1,
    storeId: 1,
    name: "Fresh Apples",
    price: 2.5,
    stock: 100,
    image: require("../assets/images/products/fresh_apple.jpg"),
  },
  {
    id: 2,
    storeId: 1,
    name: "Bananas",
    price: 1.8,
    stock: 120,
    image: require("../assets/images/products/banana.jpg"),
  },
  {
    id: 3,
    storeId: 1,
    name: "Milk Pack",
    price: 1.2,
    stock: 60,
    image: require("../assets/images/products/milk.jpg"),
  },
  {
    id: 4,
    storeId: 1,
    name: "Bread Loaf",
    price: 1.5,
    stock: 40,
    image: require("../assets/images/products/bread.jpg"),
  },
  {
    id: 5,
    storeId: 1,
    name: "Carrots",
    price: 1.0,
    stock: 80,
    image: require("../assets/images/products/carrot.jpg"),
  },

  // Store 2 – Electronics
  {
    id: 6,
    storeId: 2,
    name: "Laptop",
    price: 950,
    stock: 10,
    image: require("../assets/images/products/laptop.jpg"),
  },
  {
    id: 7,
    storeId: 2,
    name: "Headphones",
    price: 120,
    stock: 30,
    image: require("../assets/images/products/headphones.jpg"),
  },
  {
    id: 8,
    storeId: 2,
    name: "Mouse",
    price: 25,
    stock: 50,
    image: require("../assets/images/products/mouse.jpg"),
  },
  {
    id: 9,
    storeId: 2,
    name: "Keyboard",
    price: 45,
    stock: 40,
    image: require("../assets/images/products/keyboard.jpg"),
  },
  {
    id: 10,
    storeId: 2,
    name: "USB Cable",
    price: 10,
    stock: 100,
    image: require("../assets/images/products/usb_cable.jpg"),
  },

  // Store 3 – Furniture
  {
    id: 11,
    storeId: 3,
    name: "Sofa",
    price: 450,
    stock: 5,
    image: require("../assets/images/products/sofa.jpg"),
  },
  {
    id: 12,
    storeId: 3,
    name: "Lamp",
    price: 35,
    stock: 25,
    image: require("../assets/images/products/lamp.jpg"),
  },
  {
    id: 13,
    storeId: 3,
    name: "Chair",
    price: 55,
    stock: 20,
    image: require("../assets/images/products/chair.jpg"),
  },
  {
    id: 14,
    storeId: 3,
    name: "Table",
    price: 120,
    stock: 10,
    image: require("../assets/images/products/table.jpg"),
  },
  {
    id: 15,
    storeId: 3,
    name: "Wall Clock",
    price: 22,
    stock: 30,
    image: require("../assets/images/products/clock.jpg"),
  },

  // Store 4 – Books & Stationery
  {
    id: 16,
    storeId: 4,
    name: "Novel Book",
    price: 15,
    stock: 50,
    image: require("../assets/images/products/book.jpg"),
  },
  {
    id: 17,
    storeId: 4,
    name: "Notebook",
    price: 5,
    stock: 100,
    image: require("../assets/images/products/notebook.jpg"),
  },
  {
    id: 18,
    storeId: 4,
    name: "Pen Set",
    price: 3,
    stock: 200,
    image: require("../assets/images/products/pen.jpg"),
  },
  {
    id: 19,
    storeId: 4,
    name: "Backpack",
    price: 40,
    stock: 30,
    image: require("../assets/images/products/backpack.jpg"),
  },
  {
    id: 20,
    storeId: 4,
    name: "Calculator",
    price: 18,
    stock: 20,
    image: require("../assets/images/products/calculator.jpg"),
  },

  // Store 5 – Fitness
  {
    id: 21,
    storeId: 5,
    name: "Dumbbells",
    price: 60,
    stock: 15,
    image: require("../assets/images/products/dumbbell.jpg"),
  },
  {
    id: 22,
    storeId: 5,
    name: "Yoga Mat",
    price: 25,
    stock: 40,
    image: require("../assets/images/products/yoga_mat.jpg"),
  },
  {
    id: 23,
    storeId: 5,
    name: "Protein Powder",
    price: 50,
    stock: 20,
    image: require("../assets/images/products/protein.jpg"),
  },
  {
    id: 24,
    storeId: 5,
    name: "Treadmill",
    price: 900,
    stock: 3,
    image: require("../assets/images/products/treadmill.jpg"),
  },
  {
    id: 25,
    storeId: 5,
    name: "Workout Gloves",
    price: 15,
    stock: 60,
    image: require("../assets/images/products/gloves.jpg"),
  },
]
