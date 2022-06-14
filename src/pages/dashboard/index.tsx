import { Box, Flex, SimpleGrid, Text, theme, useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useContext, useRef } from 'react';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { UserContext } from '../../contexts/UserContext';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.blue[600],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.blue[600],
    },
    axisTicks: {
      color: theme.colors.blue[600],
    },
    categories: [
      '2022-05-14T00:00:00.000Z',
      '2022-05-15T00:00:00.000Z',
      '2022-05-16T00:00:00.000Z',
      '2022-05-17T00:00:00.000Z',
      '2022-05-18T00:00:00.000Z',
      '2022-05-19T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [{ name: 'series1', data: [10, 35, 20, 57, 15, 33] }];
const series2 = [{ name: 'series2', data: [40, 25, 10, 75, 55, 80] }];

export default function Dashboard() {
  const { menuOpen } = useContext(UserContext);
  const btnRef = useRef();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex direction="column" h="100vh">
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px">
          <Box p={['6', '8']} bg="whiteAlpha.800" borderRadius={8}>
            <Text fontSize="lg" mb="4" color="blue.900">
              Carteiras
            </Text>
            <Box>
              <Chart options={options} series={series} type="area" height={200} width="100%" />
            </Box>
          </Box>
          <Box p={['6', '8']} bg="whiteAlpha.800" borderRadius={8}>
            <Text fontSize="lg" mb="4" color="blue.900">
              Cenários
            </Text>
            <Box>
              <Chart options={options} series={series2} type="area" height={200} />
            </Box>
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
