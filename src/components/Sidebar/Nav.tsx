import { Stack, Link as ChakraLink, Icon, Text } from '@chakra-ui/react';
import { RiChat3Line, RiFileList2Line, RiHome4Line, RiLoginBoxLine, RiLogoutBoxLine, RiNotificationLine, RiShipLine } from 'react-icons/ri';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { NavDrawer } from './NavDrawer';

export function Nav({ color }: any) {
  const { data: session } = useSession();

  const { menuOpen } = useContext(UserContext);

  async function logout() {
    await signOut();
  }

  return (
    <Stack spacing="4" mt="8" align="stretch">
      <NavDrawer label="Inínio" url="/" icon={RiHome4Line} color={color} />
      <NavDrawer label="A Romaria" url="/sobre" icon={RiShipLine} color={color} />
      <NavDrawer label="Posts" url="/posts" icon={RiFileList2Line} color={color} />
      {session && <NavDrawer label="Notificações" url="/users" icon={RiNotificationLine} color={color} />}
      <NavDrawer label="Contato" url="/contato" icon={RiChat3Line} color={color} />
    </Stack>
  );
}
