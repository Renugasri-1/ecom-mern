import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import API from "../services/api";
import {toast} from 'react-toastify';


export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    const token = localStorage.getItem("token");
    try{
    const res = await API.post("/api/payment/create-payment-intent", 
      { amount: amount * 100 }, 
      {
      headers: { Authorization: `Bearer ${token}` }
    });

    const { clientSecret } = res.data;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) }
    });

    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      alert("Payment successful!");
    }
  }catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" 
      placeholder="Amount"
      value={amount}
       onChange={(e) => setAmount(e.target.value)} />
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
}