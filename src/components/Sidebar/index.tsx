import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Stack, useBreakpointValue } from '@chakra-ui/react';
import { useContext } from 'react';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import { UserContext } from '../../contexts/UserContext';
import { SidebarNav } from './SidebarNav';
import { ShowMenu } from './ShowMenu';
import { Nav } from './Nav';
import { useSession } from 'next-auth/react';

export function Sidebar() {
  const { isOpen, onClose } = useSidebarDrawer();

  const { data: session } = useSession();

  const { menuOpen, modifyMenu } = useContext(UserContext);

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (isDrawerSidebar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg="gray.300" p="4">
            <DrawerCloseButton mt="6" color="gray.500" />
            {/* <DrawerHeader fontSize="sm" color="gray.400">MENU</DrawerHeader> */}
            <DrawerBody>
              <Nav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return false;

  if (!session) {
    return false;
  }

  return (
    <Box as="aside" w={menuOpen ? '15%' : '4%'}>
      <Stack spacing="12" align="flex-start">
        <Box>
          {!isDrawerSidebar && <ShowMenu />}
          <SidebarNav />
        </Box>
      </Stack>
    </Box>
  );
}
