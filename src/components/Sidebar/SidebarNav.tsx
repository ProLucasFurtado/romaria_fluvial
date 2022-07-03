import { Stack, Tooltip, Link as ChakraLink, Icon, Text } from '@chakra-ui/react';
import { RiBookmark3Line, RiDashboardLine, RiFileList2Line, RiFileUserLine, RiLogoutBoxLine, RiPantoneLine } from 'react-icons/ri';
import { NavLink } from './NavLink';
import { signOut } from 'next-auth/react';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

export function SidebarNav({ color }: any) {
  const { menuOpen } = useContext(UserContext);

  async function logout() {
    await signOut();
  }

  return (
    <Stack spacing="4" mt="8" align="stretch">
      <NavLink label="Fazer reserva" url="/reserva/create" icon={RiBookmark3Line} color={color} />
      <NavLink label="Comprar ingresso" url="/ingresso" icon={RiFileList2Line} color={color} />
      {/* <NavLink label="Usuários" url="/users" icon={RiFileUserLine} color={color} />
      <NavLink label="Carteiras" url="/carteiras" icon={RiPantoneLine} color={color} />
      <button onClick={() => logout()}>
        <ChakraLink display="flex" color={color}>
          <Icon as={RiLogoutBoxLine} fontSize="20" />
          {menuOpen && (
            <Text ml="4" fontWeight="medium">
              Sair
            </Text>
          )}
        </ChakraLink>
      </button> */}
    </Stack>
  );
}
