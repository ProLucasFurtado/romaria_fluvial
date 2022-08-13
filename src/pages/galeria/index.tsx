import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Grid, GridItem, Heading, Image, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { Sidebar } from '../../components/Sidebar';
import { GetStaticProps } from 'next';
import { getPrismicClient } from '../../services/prismic';
import * as prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { HeadSite } from '../../components/Head';

type Post = {
  id: string;
  title: string;
  image: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Post[];
}

export default function Galeria({ posts }: PostsProps) {
  console.log('galeria ', posts);

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

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#">Galeria de Fotos</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>

            <Grid templateColumns={['repeat(1, 1fr)', 'repeat(4, 1fr)']} gap={6}>
              {posts.map((post) => (
                <GridItem
                  key={post.id}
                  w={'full'}
                  bg="blue.600"
                  boxShadow={'xl'}
                  rounded={'md'}
                  alignContent="center"
                  justifyContent="center"
                  overflow={'hidden'}
                >
                  <Link href={`/galeria/${post.id}`}>
                    <a>
                      <Box>
                        <Image src={post.image} width="100%" />
                      </Box>
                      <Stack p={6}>
                        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                          <Text color="whiteAlpha.500">{post.updatedAt}</Text>
                        </Stack>
                        <Heading color="whiteAlpha.900" fontSize={'2xl'} fontFamily={'body'}>
                          {post.title}
                        </Heading>
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
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const client = getPrismicClient();

  const response = await client.get({
    predicates: prismic.predicate.at('document.type', 'galeria'),
    lang: 'pt-br',
  });

  const posts = response.results.map((post) => {
    return {
      id: post.id,
      title: RichText.asText(post.data.title),
      image: post.data.image.url,
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
