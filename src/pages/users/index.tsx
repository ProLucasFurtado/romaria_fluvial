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
  Icon,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { RiAddLine, RiPencilLine, RiArrowDropRightLine, RiRefreshLine } from 'react-icons/ri';
import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';
import { UserContext } from '../../contexts/UserContext';
import { useUsers } from '../../services/hooks/useUsers';

export default function UserList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, refetch, error } = useUsers(page);

  const { menuOpen } = useContext(UserContext);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="whiteAlpha.800" p="8">
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

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">Usuários</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
            </Heading>

            <Flex>
              <Button
                as="a"
                cursor="pointer"
                size="sm"
                fontSize="sm"
                colorScheme="blue"
                leftIcon={<Icon as={RiRefreshLine} fontSize="20" />}
                onClick={refetch}
                mr="4"
              >
                Atualizar
              </Button>
              <Link href="/users/create">
                <Button as="a" cursor="pointer" size="sm" fontSize="sm" colorScheme="blue" leftIcon={<Icon as={RiAddLine} fontSize="20" />}>
                  Novo usuário
                </Button>
              </Link>
            </Flex>
          </Flex>

          <Divider my="6" borderColor="blue.700" />

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter os dados</Text>
            </Flex>
          ) : (
            <>
              <TableContainer overflow="auto">
                <Table size="sm" variant="striped" colorScheme="gray" overflow="auto">
                  <Thead>
                    <Tr>
                      {isWideVersion && (
                        <Th px={['4', '4', '6']} color="gray.300" width="8">
                          <Checkbox colorScheme="blue" />
                        </Th>
                      )}
                      <Th color="gray.400">Usuário</Th>
                      {isWideVersion && <Th color="gray.400">Data de cadastro</Th>}
                      <Th width="8"></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data?.users.map((dt: any) => {
                      return (
                        <Tr key={dt.id}>
                          {isWideVersion && (
                            <Td px={['4', '4', '6']}>
                              <Checkbox colorScheme="blue" />
                            </Td>
                          )}
                          <Td>
                            <Box>
                              <Text fontWeight="bold">{dt.name}</Text>
                              <Text fontSize="sm" color="gray.500">
                                {dt.email}
                              </Text>
                            </Box>
                          </Td>
                          {isWideVersion && <Td>{dt.createdAt}</Td>}
                          <Td>
                            <Button as="a" size="sm" fontSize="sm" colorScheme="blue" leftIcon={<Icon as={RiPencilLine} fontSize="16" />}>
                              {isWideVersion && 'Editar'}
                            </Button>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>

              <Pagination totalCountOfRegisters={data?.totalCount} currentPage={page} onPageChange={setPage} />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
