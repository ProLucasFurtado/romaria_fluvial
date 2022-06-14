import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Input,
  useBreakpointValue,
} from '@chakra-ui/react';
import filesize from 'filesize';
import { uniqueId } from 'lodash';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { RiArrowDropRightLine } from 'react-icons/ri';
import FileList from '../../components/FileList';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import Upload from '../../components/Upload';
import { UserContext } from '../../contexts/UserContext';

export default function UploadCarteira() {
  const { menuOpen } = useContext(UserContext);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const handleUpload = (files: any) => {
    const uploaded = files.map((file: any) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: uploaded,
      carteira: 'carteira1',
    }));

    setUploadedFiles([...uploadedFiles, uploaded[0]]);

    uploaded.forEach();
  };

  const removeFile = (id: number) => {
    const newArray = uploadedFiles.filter((n: any) => n.id !== id);
    setUploadedFiles(newArray);
  };

  return (
    <Box>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="whiteAlpha.800" p="8">
          <Breadcrumb
            bg="gray.100"
            borderRadius={4}
            px="3"
            py="1"
            fontSize="sm"
            marginBottom="6"
            spacing="8px"
            separator={<RiArrowDropRightLine color="gray.500" />}
          >
            <BreadcrumbItem>
              <Link href="/" passHref>
                <BreadcrumbLink>Home</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <Link href="/carteiras" passHref>
                <BreadcrumbLink href="#">Carteiras</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">Nova carteira</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Heading size="lg" fontWeight="normal">
            Nova Carteira
          </Heading>

          <Divider my="6" borderColor="blue.700" />

          <Input placeholder="Informe um nome para a carteira" mb="5" />

          <Upload onUpload={handleUpload} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} remove={removeFile} />}

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/carteiras">
                <Button colorScheme="red" size="sm" fontSize="sm">
                  Cancelar
                </Button>
              </Link>
              <Button colorScheme="green" size="sm" fontSize="sm">
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
