import { Button, Flex } from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

interface PurchaseButtonProps {
  priceId?: string;
}

export function PurchaseButton({ priceId }: PurchaseButtonProps) {
  const session = useSession();

  async function handlePurchase() {
    try {
      const response = await api.post('purchase');

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      alert('Houve um erro!');
    }
  }

  return (
    <Button
      colorScheme="green"
      size="lg"
      _disabled={{
        bg: 'blue.500',
        cursor: 'default',
      }}
      onClick={handlePurchase}
    >
      C. Crédito ou Boleto
    </Button>
  );
}
