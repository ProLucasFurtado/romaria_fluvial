import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { RiAddLine, RiArrowDropRightLine } from 'react-icons/ri';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { UserContext } from '../../contexts/UserContext';
import { useForm } from 'react-hook-form';
import { GetServerSideProps } from 'next';
import { getPrismicClient } from '../../services/prismic';
import * as prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { getSession } from 'next-auth/react';
import { HeadSite } from '../../components/Head';

type PostProps = {
  post: {
    id: string;
    title: string;
    image: string;
    updatedAt: string;
  };
};

export default function Post({ post }: PostProps) {
  const { menuOpen } = useContext(UserContext);
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

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
                <Link href="/galeria" passHref>
                  <BreadcrumbLink>Galeria</BreadcrumbLink>
                </Link>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#">{post.title}</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>

            <Heading color="gray.700" fontSize={['3xl', '5xl']} mb="6" mt={['5', '20']} fontFamily={'body'}>
              {post.title}
            </Heading>
            <Box bg={'gray.100'} pos={'relative'}>
              <Image src={post.image} m="auto" maxW="100%" />
            </Box>
            <Stack>
              <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                <Text color={'gray.500'}>{post.updatedAt}</Text>
              </Stack>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });
  const { id }: any = params;

  console.log('id', id);

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   };
  // }

  const client = getPrismicClient(req);

  const response = await client.getByID(id, {
    orderings: {
      field: 'document.last_publication_date',
      direction: 'desc',
    },
  });
  console.log('response', response);

  const post = {
    id,
    title: RichText.asText(response.data.title),
    image: response.data.image.url,
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  };

  return {
    props: {
      post,
    },
  };
};
