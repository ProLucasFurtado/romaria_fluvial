import { extendTheme } from '@chakra-ui/react';

import 'react-circular-progressbar/dist/styles.css';

export const theme = extendTheme({
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: {
      body: {
        bg: 'blue.50',
        color: 'gray.900',
        width: '100%',
      },
    },
  },
});
