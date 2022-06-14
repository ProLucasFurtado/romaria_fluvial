import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import { Sidebar } from '../components/Sidebar';
import { GetStaticProps } from 'next';
import { getPrismicClient } from '../services/prismic';
import * as prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import ImageSlider from '../components/ImageSlider';
import { useRef } from 'react';
import { RiCalendar2Line } from 'react-icons/ri';

type Post = {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  excerpt: string;
  updatedAt: string;
  destaque: boolean;
};

type Banner = {
  description: string;
  image: string;
};

type Oracao = {
  title: string;
  description: string;
  content: string;
};

type Agenda = {
  event: string;
  datestart: string;
  dateend: string;
};

interface PostsProps {
  posts: Post[];
  banners: Banner[];
  oracao: Oracao;
  agenda: Agenda[];
}

export default function Home({ posts, banners, oracao, agenda }: PostsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const newBanners = banners.map((banner: any) => {
    return {
      image: banner.image.url,
    };
  });

  console.log('agenda', agenda);

  return (
    <Box>
      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior={'inside'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text dangerouslySetInnerHTML={{ __html: oracao.content }} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box w={'full'} boxShadow={'xl'} alignContent="center" justifyContent="center" mb={10} bg="blue.600">
        <ImageSlider slides={newBanners} mt="auto" />
      </Box>

      <Flex w="100%" maxWidth={1480} p="6" mx="auto">
        <Sidebar />

        <Box flex="1" borderRadius={8}>
          <Grid templateColumns={['repeat(1, 1fr)', 'repeat(4, 1fr)']} gap={10} mb={20}>
            <GridItem
              w={'full'}
              bg={useColorModeValue('white', 'gray.900')}
              boxShadow={'xl'}
              rounded={'md'}
              alignContent="center"
              justifyContent="center"
              overflow={'hidden'}
            >
              <Link href={`/`}>
                <a>
                  <Box bg={'gray.100'} pos={'relative'}>
                    <Image src="/assets/images/promocao.jpg" width="100%" />
                  </Box>
                </a>
              </Link>
            </GridItem>
            <GridItem
              w={'full'}
              bg={useColorModeValue('white', 'gray.900')}
              boxShadow={'xl'}
              rounded={'md'}
              alignContent="center"
              justifyContent="center"
              overflow={'hidden'}
            >
              <Link href={`/ingresso`}>
                <a>
                  <Box bg={'gray.100'} pos={'relative'}>
                    <Image src="/assets/images/compra_online.jpg" width="100%" />
                  </Box>
                </a>
              </Link>
            </GridItem>
            <GridItem
              w={'full'}
              bg={useColorModeValue('white', 'gray.900')}
              boxShadow={'xl'}
              rounded={'md'}
              alignContent="center"
              justifyContent="center"
              overflow={'hidden'}
            >
              <Link href={`/`}>
                <a>
                  <Box bg={'gray.100'} pos={'relative'}>
                    <Image src="/assets/images/reserva.jpg" width="100%" />
                  </Box>
                </a>
              </Link>
            </GridItem>
            <GridItem
              w={'full'}
              bg={useColorModeValue('white', 'gray.900')}
              boxShadow={'xl'}
              rounded={'md'}
              alignContent="center"
              justifyContent="center"
              overflow={'hidden'}
            >
              <Link href={`/`}>
                <a>
                  <Box bg={'gray.100'} pos={'relative'}>
                    <Image src="/assets/images/cadastro.jpg" width="100%" />
                  </Box>
                </a>
              </Link>
            </GridItem>
          </Grid>

          <Flex mb={20} gap={10} direction={['column', 'row']}>
            <Flex
              w={'full'}
              direction={['column', 'row']}
              bg={useColorModeValue('white', 'gray.900')}
              boxShadow={'xl'}
              rounded={'md'}
              alignContent="center"
              justifyContent="space-between"
              overflow={'hidden'}
            >
              <Box bg={'gray.100'} pos={'relative'} w={['100%', '350px']}>
                <Link href={`/`}>
                  <a>
                    <Image src="assets/images/oracao.jpg" w="100%" />
                  </a>
                </Link>
              </Box>
              <Stack p={6} flex="1">
                <Flex direction="column" justify="flex-end">
                  <Heading color="blue.500" fontSize={'2xl'} fontFamily={'body'} mb="2">
                    Oração do Dia
                  </Heading>
                  <Heading color="gray.700" fontSize={'md'}>
                    {oracao.title}
                  </Heading>
                  <Text color={'gray.500'} mb="4">
                    {oracao.description}
                  </Text>
                  <Flex justify="flex-end">
                    <Button onClick={onOpen} border="0" bg="blue.500" color="blue.50" borderRadius={4} px="4" py="1">
                      Ler mais
                    </Button>
                  </Flex>
                </Flex>
              </Stack>
            </Flex>
            <Flex
              w={'full'}
              direction={['column', 'row']}
              bg={useColorModeValue('white', 'gray.900')}
              boxShadow={'xl'}
              rounded={'md'}
              alignContent="center"
              justifyContent="space-between"
              overflow={'hidden'}
            >
              <Box bg={'gray.100'} pos={'relative'} w={['100%', '350px']}>
                <Link href={`/`}>
                  <a>
                    <Image src="assets/images/agenda-cirio.jpg" w="100%" />
                  </a>
                </Link>
              </Box>
              <Stack p={6} flex="1">
                <Heading color="blue.500" fontSize={'2xl'} fontFamily={'body'} mb="2">
                  Agenda do Círio
                </Heading>

                <Box>
                  {agenda.map((a) => (
                    <Stack mb="2">
                      <Flex>
                        <Icon as={RiCalendar2Line} color="gray.500" mr="2" />
                        <Heading color="gray.500" fontSize={'sm'}>
                          {a.datestart}
                        </Heading>
                      </Flex>
                      <Heading color="gray.700" fontSize={'md'}>
                        {a.event}
                      </Heading>
                    </Stack>
                  ))}
                  <Flex justify="flex-end">
                    <Box bg="blue.500" color="blue.50" borderRadius={4} px="4" py="1">
                      <Link href="/posts">
                        <a>Ver todos</a>
                      </Link>
                    </Box>
                  </Flex>
                </Box>
              </Stack>
            </Flex>
          </Flex>

          <Breadcrumb borderBottom="4px" borderColor="blue.500" color="blue.500" marginBottom={10}>
            <BreadcrumbItem display="flex" justifyContent="space-between">
              <Link href="" passHref>
                {' '}
              </Link>
              <Link href="/posts" passHref>
                <BreadcrumbLink fontSize="3xl">Destaques</BreadcrumbLink>
              </Link>
              <Link href="" passHref>
                {' '}
              </Link>
            </BreadcrumbItem>
          </Breadcrumb>

          <Grid templateColumns={['repeat(1, 1fr)', 'repeat(3, 1fr)']} gap={10} mb={10}>
            {posts.map((post) => (
              <GridItem
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'xl'}
                rounded={'md'}
                alignContent="center"
                justifyContent="center"
                overflow={'hidden'}
              >
                <Link href={`/posts/${post.slug}`}>
                  <a>
                    <Box bg={'gray.100'} pos={'relative'}>
                      <Image src={post.image} width="100%" />
                    </Box>
                    <Stack p={6}>
                      <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                        <Text color={'gray.500'}>{post.updatedAt}</Text>
                      </Stack>
                      <Heading color={useColorModeValue('gray.700', 'white')} fontSize={'2xl'} fontFamily={'body'}>
                        {post.title}
                      </Heading>
                      <Text color={'gray.500'}>{post.subtitle}</Text>
                    </Stack>
                  </a>
                </Link>
              </GridItem>
            ))}
          </Grid>

          <Flex align="flex-end" justify="flex-end" mb={20}>
            <Box bg="blue.500" color="blue.50" borderRadius={4} px="8" py="2">
              <Link href="/posts">
                <a>+ posts</a>
              </Link>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const client = getPrismicClient();

  const responsePosts = await client.get({
    predicates: prismic.predicate.at('document.type', 'posts'),
    lang: 'pt-br',
    pageSize: 3,
  });

  const posts = responsePosts.results.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      subtitle: RichText.asText(post.data.subtitle),
      image: post.data.image.url,
      excerpt: post.data.content.find((content: any) => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      destaque: post.data.destaque,
    };
  });

  const responseBanners = await client.get({
    predicates: prismic.predicate.at('document.type', 'banner'),
    lang: 'pt-br',
  });

  const banners = responseBanners.results.map((banner) => {
    return {
      image: banner.data.image,
      description: RichText.asText(banner.data.description),
    };
  });

  const responseOracao = await client.getFirst({
    predicates: prismic.predicate.at('document.type', 'oracao-do-dia'),
    lang: 'pt-br',
  });

  const oracao = {
    title: RichText.asText(responseOracao.data.title),
    description: RichText.asText(responseOracao.data.description),
    date: new Date(responseOracao.data.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
    content: RichText.asHtml(responseOracao.data.content),
  };

  const responseAgenda = await client.get({
    predicates: prismic.predicate.at('document.type', 'agenda-do-cirio'),
    lang: 'pt-br',
    pageSize: 3,
  });

  const agenda = responseAgenda.results.map((post) => {
    return {
      event: RichText.asText(post.data.event),
      datestart: new Date(post.data.datestart).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      dateend: new Date(post.data.dateend).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  });

  return {
    props: {
      posts,
      banners,
      oracao,
      agenda,
    },
  };
};
