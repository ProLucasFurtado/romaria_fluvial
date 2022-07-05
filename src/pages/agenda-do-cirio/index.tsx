import {
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  Stack,
  Image,
  useDisclosure,
  Text,
  Icon,
} from '@chakra-ui/react';
import Link from 'next/link';
import { RiArrowDropRightLine, RiCalendar2Line } from 'react-icons/ri';
import { Sidebar } from '../../components/Sidebar';
import { GetStaticProps } from 'next';
import { stripe } from '../../services/stripe';
import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { getPrismicClient } from '../../services/prismic';
import * as prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

type Agenda = {
  event: string;
  datestart: string;
  dateend: string;
};

type AgendaProps = {
  agendaTodos: Agenda[];
};

export default function Ingresso({ agendaTodos }: AgendaProps) {
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
              <BreadcrumbLink href="#">Agenda do círio</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Heading color="gray.700" fontSize={['3xl', '5xl']} mb="6" mt={['5', '20']} fontFamily={'body'}>
            Romaria Fluvial 2022
          </Heading>
          <Stack align="center">
            <Box maxW="3xl" overflow="hidden">
              <Image
                src="https://images.prismic.io/romariafluvial/c9ed18a8-d9ee-43f5-9967-0aae1ee3fa7e_post2.jpg?auto=compress,format"
                alt="Calendário Romaria Fluvial"
              />

              {agendaTodos.map((a) => (
                <Stack mb="2" key={a.event}>
                  <Flex justify="flex-start" align="center">
                    <Icon as={RiCalendar2Line} color="gray.500" mr="2" />
                    <Heading color="gray.500" fontSize={'sm'}>
                      {a.datestart}
                    </Heading>
                    {a.dateend && (
                      <Heading color="gray.500" fontSize={'sm'} m="2">
                        a
                      </Heading>
                    )}
                    {a.dateend && (
                      <Heading color="gray.500" fontSize={'sm'}>
                        {a.dateend}
                      </Heading>
                    )}
                  </Flex>
                  <Heading color="gray.700" fontSize={'md'}>
                    {a.event}
                  </Heading>
                </Stack>
              ))}
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const client = getPrismicClient();

  const responseAgendaTodos = await client.get({
    predicates: prismic.predicate.at('document.type', 'agenda-do-cirio'),
    lang: 'pt-br',
    orderings: {
      field: 'my.agenda-do-cirio.datestart',
      direction: 'asc',
    },
  });

  const agendaTodos = responseAgendaTodos.results.map((post) => {
    return {
      event: RichText.asText(post.data.event),
      datestart: new Date(post.data.datestart).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      dateend:
        new Date(post.data.dateend).toLocaleDateString('pt-BR', { year: 'numeric' }) !== '1969' ||
        new Date(post.data.dateend).toLocaleDateString('pt-BR', { year: 'numeric' }) !== '1970'
          ? new Date(post.data.dateend).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          : null,
    };
  });

  return {
    props: {
      agendaTodos,
    },
    revalidate: 60 * 60 * 24 * 100, //100 dias,
  };
};
