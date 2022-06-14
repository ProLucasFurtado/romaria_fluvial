import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Checkbox,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  VStack,
  Text,
  Badge,
  Tooltip,
  Icon,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { RiArrowDropRightLine, RiDeleteBin2Line, RiDownloadLine } from 'react-icons/ri';
import { Input } from '../../../components/Form/Input';
import { Header } from '../../../components/Header';
import { Sidebar } from '../../../components/Sidebar';
import { UserContext } from '../../../contexts/UserContext';
import { SubmitHandler, useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
    <Box>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box as="form" flex="1" borderRadius={8} bg="whiteAlpha.800" p={['6', '8']} onSubmit={handleSubmit(handleCreate)}>
          <Breadcrumb
            bg="gray.100"
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
              <Link href="/carteiras" passHref>
                <BreadcrumbLink>Carteiras</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <Link href="/carteiras/cenarios" passHref>
                <BreadcrumbLink>Cenários</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">Novo cenário</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex direction="column">
            <Heading size="lg" fontWeight="normal">
              Novo cenário
            </Heading>
            <Heading size="sm" color="gray.600" fontWeight="normal">
              Carteira 1
            </Heading>
          </Flex>

          <Divider my="6" borderColor="blue.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                {...register('nome_cenario')}
                error={errors.nome_cenario}
                name="nome_cenario"
                label="Nome para o cenário"
                placeholder="Informe um nome para identificar o cenário"
              />
              <Input
                {...register('maior_vencimento')}
                error={errors.maior_vencimento}
                name="maior_vencimento"
                type="date"
                label="Maior data de vencimento"
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                {...register('menor_parcela')}
                error={errors.menor_parcela}
                name="menor_parcela"
                type="number"
                placeholder="R$"
                label="Menor parcela dos contratos"
              />
              <Input
                {...register('menor_saldo')}
                error={errors.menor_saldo}
                name="menor_saldo"
                type="number"
                placeholder="R$"
                label="Menor saldo devedor"
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                {...register('minimo_parcelas')}
                error={errors.minimo_parcelas}
                name="minimo_parcelas"
                type="number"
                placeholder="1-36"
                label="Mínimo de parcelas a vencer"
              />
              <Input
                {...register('aging_maximo')}
                error={errors.aging_maximo}
                name="aging_maximo"
                type="number"
                placeholder="1-12 meses"
                label="Aging máximo"
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                {...register('ltv_maximo')}
                error={errors.ltv_maximo}
                name="ltv_maximo"
                type="number"
                placeholder="0-100%"
                label="LTV máximo"
              />
              <Input
                {...register('minimo_spe')}
                error={errors.minimo_spe}
                name="minimo_spe"
                type="number"
                placeholder="R$0-R$10MM"
                label="Saldo mínimo por SPE"
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                {...register('unidades_performadas')}
                error={errors.unidades_performadas}
                name="unidades_performadas"
                placeholder="A Performar / Performadas / Todas"
                label="Unidades performadas"
              />
              <Input {...register('prazo_minimo')} error={errors.prazo_minimo} name="prazo_minimo" type="number" label="Prazo mínimo" />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input {...register('taxa_juros')} error={errors.taxa_juros} name="taxa_juros" type="number" label="Taxa de Juros" />
              <Input {...register('tir_minima')} error={errors.tir_minima} name="tir_minima" type="number" label="TIR Mínima" />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Button colorScheme="yellow" size="sm" fontSize="sm" onClick={() => setInSimulacao(true)} type="submit">
                Simular
              </Button>
            </HStack>
          </Flex>

          {inSimulacao && (
            <TableContainer overflow="auto">
              <Heading size="sm" color="gray.600" fontWeight="normal">
                Resultado da simulação:
              </Heading>

              <Divider my="6" borderColor="blue.700" />
              <Table size="sm" variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    {isWideVersion && (
                      <Th px={['4', '4', '6']} color="gray.300" width="8">
                        <Checkbox colorScheme="blue" />
                      </Th>
                    )}
                    <Th color="gray.400">Cenário</Th>
                    <Th color="gray.400">Volume da carteira</Th>
                    <Th color="gray.400">Inadimplência</Th>
                    <Th color="gray.400">Duration</Th>
                  </Tr>
                  <Th></Th>
                </Thead>
                <Tbody>
                  <Tr>
                    {isWideVersion && (
                      <Td px={['4', '4', '6']}>
                        <Checkbox colorScheme="blue" />
                      </Td>
                    )}
                    <Td>
                      <Box>
                        <Text fontWeight="bold">Cenário 1</Text>
                      </Box>
                    </Td>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">R$ 50.000.000,00</Text>
                      </Box>
                    </Td>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">R$ 100.000,00</Text>
                      </Box>
                    </Td>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">4 anos</Text>
                      </Box>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          )}

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/carteiras/cenarios">
                <Button colorScheme="red" size="sm" fontSize="sm">
                  Cancelar
                </Button>
              </Link>
              <Button colorScheme="green" size="sm" fontSize="sm">
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
