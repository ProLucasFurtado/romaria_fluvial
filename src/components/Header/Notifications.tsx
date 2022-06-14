import { HStack, Icon, Link as ChakraLink, Tooltip, Text, Flex, useBreakpointValue } from '@chakra-ui/react';
import Router from 'next/router';
import { RiChat3Line, RiFileList2Line, RiHome4Line, RiLoginBoxLine, RiLogoutBoxLine, RiNotificationLine, RiShipLine } from 'react-icons/ri';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export function Notifications() {
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  });

  const { data: session } = useSession();

  if (isDrawerSidebar) {
    return false;
  }

  return (
    <HStack spacing={['2', '4']} mx={['6', '8']} px={['6', '8']} color="whiteAlpha.800" borderRightWidth={2} borderColor="whiteAlpha.500">
      <Link href="/" prefetch passHref>
        <ChakraLink>
          <Flex align="center" justify="center">
            <Icon as={RiHome4Line} fontSize="20" />
            <Text fontSize="sm" ml="1">
              Início
            </Text>
          </Flex>
        </ChakraLink>
      </Link>
      <Link href="/sobre" prefetch passHref>
        <ChakraLink>
          <Flex align="center" justify="center">
            <Icon as={RiShipLine} fontSize="20" />
            <Text fontSize="sm" ml="1">
              A Romaria
            </Text>
          </Flex>
        </ChakraLink>
      </Link>
      <Link href="/posts" prefetch passHref>
        <ChakraLink>
          <Flex align="center" justify="center">
            <Icon as={RiFileList2Line} fontSize="20" />
            <Text fontSize="sm" ml="1">
              Posts
            </Text>
          </Flex>
        </ChakraLink>
      </Link>
      {session && (
        <button onClick={() => Router.push('/')}>
          <Tooltip hasArrow label="Notificações" bg="blue.700">
            <ChakraLink>
              <Flex align="center" justify="center">
                <Icon as={RiNotificationLine} fontSize="20" />
                <Text fontSize="sm" ml="1">
                  Notificações
                </Text>
              </Flex>
            </ChakraLink>
          </Tooltip>
        </button>
      )}
      <button onClick={() => Router.push('/')}>
        <Tooltip hasArrow label="Contato" bg="blue.700">
          <ChakraLink>
            <Flex align="center" justify="center">
              <Icon as={RiChat3Line} fontSize="20" />
              <Text fontSize="sm" ml="1">
                Contato
              </Text>
            </Flex>
          </ChakraLink>
        </Tooltip>
      </button>
      {/* {session ? (
        <button onClick={() => signOut()}>
          <Tooltip hasArrow label="Sair" bg="blue.700">
            <ChakraLink>
              <Flex align="center" justify="center">
                <Icon as={RiLogoutBoxLine} fontSize="20" />
                <Text fontSize="sm" ml="1">
                  Sair
                </Text>
              </Flex>
            </ChakraLink>
          </Tooltip>
        </button>
      ) : (
        <button onClick={() => signIn('cognito')}>
          <Tooltip hasArrow label="Entrar" bg="blue.700">
            <ChakraLink>
              <Flex align="center" justify="center">
                <Icon as={RiLoginBoxLine} fontSize="20" />
                <Text fontSize="sm" ml="1">
                  Entrar
                </Text>
              </Flex>
            </ChakraLink>
          </Tooltip>
        </button>
      )} */}
    </HStack>
  );
}
