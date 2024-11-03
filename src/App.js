import "./App.scss";
import { Header, Product, Footer, CategorySelect } from "./components";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const getData = async () => {
    const response = await axios.get("/products.json");
    const data = response.data;

    setProducts(data);
  };

  const getCategories = (products) => {
    const categoriesHelper = [];

    products.forEach((product) =>
      categoriesHelper.includes(product.category)
        ? undefined
        : categoriesHelper.push(product.category),
    );

    setCategories(["All", ...categoriesHelper]);
  };

  const clearCart = () => setCart([]);
  const selectCategory = (category) => setSelectedCategory(category);
  const removeFromCart = (id) => {
    const product = cart.find((p) => p.id === id);
    if (!product) {
      return;
    }

    /// Warning, the code below contains *not* safe for work material, beware!
    if (product.count > 1) {
      console.log(product.count, product.name);
      const updatedCart = cart.map((p) =>
        p.id === id ? { ...p, count: p.count - 1 } : p,
      );
      setCart([...updatedCart]);
    } else {
      console.log("-", product.count, product.name);
      const updatedCart = cart.filter((p) => p.id !== id);
      setCart([...updatedCart]);
    }
  };

  const addToCart = (product) => {
    const productInCart = cart.find((p) => p.id === product.id);

    if (productInCart) {
      const updatedCart = cart.map((p) =>
        p.id === product.id ? { ...p, count: p.count + 1 } : p,
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, count: 1 }]);
    }
  };

  // Well, I do consider myself brilliant already, but this is peak
  const cartKit = {
      addToCart: addToCart,
      removeFromCart: removeFromCart,
      clearCart: clearCart,
      cart: cart
  };

  const categoryKit = {
      categories: categories,
      selectCategory: selectCategory,
      selectedCategory: selectedCategory
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getCategories(products);
  }, [products]);

  return (
    <div className="App">
      <Header cartKit={cartKit} />
      <main>
          <CategorySelect categoryKit={categoryKit} />
          <div className="products container">
            {(selectedCategory === "All"
              ? products
              : products.filter((product) =>
                  selectedCategory
                    ? product.category === selectedCategory
                    : product,
                )
            ).map((product) => (
              <Product key={product.id} product={product} action={addToCart} />
            ))}
          </div>
      </main>
      <Footer />
    </div>
  );
}

//       <div className="categories container">
//         {categories.map((category, index) => (
//           <button
//             key={index}
//             className={selectedCategory === category ? "active" : ""}
//             onClick={() => selectCategory(category)}
//           >
//             {category}
//           </button>
//         ))}
//       </div>
export default App;
