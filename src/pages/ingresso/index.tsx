import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading, Stack, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { Sidebar } from '../../components/Sidebar';
import { GetStaticProps } from 'next';
import { PurchaseButton } from '../../components/PurchaseButton';
import { stripe } from '../../services/stripe';

type IngressoProps = {
  product: {
    priceId: string;
    amount: number;
  };
};

export default function Ingresso({ product }: IngressoProps) {
  return (
    <Box>
      <Flex w="100%" maxWidth={1480} mx="auto" my="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="whiteAlpha.800" p="8">
          <Breadcrumb
            bg="blue.400"
            color="white"
            borderRadius={4}
            px="3"
            py="1"
            fontSize="sm"
            marginBottom="6"
            spacing="8px"
            separator={<RiArrowDropRightLine color="gray.500" />}
          >
            <BreadcrumbItem>
              <Link href="/" passHref>
                <BreadcrumbLink>Home</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">Ingresso</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Heading color={useColorModeValue('gray.700', 'white')} fontSize={['3xl', '5xl']} mb="6" mt={['5', '20']} fontFamily={'body'}>
            Ingresso
          </Heading>
          <Stack>
            <Heading color={useColorModeValue('gray.700', 'white')} fontSize="xl" mb="6" mt={['5', '20']} fontFamily={'body'}>
              Valor: {product.amount}
            </Heading>
            <PurchaseButton priceId={product.priceId} />
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1L9MSfIlFvwTQhF4mOCfKdGN');

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 horas
  };
};
