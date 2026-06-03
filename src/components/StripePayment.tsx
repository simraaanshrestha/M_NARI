import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Using a standard Stripe test publishable key
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const CheckoutForm: React.FC<{ onPaymentSuccess: () => void; totalAmount: number }> = ({ onPaymentSuccess, totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    // In a real integration, you would create a PaymentIntent on your server
    // and then confirm it here. For this sandbox demo, we simulate a successful payment.
    
    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
        // Simulate a slight delay for processing
        setTimeout(() => {
            setProcessing(false);
            onPaymentSuccess();
        }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 bg-white/5 border border-gold/20">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#F5F5F5', // pearl color
                '::placeholder': {
                  color: 'rgba(245, 245, 245, 0.2)',
                },
              },
              invalid: {
                color: '#FF6B6B',
              },
            },
          }}
        />
      </div>
      
      <div className="flex justify-between items-center py-2">
         <span className="text-pearl/40 uppercase tracking-[0.2em] text-[10px]">Processing via Stripe Sandbox</span>
      </div>

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full btn-gold"
      >
        {processing ? 'Processing...' : `Pay Rs ${totalAmount.toLocaleString()}`}
      </button>
    </form>
  );
};

const StripePayment: React.FC<{ onPaymentSuccess: () => void; totalAmount: number }> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
};

export default StripePayment;
