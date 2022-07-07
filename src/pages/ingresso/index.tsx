import {
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  Stack,
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { Sidebar } from '../../components/Sidebar';
import { GetStaticProps } from 'next';
import { PurchaseButton } from '../../components/PurchaseButton';
import { stripe } from '../../services/stripe';
import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';

type IngressoProps = {
  product: {
    priceId: string;
    amount: number;
  };
};

export default function Ingresso({ product }: IngressoProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      signIn('cognito');
    }
  }, []);

  return (
    <Box>
      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior={'inside'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading color="blue.500" fontSize={'2xl'} fontFamily={'body'}>
              Comprar ingresso com PIX
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <img src="/assets/images/pix-lote1.jpg" alt="" />
            <Heading fontSize={'xl'} fontFamily={'body'}>
              Após o pagamento, entre em contato através do WhatsApp (91) 98111-5046
            </Heading>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
          <Heading color="gray.700" fontSize={['3xl', '5xl']} mb="6" mt={['5', '20']} fontFamily={'body'}>
            Romaria Fluvial 2022
          </Heading>
          <Stack>
            <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Image src="/assets/images/compra_online.jpg" alt="Ingresso Romaria Fluvial" />

              <Box p="4" textAlign="center">
                <Box display="flex" alignItems="baseline">
                  <Badge borderRadius="full" px="2" colorScheme="teal">
                    1º Lote
                  </Badge>
                  {/* <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase" ml="2">
                    {property.beds} beds &bull; {property.baths} baths
                  </Box> */}
                </Box>

                {/* <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
                  Romaria Fluvial
                </Box> */}

                <Heading as="h2" size="xl" color="coral">
                  {product.amount}
                </Heading>
                <Text as="span" color="gray.600" fontSize="sm">
                  Cartão de crédito ou Boleto
                </Text>
                <Heading as="h2" size="lg" color="coral">
                  <Text as="span" color="gray.600" fontSize="sm">
                    ou{' '}
                  </Text>
                  R$ 257
                </Heading>
                <Text as="span" color="gray.600" fontSize="sm">
                  no Pix
                </Text>
                <Flex justify="space-around" mt="4">
                  <PurchaseButton priceId={product.priceId} />
                  <Button
                    colorScheme="blue"
                    size="lg"
                    _disabled={{
                      bg: 'blue.500',
                      cursor: 'default',
                    }}
                    onClick={onOpen}
                  >
                    Pix
                  </Button>
                </Flex>

                {/* <Box display="flex" mt="2" alignItems="center">
                  {Array(5)
                    .fill('')
                    .map((_, i) => (
                      <StarIcon key={i} color={i < property.rating ? 'teal.500' : 'gray.300'} />
                    ))}
                  <Box as="span" ml="2" color="gray.600" fontSize="sm">
                    {property.reviewCount} reviews
                  </Box>
                </Box> */}
              </Box>
            </Box>
            {/* <Heading color="gray.700" fontSize="xl" mb="6" mt={['5', '20']} fontFamily={'body'}>
              Valor: {product.amount}
            </Heading> */}
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1LHKwAIlFvwTQhF4ybdTdA8n');

  let product = {
    priceId: '',
    amount: '',
  };

  if (price.unit_amount) {
    product = {
      priceId: price.id,
      amount: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60, // 24 horas
  };
};
