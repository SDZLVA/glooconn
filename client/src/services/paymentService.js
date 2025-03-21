import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const createPaymentIntent = async (amount, currency = 'usd') => {
  try {
    const response = await axios.post(`${API_URL}/api/create-payment-intent`, {
      amount,
      currency,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

export const confirmPayment = async (paymentIntentId) => {
  try {
    const response = await axios.post(`${API_URL}/api/confirm-payment`, {
      paymentIntentId,
    });
    return response.data;
  } catch (error) {
    console.error('Error confirming payment:', error);
    throw error;
  }
};

export const processPayment = async (amount, currency, paymentMethod) => {
  try {
    // Create a payment intent
    const { clientSecret } = await createPaymentIntent(amount, currency);

    // Confirm the payment with Stripe
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod,
    });

    if (error) {
      throw new Error(error.message);
    }

    // Verify the payment on the backend
    const confirmation = await confirmPayment(paymentIntent.id);
    return confirmation;
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
}; 