import {
  Badge,
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
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import Router from 'next/router';
import { useContext } from 'react';
import { RiAddLine, RiArrowDropRightLine, RiDownloadLine, RiDeleteBin2Line, RiPieChartLine, RiEyeLine } from 'react-icons/ri';
import { Header } from '../../../components/Header';
import { Pagination } from '../../../components/Pagination';
import { Sidebar } from '../../../components/Sidebar';
import { UserContext } from '../../../contexts/UserContext';

export default function UserList() {
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

            <BreadcrumbItem>
              <Link href="/carteiras" passHref>
                <BreadcrumbLink>Carteiras</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">Cenários</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex mb="8" justify="space-between" align="center">
            <Flex direction="column">
              <Heading size="lg" fontWeight="normal">
                Cenários
              </Heading>
              <Heading size="sm" color="gray.600" fontWeight="normal">
                Carteira 1
              </Heading>
            </Flex>

            <Link href="/carteiras/cenarios/create">
              <Button as="a" cursor="pointer" size="sm" fontSize="sm" colorScheme="green" leftIcon={<Icon as={RiAddLine} fontSize="20" />}>
                Novo cenário
              </Button>
            </Link>
          </Flex>

          <Divider my="6" borderColor="blue.700" />

          <Flex mb="8" justify="space-between" align="center">
            <Select size="sm" width="70px">
              <option value="option1">10</option>
              <option value="option2">20</option>
              <option value="option3">30</option>
            </Select>
            <Input placeholder="Pesquisar palavra-chave" size="sm" width="200px" />
          </Flex>

          <TableContainer overflow="auto">
            <Table size="sm" variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  {isWideVersion && (
                    <Th px={['4', '4', '6']} color="gray.300" width="8">
                      <Checkbox colorScheme="blue" />
                    </Th>
                  )}
                  <Th color="gray.400">Cenário</Th>
                  <Th color="gray.400">Criado por</Th>
                  <Th color="gray.400">Volume da carteira</Th>
                  <Th color="gray.400">Inadimplência</Th>
                  <Th color="gray.400">Duration</Th>
                  {isWideVersion && <Th color="gray.400">Criado em</Th>}
                  <Th width="8">Status</Th>
                  <Th width="8"></Th>
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
                      <Text fontWeight="bold">Alexandre Feio</Text>
                      <Text fontSize="sm" color="gray.500">
                        alexandre.penha@direto.com.br
                      </Text>
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
                  {isWideVersion && <Td>22/05/2022 às 10:50</Td>}
                  <Td>
                    <Badge variant="outline" colorScheme="orange">
                      Aguardando análise
                    </Badge>
                  </Td>
                  <Td>
                    <Tooltip hasArrow label="Relatório" bg="blue.700">
                      <Button
                        as="a"
                        size="sm"
                        pl="3"
                        pr="1"
                        m="1"
                        fontSize="sm"
                        colorScheme="blue"
                        leftIcon={<Icon as={RiEyeLine} fontSize="16" />}
                        onClick={() => Router.push('/carteiras/cenarios')}
                        cursor="pointer"
                      />
                    </Tooltip>
                    <Tooltip hasArrow label="Download" bg="green.700">
                      <Button
                        as="a"
                        size="sm"
                        pl="3"
                        pr="1"
                        m="1"
                        fontSize="sm"
                        colorScheme="green"
                        leftIcon={<Icon as={RiDownloadLine} fontSize="16" />}
                      />
                    </Tooltip>
                    <Tooltip hasArrow label="Excluir" bg="red.700">
                      <Button
                        as="a"
                        size="sm"
                        pl="3"
                        pr="1"
                        m="1"
                        fontSize="sm"
                        colorScheme="red"
                        leftIcon={<Icon as={RiDeleteBin2Line} fontSize="16" />}
                      />
                    </Tooltip>
                  </Td>
                </Tr>
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
                      <Text fontWeight="bold">Alexandre Feio</Text>
                      <Text fontSize="sm" color="gray.500">
                        alexandre.penha@direto.com.br
                      </Text>
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
                  {isWideVersion && <Td>22/05/2022 às 10:50</Td>}
                  <Td>
                    <Badge variant="outline" colorScheme="orange">
                      Aguardando análise
                    </Badge>
                  </Td>
                  <Td>
                    <Tooltip hasArrow label="Relatório" bg="blue.700">
                      <Button
                        as="a"
                        size="sm"
                        pl="3"
                        pr="1"
                        m="1"
                        fontSize="sm"
                        colorScheme="blue"
                        leftIcon={<Icon as={RiEyeLine} fontSize="16" />}
                        onClick={() => Router.push('/carteiras/cenarios')}
                        cursor="pointer"
                      />
                    </Tooltip>
                    <Tooltip hasArrow label="Download" bg="green.700">
                      <Button
                        as="a"
                        size="sm"
                        pl="3"
                        pr="1"
                        m="1"
                        fontSize="sm"
                        colorScheme="green"
                        leftIcon={<Icon as={RiDownloadLine} fontSize="16" />}
                      />
                    </Tooltip>
                    <Tooltip hasArrow label="Excluir" bg="red.700">
                      <Button
                        as="a"
                        size="sm"
                        pl="3"
                        pr="1"
                        m="1"
                        fontSize="sm"
                        colorScheme="red"
                        leftIcon={<Icon as={RiDeleteBin2Line} fontSize="16" />}
                      />
                    </Tooltip>
                  </Td>
                </Tr>
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
                      <Text fontWeight="bold">Alexandre Feio</Text>
                      <Text fontSize="sm" color="gray.500">
                        alexandre.penha@direto.com.br
                      </Text>
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
                  {isWideVersion && <Td>22/05/2022 às 10:50</Td>}
                  <Td>
                    <Badge variant="outline" colorScheme="orange">
                      Aguardando análise
                    </Badge>
                  </Td>
                  <Td>
                    <Tooltip hasArrow label="Relatório" bg="blue.700">
                      <Button
                        as="a"
                        size="sm"
                        pl="3"
                        pr="1"
                        m="1"
                        fontSize="sm"
                        colorScheme="blue"
                        leftIcon={<Icon as={RiEyeLine} fontSize="16" />}
                        onClick={() => Router.push('/carteiras/cenarios')}
                        cursor="pointer"
                      />
                    </Tooltip>
                    <Tooltip hasArrow label="Download" bg="green.700">
                      <Button
                        as="a"
                        size="sm"
                        pl="3"
                        pr="1"
                        m="1"
                        fontSize="sm"
                        colorScheme="green"
                        leftIcon={<Icon as={RiDownloadLine} fontSize="16" />}
                      />
                    </Tooltip>
                    <Tooltip hasArrow label="Excluir" bg="red.700">
                      <Button
                        as="a"
                        size="sm"
                        pl="3"
                        pr="1"
                        m="1"
                        fontSize="sm"
                        colorScheme="red"
                        leftIcon={<Icon as={RiDeleteBin2Line} fontSize="16" />}
                      />
                    </Tooltip>
                  </Td>
                </Tr>
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
                      <Text fontWeight="bold">Alexandre Feio</Text>
                      <Text fontSize="sm" color="gray.500">
                        alexandre.penha@direto.com.br
                      </Text>
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
                  {isWideVersion && <Td>22/05/2022 às 10:50</Td>}
                  <Td>
                    <Badge variant="outline" colorScheme="orange">
                      Aguardando análise
                    </Badge>
                  </Td>
                  <Td>
                    <Tooltip hasArrow label="Relatório" bg="blue.700">
                      <Button
                        as="a"
                        size="sm"
                        pl="3"
                        pr="1"
                        m="1"
                        fontSize="sm"
                        colorScheme="blue"
                        leftIcon={<Icon as={RiEyeLine} fontSize="16" />}
                        onClick={() => Router.push('/carteiras/cenarios')}
                        cursor="pointer"
                      />
                    </Tooltip>
                    <Tooltip hasArrow label="Download" bg="green.700">
                      <Button
                        as="a"
                        size="sm"
                        pl="3"
                        pr="1"
                        m="1"
                        fontSize="sm"
                        colorScheme="green"
                        leftIcon={<Icon as={RiDownloadLine} fontSize="16" />}
                      />
                    </Tooltip>
                    <Tooltip hasArrow label="Excluir" bg="red.700">
                      <Button
                        as="a"
                        size="sm"
                        pl="3"
                        pr="1"
                        m="1"
                        fontSize="sm"
                        colorScheme="red"
                        leftIcon={<Icon as={RiDeleteBin2Line} fontSize="16" />}
                      />
                    </Tooltip>
                  </Td>
                </Tr>
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
                      <Text fontWeight="bold">Alexandre Feio</Text>
                      <Text fontSize="sm" color="gray.500">
                        alexandre.penha@direto.com.br
                      </Text>
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
                  {isWideVersion && <Td>22/05/2022 às 10:50</Td>}
                  <Td>
                    <Badge variant="outline" colorScheme="orange">
                      Aguardando análise
                    </Badge>
                  </Td>
                  <Td>
                    <Tooltip hasArrow label="Relatório" bg="blue.700">
                      <Button
                        as="a"
                        size="sm"
                        pl="3"
                        pr="1"
                        m="1"
                        fontSize="sm"
                        colorScheme="blue"
                        leftIcon={<Icon as={RiEyeLine} fontSize="16" />}
                        onClick={() => Router.push('/carteiras/cenarios')}
                        cursor="pointer"
                      />
                    </Tooltip>
                    <Tooltip hasArrow label="Download" bg="green.700">
                      <Button
                        as="a"
                        size="sm"
                        pl="3"
                        pr="1"
                        m="1"
                        fontSize="sm"
                        colorScheme="green"
                        leftIcon={<Icon as={RiDownloadLine} fontSize="16" />}
                      />
                    </Tooltip>
                    <Tooltip hasArrow label="Excluir" bg="red.700">
                      <Button
                        as="a"
                        size="sm"
                        pl="3"
                        pr="1"
                        m="1"
                        fontSize="sm"
                        colorScheme="red"
                        leftIcon={<Icon as={RiDeleteBin2Line} fontSize="16" />}
                      />
                    </Tooltip>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>

          <Pagination />
        </Box>
      </Flex>
    </Box>
  );
}
