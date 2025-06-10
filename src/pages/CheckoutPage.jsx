import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { product, selectedVariant, quantity } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Card Number Validation
    if (!/^\d{16}$/.test(formData.cardNumber)) {
      alert("Card Number must be 16 digits.");
      return;
    }

    // ✅ Expiry Date Validation (future date)
    const currentDate = new Date();
    const enteredDate = new Date(formData.expiry);
    if (enteredDate <= currentDate) {
      alert("Expiry date must be a future date.");
      return;
    }

    // ✅ CVV Validation
    if (!/^\d{3}$/.test(formData.cvv)) {
      alert("CVV must be 3 digits.");
      return;
    }

    // ✅ Prepare order object
    const orderData = {
      product,
      selectedVariant,
      quantity,
      customer: formData
    };

    try {
      const response = await fetch("/api/orders", {   // 🔁 Changed here!
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      const text = await response.text();
      console.log("🟢 Raw Response:", text);

      let result = {};
      try {
        result = JSON.parse(text);
      } catch (err) {
        console.error("❌ Failed to parse JSON:", err);
      }

      if (response.ok) {
        alert("✅ Order placed successfully!");
        navigate("/thank-you", {
          state: {
            orderId: result._id,
            ...orderData
          }
        });
      } else {
        alert("❌ Failed to place order: " + (result.error || "Unknown Error"));
      }

    } catch (error) {
      console.error("🔥 Error placing order:", error);
      alert("❌ Something went wrong.");
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Checkout Page</h1>

      {product ? (
        <>
          <h2>Product Summary:</h2>
          <p><strong>Name:</strong> {product.title}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Selected Variant:</strong> {selectedVariant}</p>
          <p><strong>Quantity:</strong> {quantity}</p>
          <p><strong>Total:</strong> ₹{product.price * quantity}</p>

          <form onSubmit={handleSubmit}>
            {[
              { name: 'fullName', placeholder: 'Full Name' },
              { name: 'email', placeholder: 'Email' },
              { name: 'phone', placeholder: 'Phone Number' },
              { name: 'address', placeholder: 'Address' },
              { name: 'city', placeholder: 'City' },
              { name: 'state', placeholder: 'State' },
              { name: 'zip', placeholder: 'Zip Code' },
              { name: 'cardNumber', placeholder: 'Card Number' },
              { name: 'expiry', placeholder: 'Expiry Date (YYYY-MM-DD)' },
              { name: 'cvv', placeholder: 'CVV' }
            ].map((field) => (
              <input
                key={field.name}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                style={{ display: 'block', marginBottom: '5px', padding: '8px', width: '300px' }}
                required
              />
            ))}

            <button type="submit" style={{ marginTop: '1rem' }}>Place Order</button>
          </form>
        </>
      ) : (
        <p>No product selected. Go back to home page.</p>
      )}
    </div>
  );
}

export default CheckoutPage;
