import { Box, Button, Checkbox, Divider, Flex, Heading, SimpleGrid, Stack, Text, useBreakpointValue, VStack } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { UserContext } from '../../contexts/UserContext';

export default function Dashboard() {
  const { menuOpen } = useContext(UserContext);
  const { aceite } = useContext(UserContext);
  const [checked, setChecked] = useState(false);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="whiteAlpha.800" p="8">
          <Heading size="lg" fontWeight="normal">
            Termos de aceite
          </Heading>

          <Divider my="6" borderColor="blue.700" />

          <VStack spacing="5">
            <Text fontSize="md">
              Texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto
              texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto
              texto texto texto texto texto texto texto texto texto texto texto texto texto.
            </Text>
            <Text fontSize="md">
              Texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto
              texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto
              texto texto texto texto texto texto texto texto texto texto texto texto texto.
            </Text>
            <Text fontSize="md">
              Texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto
              texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto
              texto texto texto texto texto texto texto texto texto texto texto texto texto.
            </Text>
            <Text fontSize="md">
              Texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto
              texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto
              texto texto texto texto texto texto texto texto texto texto texto texto texto.
            </Text>
          </VStack>
          <Stack spacing={5} direction="column" align="flex-start" mt="10">
            <Checkbox isChecked={checked} onChange={() => setChecked(!checked)} colorScheme="green">
              Declaro que li e concordo com os termos de serviço
            </Checkbox>
            <Button colorScheme="blue" disabled={!checked} onClick={aceite}>
              Enviar
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}
