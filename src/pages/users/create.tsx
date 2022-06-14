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
} from '@chakra-ui/react';
import Link from 'next/link';
import { useContext } from 'react';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { UserContext } from '../../contexts/UserContext';
import { SubmitHandler, useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório!'),
  email: yup.string().required('E-mail obrigatório!').email('E-mail inválido!'),
  password: yup.string().required('Digite a senha!').min(6, 'Nom mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'As senhas não conferem'),
});

export default function CreateUser() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });
  const { menuOpen } = useContext(UserContext);

  const { errors } = formState;

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(values);
  };

  return (
    <Box>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box as="form" flex="1" borderRadius={8} bg="whiteAlpha.800" p={['6', '8']} onSubmit={handleSubmit(handleCreateUser)}>
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
              <Link href="/users" passHref>
                <BreadcrumbLink href="#">Usuários</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">Novo usuário</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Heading size="lg" fontWeight="normal">
            Novo usuário
          </Heading>

          <Divider my="6" borderColor="blue.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input {...register('name')} error={errors.name} name="name" label="Nome completo" />
              <Input {...register('email')} error={errors.email} name="email" type="email" label="E-mail" />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input {...register('password')} error={errors.password} name="password" type="password" label="Senha" />
              <Input
                {...register('password_confirmation')}
                error={errors.password_confirmation}
                name="password_confirmation"
                type="password"
                label="Confirme a senha"
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users">
                <Button colorScheme="gray">Cancelar</Button>
              </Link>
              <Button type="submit" colorScheme="blue" isLoading={formState.isSubmitting}>
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
