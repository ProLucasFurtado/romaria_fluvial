import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Flex,
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

type PostProps = {
  post: {
    slug: string;
    title: string;
    image: string;
    content: string;
  };
};

export default function Sobre({ post }: PostProps) {
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
              <BreadcrumbLink href="#">{post.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Heading color={useColorModeValue('gray.700', 'white')} fontSize={['3xl', '5xl']} mb="6" mt={['5', '20']} fontFamily={'body'}>
            {post.title}
          </Heading>
          <Box bg={'gray.100'} pos={'relative'}>
            <Image src={post.image} m="auto" w="100%" maxW="400px" mb="10" />
          </Box>
          <Stack>
            <Text dangerouslySetInnerHTML={{ __html: post.content }} />
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const client = getPrismicClient();

  const response = await client.get({
    predicates: prismic.predicate.at('document.type', 'sobre'),
    lang: 'pt-br',
  });

  const data = response.results.map((post) => {
    return {
      title: RichText.asText(post.data.title),
      image: post.data.image.url,
      content: RichText.asHtml(post.data.content),
    };
  });

  const post = data[0];

  return {
    props: {
      post,
    },
  };
};
