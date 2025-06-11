import { useLocation } from 'react-router-dom';
import '../index.css'; 

function ThankYouPage() {
  const location = useLocation();
  const { orderId, product, selectedVariant, quantity, customer } = location.state || {};

  if (!orderId || !product || !customer) {
    return <p>Invalid access. Please go back to the home page.</p>;
  }

  return (
    <div className="container">
      <h1>🎉 Thank You for Your Order!</h1>
      <p>Your order has been placed successfully.</p>
      <p><strong>Order Number:</strong> #{orderId}</p>

      <h2>🛒 Order Summary</h2>
      <p><strong>Product:</strong> {product.title}</p>
      <p><strong>Variant:</strong> {selectedVariant}</p>
      <p><strong>Quantity:</strong> {quantity}</p>
      <p><strong>Total:</strong> ₹{product.price * quantity}</p>

      <h2>📦 Shipping Details</h2>
      <p><strong>Name:</strong> {customer.fullName}</p>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Phone:</strong> {customer.phone}</p>
      <p><strong>Address:</strong> {customer.address}, {customer.city}, {customer.state} - {customer.zip}</p>

      <h3>✅ A confirmation email has been sent to your email address.</h3>
    </div>
  );
}

export default ThankYouPage;
