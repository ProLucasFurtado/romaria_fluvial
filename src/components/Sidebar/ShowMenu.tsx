import { Tooltip, Link as ChakraLink, Icon, Text, Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { UserContext } from '../../contexts/UserContext';

export function ShowMenu() {
  const { menuOpen, modifyMenu } = useContext(UserContext);

  return (
    <>
      {menuOpen ? (
        <Tooltip hasArrow label="Recolher" bg="blue.700">
          <ChakraLink>
            <Flex onClick={modifyMenu} bgGradient="linear(to-r, gray.200, gray.100)" p="1" borderRadius={5}>
              <Icon as={RiArrowLeftSLine} fontSize="20" fontWeight="bold" color="gray.400" />
            </Flex>
          </ChakraLink>
        </Tooltip>
      ) : (
        <Tooltip hasArrow label="Expandir" bg="blue.700">
          <ChakraLink>
            <Flex onClick={modifyMenu} bg="gray.200" p="1" borderRadius={5}>
              <Icon as={RiArrowRightSLine} fontSize="20" fontWeight="bold" color="gray.400" onClick={modifyMenu} />
            </Flex>
          </ChakraLink>
        </Tooltip>
      )}
    </>
  );
}
