import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { Sidebar } from '../../components/Sidebar';
import { GetStaticProps } from 'next';
import { getPrismicClient } from '../../services/prismic';
import * as prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

type Post = {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  excerpt: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
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
              <BreadcrumbLink href="#">Posts</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Grid templateColumns={['repeat(1, 1fr)', 'repeat(3, 1fr)']} gap={6}>
            {posts.map((post) => (
              <GridItem
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'xl'}
                rounded={'md'}
                p={6}
                alignContent="center"
                justifyContent="center"
                overflow={'hidden'}
              >
                <Link href={`/posts/${post.slug}`}>
                  <a>
                    <Box bg={'gray.100'} pos={'relative'}>
                      <Image src={post.image} width="100%" />
                    </Box>
                    <Stack>
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

          {/* <Pagination /> */}
        </Box>
      </Flex>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const client = getPrismicClient();

  const response = await client.get({
    predicates: prismic.predicate.at('document.type', 'posts'),
    lang: 'pt-br',
  });

  const posts = response.results.map((post) => {
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
    };
  });

  return {
    props: {
      posts,
    },
  };
};
