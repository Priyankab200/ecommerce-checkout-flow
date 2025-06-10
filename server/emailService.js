// server/emailService.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "091bd1e75ebc03",     // ✅ Mailtrap Username
    pass: "3e3e410a4c76bf"      // ✅ Mailtrap Password
  }
});

export const sendConfirmationEmail = async (order) => {
  const mailOptions = {
    from: '"eCommerce App" <no-reply@ecommerce.com>',
    to: order.customer.email,  // ✅ fix
    subject: "Order Confirmation",
    html: `
      <h2>Order #${order._id} Confirmed</h2>
      <p><strong>Product:</strong> ${order.product.title}</p>
      <p><strong>Total:</strong> ₹${order.product.price * order.quantity}</p>
      <p>Thanks for shopping with us!</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
};
