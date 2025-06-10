import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const product = {
  id: 'p001',
  title: 'Wireless Headphones',
  description: 'High quality wireless headphones with noise cancellation.',
  price: 2999,
  variants: ['Black', 'Pink', 'White'],
  image: '/images/headphones.jpeg', // ✅ फक्त एक image use केली
};

export default function LandingPage() {
  const navigate = useNavigate();
  const [variant, setVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = () => {
    navigate('/checkout', {
      state: {
        product,
        selectedVariant: variant,
        quantity,
      },
    });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <h1>{product.title}</h1>
      
      <img
        src={product.image}
        alt={`${product.title} - ${variant}`}
        style={{
          width: '250px',
          height: '250px',
          objectFit: 'cover',
          marginBottom: '1rem',
          borderRadius: '8px',
        }}
      />

      <p>{product.description}</p>
      <p><strong>Price:</strong> ₹{product.price}</p>

      <label style={{ display: 'block', marginTop: '1rem' }}>
        Variant:
        <select
          value={variant}
          onChange={(e) => setVariant(e.target.value)}
          style={{ marginLeft: '0.5rem' }}
        >
          {product.variants.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </label>

      <label style={{ display: 'block', marginTop: '1rem' }}>
        Quantity:
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          style={{ width: '60px', marginLeft: '0.5rem' }}
        />
      </label>

      <button
        onClick={handleBuyNow}
        style={{
          marginTop: '1.5rem',
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#FFF',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Buy Now
      </button>
    </div>
  );
}
