import { Flex, Icon, Input } from '@chakra-ui/react';
import { RiSearchLine } from 'react-icons/ri';

export function Search() {
  return (
    <Flex as="label" p="4" maxWidth={300} alignSelf="center" color="gray.600" position="relative" bg="whiteAlpha.800" borderRadius="full">
      <Input color="gray.800" variant="unstyled" px="4" mr="4" placeholder="Pesquisar" _placeholder={{ color: 'gray.500' }} />

      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  );
}
