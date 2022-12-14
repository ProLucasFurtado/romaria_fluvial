import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  useBreakpointValue,
  VStack,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { UserContext } from '../../contexts/UserContext';
import { SubmitHandler, useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { HeadSite } from '../../components/Head';

type CreateFormData = {
  nome_cenario: string;
  maior_vencimento: string;
  menor_parcela: string;
  menor_saldo: string;
  minimo_parcelas: string;
  aging_maximo: string;
  ltv_maximo: string;
  minimo_spe: string;
  unidades_performadas: string;
  prazo_minimo: string;
  taxa_juros: string;
  tir_minima: string;
};

const createFormSchema = yup.object().shape({
  nome_cenario: yup.string().required('Nome obrigatório!'),
  maior_vencimento: yup.date(),
  menor_parcela: yup.number(),
  menor_saldo: yup.number(),
  minimo_parcelas: yup.number(),
  aging_maximo: yup.number(),
  ltv_maximo: yup.number(),
  minimo_spe: yup.number(),
  unidades_performadas: yup.string(),
  prazo_minimo: yup.number(),
  taxa_juros: yup.number(),
  tir_minima: yup.number(),
});

export default function CreateCenarios() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createFormSchema),
  });

  const { errors } = formState;

  const { menuOpen } = useContext(UserContext);
  const [inSimulacao, setInSimulacao] = useState(false);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const handleCreate: SubmitHandler<CreateFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(values);
  };

  return (
    <>
      <HeadSite />
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

              <BreadcrumbItem>
                <Link href="/reserva" passHref>
                  <BreadcrumbLink>Reserva</BreadcrumbLink>
                </Link>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#">Fazer reserva</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <Flex direction="column">
              <Heading size="lg" fontWeight="normal">
                Fazer reserva
              </Heading>
            </Flex>

            <Divider my="6" borderColor="blue.700" />

            <Text fontSize="2xl">
              Para fazer sua reserva,{' '}
              <span style={{ color: 'blue', fontWeight: 'bold' }}>
                <Link href="https://wa.me/5591981115046?text=Ola!%20Estou%20entrando%20em%20contato%20através%20do%20site%20para%20fazer%20minha%20reserva%20para%20a%20Romaria%20Fluvial.">
                  <a target="_blank">clique aqui</a>
                </Link>{' '}
              </span>
              e entre em contato conosco através do <span style={{ color: 'green', fontWeight: 'bold' }}>WhatsApp</span>.
            </Text>

            {/* <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input {...register('nome')} error={errors.nome} name="nome" label="Nome" placeholder="Informe o seu nome completo" />
              <Input
                {...register('email')}
                error={errors.email}
                name="email"
                label="Email"
                type="email"
                placeholder="Informe o seu melhor email"
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                {...register('celular')}
                error={errors.celular}
                name="celular"
                label="Celular"
                type="number"
                placeholder="Digite apenas números *com DDD"
              />
              <Input
                {...register('quantidade')}
                error={errors.quantidade}
                name="quantidade"
                label="Quantidade"
                type="number"
                placeholder="Informe o número de pessoas"
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Button colorScheme="green" size="sm" fontSize="sm">
                Reservar
              </Button>
            </HStack>
          </Flex> */}
          </Box>
        </Flex>
      </Box>
    </>
  );
}
