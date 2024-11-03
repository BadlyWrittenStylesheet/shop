import "./cart.scss";
import { useState } from "react";

const Cart = ({ cartKit  }) => {
  const { cart, clearCart, removeFromCart } = cartKit;
  const [discount, setDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  
  const DISCOUNT_CODES = {
    'MICROSOFT': -2,
    'SVELTE': 0.5,
    'JAVA AS IN JAVASCRIPT': 0.1,
  };

  const getTotalPrice = () => {
    let totalPrice = 0;

    cart.forEach((product) => {
        // Zaraz sie porzygam
        totalPrice += product.price * product.count * (product.discount ? (1 - product.discount) : 1);
    });

    totalPrice *= (1 - discount)

    return totalPrice.toFixed(2);
  };

    const getOriginalPrice = () => {
        let totalPrice = 0;
        cart.forEach(product => {
            totalPrice += product.price * product.count;
        })
        return totalPrice;
    }

    const handleDiscountCode = () => {
        const discountVal = DISCOUNT_CODES[discountCode.toUpperCase()]; // Faancy
        if (discountVal) {
            setDiscount(discountVal);
            setDiscountCode('');
        } else {
            alert("Invalide discount code!\nHINT: try a better ja*ascript 'framework' <- meaningless word")
        }
    }

    const totalSavings = getOriginalPrice() - getTotalPrice();

  return (
    <div className="app-cart-container animate__animated animate__rotateInDownRight ">
      <h2>Cart</h2>
      {(cart.length > 0 ? <div className="product-list">
      {cart.map((product) => (
        <li key={product.id} className="product">
          <p>
            {product.count}x {product.name}
          </p>
          <button onClick={() => removeFromCart(product.id)}>-</button>
        </li>
      ))}
      </div> : null)}

    <div className="price-summary">
        <p className="original-price">
          Original: <span className="crossed-out">${getOriginalPrice().toFixed(2)}</span>
        </p>
        {totalSavings > 0 && (
          <p className="savings">Saved: <span>${totalSavings.toFixed(2)}</span></p>
        )}
        <p className="final-price">
          Total: <span>${getTotalPrice()}</span>
        </p>
    </div>
      {discount !== 0 && (
        <p className="discount-applied">
          {(discount * 100).toFixed(0)}% off
        </p>
      )}

    <div className="discount-section">
        <input 
          type="text" 
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          placeholder="Enter code..."
        />
        <button onClick={handleDiscountCode}>Apply</button>
      </div>

      <button onClick={() => clearCart()}>Clear Cart</button>
    </div>
  );
};

export default Cart;
