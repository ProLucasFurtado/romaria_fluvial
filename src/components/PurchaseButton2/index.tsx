import { Button, Flex } from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

interface PurchaseButtonProps {
  priceId?: string;
}

export function PurchaseButton2({ priceId }: PurchaseButtonProps) {
  const session = useSession();

  async function handlePurchase() {
    if (!session) {
      signIn('cognito');
      return;
    }

    try {
      const response = await api.post('purchase2');

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      if (!session) {
        signIn('cognito');
        return;
      }
      alert('Houve um erro!');
      console.log('error', error);
    }
  }

  return (
    <Button
      colorScheme="green"
      _disabled={{
        bg: 'blue.500',
        cursor: 'default',
      }}
      onClick={handlePurchase}
      size="lg"
    >
      C. Crédito ou Boleto
    </Button>
  );
}
