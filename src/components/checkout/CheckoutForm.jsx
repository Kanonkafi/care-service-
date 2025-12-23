"use client";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { updatePaymentStatus } from "@/actions/server/booking";
import Swal from "sweetalert2";

export default function CheckoutForm({ price, bookingData, onPaymentSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !bookingData.clientSecret) {
        setError("Payment secret not found. Please try again.");
        return;
    }

    setLoading(true);
    setError("");

    const card = elements.getElement(CardElement);

    // ১. পেমেন্ট কনফার্ম করা
    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(bookingData.clientSecret, {
      payment_method: { 
        card: card,
        billing_details: {
            name: bookingData?.customerName,
            email: bookingData?.email,
        }
      },
    });

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
    } else if (paymentIntent.status === "succeeded") {
      
      // ২. পেমেন্ট সফল হলে ডাটাবেসে আপডেট
      const res = await updatePaymentStatus(bookingData._id, paymentIntent.id);

      if (res.success) {
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Payment Successful!',
          text: `Transaction ID: ${paymentIntent.id}`,
        });
        
        if (onPaymentSuccess) {
            onPaymentSuccess();
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col gap-1 mb-2">
         <p className="text-sm font-semibold text-gray-600">Customer: {bookingData?.customerName}</p>
         <p className="text-xs text-gray-400">{bookingData?.email}</p>
      </div>

      <div className="p-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus-within:border-primary transition-all">
        <CardElement 
          options={{ 
            style: { 
              base: { 
                fontSize: "16px", 
                color: "#424770",
                "::placeholder": { color: "#aab7c4" } 
              },
              invalid: { color: "#9e2146" } 
            } 
          }} 
        />
      </div>
      
      {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
      
      <button 
        type="submit" 
        disabled={!stripe || loading} 
        className={`btn btn-primary w-full btn-lg shadow-xl ${loading ? 'loading' : ''}`}
      >
        {loading ? "Processing..." : `Pay $${price} Now`}
      </button>

      <p className="text-center text-xs text-gray-400 mt-4 italic">
        🔒 Secured by Stripe.
      </p>
    </form>
  );
}