import { Grid, GridItem } from '@chakra-ui/react';

export function Footer() {
  return (
    <Grid bg="blue.600" p="4" textAlign="center" color="whiteAlpha.800">
      <GridItem>&copy; 2022 - Romaria Fluvial. Todos os direitos reservados.</GridItem>
    </Grid>
  );
}
