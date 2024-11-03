import { useState } from "react"; 
import "./header.scss";
import CartIcon from "./cart.icon";
import { Cart } from "./../";

const Header = ({ cartKit }) => {
    const [cartState, setCartState] = useState(false);
    const title = "Cute shop";

    const showCart = () => setCartState(!cartState);

    let itemNumber = 0;
    cartKit.cart.forEach(p => {
        itemNumber += p.count
    })

    return(
        <div className="app-header-container">
            <header>
                <div className="header container">
                    <h1>{title}</h1>
                    <CartIcon 
                        onClick={showCart} 
                        itemNumber={itemNumber}
                        width={48} />
                </div>
            </header>
            {cartState && <Cart cartKit={cartKit} />}
        </div>
    )
}

export default Header;
