import "./product.scss";

const Product = (props) => {
  const { product, action } = props;

  return (
    <div className="app-product-container" style={{ "--img": `url(${product.img})`}}>
      <div className="content">
          <h3>{product.name}</h3>
          <p className="desc" title={product.description}>
            {product.description}
          </p>
            <div className="buy">
              <p className={`price ${product.discount ? 'discount' : ''}`}>${product.price}</p>
            { product.discount ? (
                <p className="price">${(product.price * (1 - product.discount)).toFixed(2)}</p>
                ) : null
            }
              <button onClick={() => action(product)}>Buy</button>
          </div>
        </div>
      </div>
  );
};

export default Product;
