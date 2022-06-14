import { Avatar, Box, Flex, Text, Menu, MenuButton, MenuList, MenuItem, Icon } from '@chakra-ui/react';
import { RiFileList2Line, RiLogoutBoxLine, RiProfileLine } from 'react-icons/ri';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { data: session } = useSession();

  return (
    <Flex align="center" justify="flex-end">
      {showProfileData && (
        <Box mr="2">
          {session?.user?.name && <Text>{session?.user?.name}</Text>}
          <Text color="whiteAlpha.800" fontSize="small">
            {session?.user?.email}
          </Text>
        </Box>
      )}

      <Menu>
        <MenuButton>
          <Avatar
            size="md"
            name={session?.user?.name ? session?.user?.name : session?.user?.email?.split('')[0]}
            color="whiteAlpha.800"
            bgColor="blue.600"
            borderColor="whiteAlpha.800"
            border="1px"
          />
        </MenuButton>
        <MenuList>
          {!session ? (
            <MenuItem onClick={() => signIn('cognito')}>
              <Icon as={RiLogoutBoxLine} /> Entrar
            </MenuItem>
          ) : (
            <>
              <MenuItem>
                <Icon as={RiProfileLine} /> Meus dados
              </MenuItem>
              <MenuItem>
                <Link href="/reserva/create">
                  <a>
                    <Icon as={RiProfileLine} /> Fazer reserva
                  </a>
                </Link>
              </MenuItem>
              <MenuItem>
                <Icon as={RiFileList2Line} /> Comprar ingresso
              </MenuItem>
              <MenuItem onClick={() => signOut()}>
                <Icon as={RiLogoutBoxLine} /> Sair
              </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
    </Flex>
  );
}
