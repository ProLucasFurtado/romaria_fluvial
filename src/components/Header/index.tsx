import { Box, Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';

import { Profile } from './Profile';
import { Notifications } from './Notifications';
import { Search } from './Search';
import { Logo } from './Logo';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import { RiMenuLine } from 'react-icons/ri';
import { useSession } from 'next-auth/react';

export function Header() {
  const { data: session } = useSession();
  const { onOpen } = useSidebarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex as="header" w="100%" m="auto" pt="6" pb="4" align="center" justify="space-between" bg="blue.600" pt="4" px={['2', '8']}>
      {!isWideVersion && (
        <IconButton
          aria-label="Abrir menu"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mt="4"
          mb="auto"
        ></IconButton>
      )}

      <Box>
        <Logo />
      </Box>

      <Flex align="center" justify="flex-end" alignItems="center">
        <Search />
        <Notifications />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}
