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
  List,
  ListItem,
  Select,
  Stack,
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
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import Router from 'next/router';
import { useContext, useState } from 'react';
import {
  RiAddLine,
  RiArrowDropRightLine,
  RiDownloadLine,
  RiDeleteBin2Line,
  RiPieChartLine,
  RiFileListLine,
  RiBankCard2Line,
} from 'react-icons/ri';
import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';
import { UserContext } from '../../contexts/UserContext';
import { useForm } from 'react-hook-form';

export default function UserList() {
  const { register, handleSubmit } = useForm();
  const [viewMode, setViewMode] = useState('list');
  const { menuOpen } = useContext(UserContext);
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  function handleSignIn() {}

  function modifyViewMode(view: string) {
    setViewMode(view);
  }

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
              <BreadcrumbLink href="#">Carteiras</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Carteiras
            </Heading>

            <Link href="/carteiras/create">
              <Button as="a" cursor="pointer" size="sm" fontSize="sm" colorScheme="green" leftIcon={<Icon as={RiAddLine} fontSize="20" />}>
                Nova carteira
              </Button>
            </Link>
          </Flex>

          <Divider my="6" borderColor="blue.700" />

          <Flex mb="8" justify="space-between" align="center">
            <Flex justify="center" align="center">
              <Select size="sm" width="70px">
                <option value="option1">10</option>
                <option value="option2">20</option>
                <option value="option3">30</option>
              </Select>
              <Flex ml="8" justify="center" align="center">
                <Text color={'blue.700'} textTransform={'uppercase'} fontSize={'sm'} letterSpacing={1.1}>
                  Visualizar como:
                </Text>
                <Tooltip hasArrow label="Lista" bg="blue.700">
                  <Button
                    as="a"
                    size="sm"
                    pl="3"
                    pr="1"
                    mx="1"
                    fontSize="sm"
                    colorScheme="blue"
                    leftIcon={<Icon as={RiFileListLine} fontSize="16" />}
                    onClick={() => modifyViewMode('list')}
                    cursor="pointer"
                  />
                </Tooltip>
                <Tooltip hasArrow label="Card" bg="blue.700">
                  <Button
                    as="a"
                    size="sm"
                    pl="3"
                    pr="1"
                    mx="1"
                    fontSize="sm"
                    colorScheme="blue"
                    leftIcon={<Icon as={RiBankCard2Line} fontSize="16" />}
                    onClick={() => modifyViewMode('card')}
                    cursor="pointer"
                  />
                </Tooltip>
              </Flex>
            </Flex>
            <Input placeholder="Pesquisar palavra-chave" size="sm" width="200px" />
          </Flex>

          {viewMode === 'card' && (
            <>
              <Flex align="center" justify="space-around">
                <Box
                  mx="6"
                  my="3"
                  bg={useColorModeValue('white', 'gray.800')}
                  boxShadow={'xl'}
                  w={'full'}
                  borderRadius={8}
                  rounded={'md'}
                  overflow={'hidden'}
                >
                  <Stack textAlign={'center'} p={2} color={useColorModeValue('blue.800', 'white')} align={'center'}>
                    <Stack direction={'row'} align={'center'} justify={'center'}>
                      <Text fontSize={'xl'}>Carteira 1</Text>
                    </Stack>
                  </Stack>

                  <Box bg={useColorModeValue('gray.50', 'gray.900')} p={4}>
                    <List spacing={3}>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          CLIENTE:
                        </Text>
                        <Text textTransform={'uppercase'} fontSize={'sm'} letterSpacing={1.1}>
                          TENDA
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          CRIADA EM:
                        </Text>
                        <Text textTransform={'uppercase'} fontSize={'sm'} letterSpacing={1.1}>
                          22/05/2022 às 10:50
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          STATUS:
                        </Text>
                        <Badge variant="outline" colorScheme="green">
                          APROVADA
                        </Badge>
                      </ListItem>
                    </List>

                    <Flex pt={6} align="center" justify="center">
                      <Tooltip hasArrow label="Cenários" bg="blue.700">
                        <Button
                          as="a"
                          size="sm"
                          pl="3"
                          pr="1"
                          m="1"
                          fontSize="sm"
                          colorScheme="blue"
                          leftIcon={<Icon as={RiPieChartLine} fontSize="16" />}
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
                    </Flex>
                  </Box>
                </Box>
                <Box
                  mx="6"
                  my="3"
                  bg={useColorModeValue('white', 'gray.800')}
                  boxShadow={'xl'}
                  w={'full'}
                  borderRadius={8}
                  rounded={'md'}
                  overflow={'hidden'}
                >
                  <Stack textAlign={'center'} p={2} color={useColorModeValue('blue.800', 'white')} align={'center'}>
                    <Stack direction={'row'} align={'center'} justify={'center'}>
                      <Text fontSize={'xl'}>Carteira 2</Text>
                    </Stack>
                  </Stack>

                  <Box bg={useColorModeValue('gray.50', 'gray.900')} p={4}>
                    <List spacing={3}>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          CLIENTE:
                        </Text>
                        <Text textTransform={'uppercase'} fontSize={'sm'} letterSpacing={1.1}>
                          TENDA
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          CRIADA EM:
                        </Text>
                        <Text textTransform={'uppercase'} fontSize={'sm'} letterSpacing={1.1}>
                          22/05/2022 às 10:50
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          STATUS:
                        </Text>
                        <Badge variant="outline" colorScheme="green">
                          APROVADA
                        </Badge>
                      </ListItem>
                    </List>

                    <Flex pt={6} align="center" justify="center">
                      <Tooltip hasArrow label="Cenários" bg="blue.700">
                        <Button
                          as="a"
                          size="sm"
                          pl="3"
                          pr="1"
                          m="1"
                          fontSize="sm"
                          colorScheme="blue"
                          leftIcon={<Icon as={RiPieChartLine} fontSize="16" />}
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
                    </Flex>
                  </Box>
                </Box>
                <Box
                  mx="6"
                  my="3"
                  bg={useColorModeValue('white', 'gray.800')}
                  boxShadow={'xl'}
                  w={'full'}
                  borderRadius={8}
                  rounded={'md'}
                  overflow={'hidden'}
                >
                  <Stack textAlign={'center'} p={2} color={useColorModeValue('blue.800', 'white')} align={'center'}>
                    <Stack direction={'row'} align={'center'} justify={'center'}>
                      <Text fontSize={'xl'}>Carteira 3</Text>
                    </Stack>
                  </Stack>

                  <Box bg={useColorModeValue('gray.50', 'gray.900')} p={4}>
                    <List spacing={3}>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          CLIENTE:
                        </Text>
                        <Text textTransform={'uppercase'} fontSize={'sm'} letterSpacing={1.1}>
                          TENDA
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          CRIADA EM:
                        </Text>
                        <Text textTransform={'uppercase'} fontSize={'sm'} letterSpacing={1.1}>
                          22/05/2022 às 10:50
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          STATUS:
                        </Text>
                        <Badge variant="outline" colorScheme="green">
                          APROVADA
                        </Badge>
                      </ListItem>
                    </List>

                    <Flex pt={6} align="center" justify="center">
                      <Tooltip hasArrow label="Cenários" bg="blue.700">
                        <Button
                          as="a"
                          size="sm"
                          pl="3"
                          pr="1"
                          m="1"
                          fontSize="sm"
                          colorScheme="blue"
                          leftIcon={<Icon as={RiPieChartLine} fontSize="16" />}
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
                    </Flex>
                  </Box>
                </Box>
                <Box
                  mx="6"
                  my="3"
                  bg={useColorModeValue('white', 'gray.800')}
                  boxShadow={'xl'}
                  w={'full'}
                  borderRadius={8}
                  rounded={'md'}
                  overflow={'hidden'}
                >
                  <Stack textAlign={'center'} p={2} color={useColorModeValue('blue.800', 'white')} align={'center'}>
                    <Stack direction={'row'} align={'center'} justify={'center'}>
                      <Text fontSize={'xl'}>Carteira 3</Text>
                    </Stack>
                  </Stack>

                  <Box bg={useColorModeValue('gray.50', 'gray.900')} p={4}>
                    <List spacing={3}>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          CLIENTE:
                        </Text>
                        <Text textTransform={'uppercase'} fontSize={'sm'} letterSpacing={1.1}>
                          TENDA
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          CRIADA EM:
                        </Text>
                        <Text textTransform={'uppercase'} fontSize={'sm'} letterSpacing={1.1}>
                          22/05/2022 às 10:50
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          STATUS:
                        </Text>
                        <Badge variant="outline" colorScheme="green">
                          APROVADA
                        </Badge>
                      </ListItem>
                    </List>

                    <Flex pt={6} align="center" justify="center">
                      <Tooltip hasArrow label="Cenários" bg="blue.700">
                        <Button
                          as="a"
                          size="sm"
                          pl="3"
                          pr="1"
                          m="1"
                          fontSize="sm"
                          colorScheme="blue"
                          leftIcon={<Icon as={RiPieChartLine} fontSize="16" />}
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
                    </Flex>
                  </Box>
                </Box>
                <Box
                  mx="6"
                  my="3"
                  bg={useColorModeValue('white', 'gray.800')}
                  boxShadow={'xl'}
                  w={'full'}
                  borderRadius={8}
                  rounded={'md'}
                  overflow={'hidden'}
                >
                  <Stack textAlign={'center'} p={2} color={useColorModeValue('blue.800', 'white')} align={'center'}>
                    <Stack direction={'row'} align={'center'} justify={'center'}>
                      <Text fontSize={'xl'}>Carteira 3</Text>
                    </Stack>
                  </Stack>

                  <Box bg={useColorModeValue('gray.50', 'gray.900')} p={4}>
                    <List spacing={3}>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          CLIENTE:
                        </Text>
                        <Text textTransform={'uppercase'} fontSize={'sm'} letterSpacing={1.1}>
                          TENDA
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          CRIADA EM:
                        </Text>
                        <Text textTransform={'uppercase'} fontSize={'sm'} letterSpacing={1.1}>
                          22/05/2022 às 10:50
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          STATUS:
                        </Text>
                        <Badge variant="outline" colorScheme="green">
                          APROVADA
                        </Badge>
                      </ListItem>
                    </List>

                    <Flex pt={6} align="center" justify="center">
                      <Tooltip hasArrow label="Cenários" bg="blue.700">
                        <Button
                          as="a"
                          size="sm"
                          pl="3"
                          pr="1"
                          m="1"
                          fontSize="sm"
                          colorScheme="blue"
                          leftIcon={<Icon as={RiPieChartLine} fontSize="16" />}
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
                    </Flex>
                  </Box>
                </Box>
              </Flex>
              <Flex align="center" justify="space-around">
                <Box
                  mx="6"
                  my="3"
                  bg={useColorModeValue('white', 'gray.800')}
                  boxShadow={'xl'}
                  w={'full'}
                  borderRadius={8}
                  rounded={'md'}
                  overflow={'hidden'}
                >
                  <Stack textAlign={'center'} p={2} color={useColorModeValue('blue.800', 'white')} align={'center'}>
                    <Stack direction={'row'} align={'center'} justify={'center'}>
                      <Text fontSize={'xl'}>Carteira 1</Text>
                    </Stack>
                  </Stack>

                  <Box bg={useColorModeValue('gray.50', 'gray.900')} p={4}>
                    <List spacing={3}>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          CLIENTE:
                        </Text>
                        <Text textTransform={'uppercase'} fontSize={'sm'} letterSpacing={1.1}>
                          TENDA
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          CRIADA EM:
                        </Text>
                        <Text textTransform={'uppercase'} fontSize={'sm'} letterSpacing={1.1}>
                          22/05/2022 às 10:50
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          STATUS:
                        </Text>
                        <Badge variant="outline" colorScheme="green">
                          APROVADA
                        </Badge>
                      </ListItem>
                    </List>

                    <Flex pt={6} align="center" justify="center">
                      <Tooltip hasArrow label="Cenários" bg="blue.700">
                        <Button
                          as="a"
                          size="sm"
                          pl="3"
                          pr="1"
                          m="1"
                          fontSize="sm"
                          colorScheme="blue"
                          leftIcon={<Icon as={RiPieChartLine} fontSize="16" />}
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
                    </Flex>
                  </Box>
                </Box>
                <Box
                  mx="6"
                  my="3"
                  bg={useColorModeValue('white', 'gray.800')}
                  boxShadow={'xl'}
                  w={'full'}
                  borderRadius={8}
                  rounded={'md'}
                  overflow={'hidden'}
                >
                  <Stack textAlign={'center'} p={2} color={useColorModeValue('blue.800', 'white')} align={'center'}>
                    <Stack direction={'row'} align={'center'} justify={'center'}>
                      <Text fontSize={'xl'}>Carteira 2</Text>
                    </Stack>
                  </Stack>

                  <Box bg={useColorModeValue('gray.50', 'gray.900')} p={4}>
                    <List spacing={3}>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          CLIENTE:
                        </Text>
                        <Text textTransform={'uppercase'} fontSize={'sm'} letterSpacing={1.1}>
                          TENDA
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          CRIADA EM:
                        </Text>
                        <Text textTransform={'uppercase'} fontSize={'sm'} letterSpacing={1.1}>
                          22/05/2022 às 10:50
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          STATUS:
                        </Text>
                        <Badge variant="outline" colorScheme="green">
                          APROVADA
                        </Badge>
                      </ListItem>
                    </List>

                    <Flex pt={6} align="center" justify="center">
                      <Tooltip hasArrow label="Cenários" bg="blue.700">
                        <Button
                          as="a"
                          size="sm"
                          pl="3"
                          pr="1"
                          m="1"
                          fontSize="sm"
                          colorScheme="blue"
                          leftIcon={<Icon as={RiPieChartLine} fontSize="16" />}
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
                    </Flex>
                  </Box>
                </Box>
                <Box
                  mx="6"
                  my="3"
                  bg={useColorModeValue('white', 'gray.800')}
                  boxShadow={'xl'}
                  w={'full'}
                  borderRadius={8}
                  rounded={'md'}
                  overflow={'hidden'}
                >
                  <Stack textAlign={'center'} p={2} color={useColorModeValue('blue.800', 'white')} align={'center'}>
                    <Stack direction={'row'} align={'center'} justify={'center'}>
                      <Text fontSize={'xl'}>Carteira 3</Text>
                    </Stack>
                  </Stack>

                  <Box bg={useColorModeValue('gray.50', 'gray.900')} p={4}>
                    <List spacing={3}>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          CLIENTE:
                        </Text>
                        <Text textTransform={'uppercase'} fontSize={'sm'} letterSpacing={1.1}>
                          TENDA
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          CRIADA EM:
                        </Text>
                        <Text textTransform={'uppercase'} fontSize={'sm'} letterSpacing={1.1}>
                          22/05/2022 às 10:50
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          STATUS:
                        </Text>
                        <Badge variant="outline" colorScheme="green">
                          APROVADA
                        </Badge>
                      </ListItem>
                    </List>

                    <Flex pt={6} align="center" justify="center">
                      <Tooltip hasArrow label="Cenários" bg="blue.700">
                        <Button
                          as="a"
                          size="sm"
                          pl="3"
                          pr="1"
                          m="1"
                          fontSize="sm"
                          colorScheme="blue"
                          leftIcon={<Icon as={RiPieChartLine} fontSize="16" />}
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
                    </Flex>
                  </Box>
                </Box>
                <Box
                  mx="6"
                  my="3"
                  bg={useColorModeValue('white', 'gray.800')}
                  boxShadow={'xl'}
                  w={'full'}
                  borderRadius={8}
                  rounded={'md'}
                  overflow={'hidden'}
                >
                  <Stack textAlign={'center'} p={2} color={useColorModeValue('blue.800', 'white')} align={'center'}>
                    <Stack direction={'row'} align={'center'} justify={'center'}>
                      <Text fontSize={'xl'}>Carteira 3</Text>
                    </Stack>
                  </Stack>

                  <Box bg={useColorModeValue('gray.50', 'gray.900')} p={4}>
                    <List spacing={3}>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          CLIENTE:
                        </Text>
                        <Text textTransform={'uppercase'} fontSize={'sm'} letterSpacing={1.1}>
                          TENDA
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          CRIADA EM:
                        </Text>
                        <Text textTransform={'uppercase'} fontSize={'sm'} letterSpacing={1.1}>
                          22/05/2022 às 10:50
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          STATUS:
                        </Text>
                        <Badge variant="outline" colorScheme="green">
                          APROVADA
                        </Badge>
                      </ListItem>
                    </List>

                    <Flex pt={6} align="center" justify="center">
                      <Tooltip hasArrow label="Cenários" bg="blue.700">
                        <Button
                          as="a"
                          size="sm"
                          pl="3"
                          pr="1"
                          m="1"
                          fontSize="sm"
                          colorScheme="blue"
                          leftIcon={<Icon as={RiPieChartLine} fontSize="16" />}
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
                    </Flex>
                  </Box>
                </Box>
                <Box
                  mx="6"
                  my="3"
                  bg={useColorModeValue('white', 'gray.800')}
                  boxShadow={'xl'}
                  w={'full'}
                  borderRadius={8}
                  rounded={'md'}
                  overflow={'hidden'}
                >
                  <Stack textAlign={'center'} p={2} color={useColorModeValue('blue.800', 'white')} align={'center'}>
                    <Stack direction={'row'} align={'center'} justify={'center'}>
                      <Text fontSize={'xl'}>Carteira 3</Text>
                    </Stack>
                  </Stack>

                  <Box bg={useColorModeValue('gray.50', 'gray.900')} p={4}>
                    <List spacing={3}>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          CLIENTE:
                        </Text>
                        <Text textTransform={'uppercase'} fontSize={'sm'} letterSpacing={1.1}>
                          TENDA
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          CRIADA EM:
                        </Text>
                        <Text textTransform={'uppercase'} fontSize={'sm'} letterSpacing={1.1}>
                          22/05/2022 às 10:50
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text color={'blue.700'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'} letterSpacing={1.1}>
                          STATUS:
                        </Text>
                        <Badge variant="outline" colorScheme="green">
                          APROVADA
                        </Badge>
                      </ListItem>
                    </List>

                    <Flex pt={6} align="center" justify="center">
                      <Tooltip hasArrow label="Cenários" bg="blue.700">
                        <Button
                          as="a"
                          size="sm"
                          pl="3"
                          pr="1"
                          m="1"
                          fontSize="sm"
                          colorScheme="blue"
                          leftIcon={<Icon as={RiPieChartLine} fontSize="16" />}
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
                    </Flex>
                  </Box>
                </Box>
              </Flex>
            </>
          )}

          {viewMode === 'list' && (
            <TableContainer overflow="auto">
              <Table size="sm" variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    {isWideVersion && (
                      <Th px={['4', '4', '6']} color="gray.300" width="8">
                        <Checkbox colorScheme="blue" />
                      </Th>
                    )}
                    <Th color="gray.400">Carteira</Th>
                    <Th color="gray.400">Cliente</Th>
                    {isWideVersion && <Th color="gray.400">Criada em</Th>}
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
                        <Text fontWeight="bold">Carteira 1</Text>
                      </Box>
                    </Td>
                    <Td>
                      <Box>
                        <Text fontSize="sm" color="gray.500">
                          DIMOB
                        </Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td>22/05/2022 às 10:50</Td>}
                    <Td>
                      <Badge variant="outline" colorScheme="orange">
                        Aguardando análise
                      </Badge>
                    </Td>
                    <Td>
                      <Tooltip hasArrow label="Cenários" bg="blue.700">
                        <Button
                          as="a"
                          size="sm"
                          pl="3"
                          pr="1"
                          m="1"
                          fontSize="sm"
                          colorScheme="blue"
                          leftIcon={<Icon as={RiPieChartLine} fontSize="16" />}
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
                        <Text fontWeight="bold">Carteira 2</Text>
                      </Box>
                    </Td>
                    <Td>
                      <Box>
                        <Text fontSize="sm" color="gray.500">
                          Realiza
                        </Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td>22/05/2022 às 10:50</Td>}
                    <Td>
                      <Badge variant="outline" colorScheme="red">
                        Recusada
                      </Badge>
                    </Td>
                    <Td>
                      <Tooltip hasArrow label="Cenários" bg="blue.700">
                        <Button
                          as="a"
                          size="sm"
                          pl="3"
                          pr="1"
                          m="1"
                          fontSize="sm"
                          colorScheme="blue"
                          leftIcon={<Icon as={RiPieChartLine} fontSize="16" />}
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
                        <Text fontWeight="bold">Carteira 3</Text>
                      </Box>
                    </Td>
                    <Td>
                      <Box>
                        <Text fontSize="sm" color="gray.500">
                          Tenda
                        </Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td>22/05/2022 às 10:50</Td>}
                    <Td>
                      <Badge variant="outline" colorScheme="green">
                        Aprovada
                      </Badge>
                    </Td>
                    <Td>
                      <Tooltip hasArrow label="Cenários" bg="blue.700">
                        <Button
                          as="a"
                          size="sm"
                          pl="3"
                          pr="1"
                          m="1"
                          fontSize="sm"
                          colorScheme="blue"
                          leftIcon={<Icon as={RiPieChartLine} fontSize="16" />}
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
                        <Text fontWeight="bold">Carteira 1</Text>
                      </Box>
                    </Td>
                    <Td>
                      <Box>
                        <Text fontSize="sm" color="gray.500">
                          DIMOB
                        </Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td>22/05/2022 às 10:50</Td>}
                    <Td>
                      <Badge variant="outline" colorScheme="orange">
                        Aguardando análise
                      </Badge>
                    </Td>
                    <Td>
                      <Tooltip hasArrow label="Cenários" bg="blue.700">
                        <Button
                          as="a"
                          size="sm"
                          pl="3"
                          pr="1"
                          m="1"
                          fontSize="sm"
                          colorScheme="blue"
                          leftIcon={<Icon as={RiPieChartLine} fontSize="16" />}
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
                        <Text fontWeight="bold">Carteira 2</Text>
                      </Box>
                    </Td>
                    <Td>
                      <Box>
                        <Text fontSize="sm" color="gray.500">
                          Realiza
                        </Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td>22/05/2022 às 10:50</Td>}
                    <Td>
                      <Badge variant="outline" colorScheme="red">
                        Recusada
                      </Badge>
                    </Td>
                    <Td>
                      <Tooltip hasArrow label="Cenários" bg="blue.700">
                        <Button
                          as="a"
                          size="sm"
                          pl="3"
                          pr="1"
                          m="1"
                          fontSize="sm"
                          colorScheme="blue"
                          leftIcon={<Icon as={RiPieChartLine} fontSize="16" />}
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
                        <Text fontWeight="bold">Carteira 3</Text>
                      </Box>
                    </Td>
                    <Td>
                      <Box>
                        <Text fontSize="sm" color="gray.500">
                          Tenda
                        </Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td>22/05/2022 às 10:50</Td>}
                    <Td>
                      <Badge variant="outline" colorScheme="green">
                        Aprovada
                      </Badge>
                    </Td>
                    <Td>
                      <Tooltip hasArrow label="Cenários" bg="blue.700">
                        <Button
                          as="a"
                          size="sm"
                          pl="3"
                          pr="1"
                          m="1"
                          fontSize="sm"
                          colorScheme="blue"
                          leftIcon={<Icon as={RiPieChartLine} fontSize="16" />}
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
          )}

          <Pagination />
        </Box>
      </Flex>
    </Box>
  );
}
