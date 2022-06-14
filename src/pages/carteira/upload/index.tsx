import { Box, Button, Divider, Flex, Heading, HStack } from '@chakra-ui/react';
import filesize from 'filesize';
import { uniqueId } from 'lodash';
import { useState } from 'react';
import FileList from '../../../components/FileList';
import { Header } from '../../../components/Header';
import { Sidebar } from '../../../components/Sidebar';
import Upload from '../../../components/Upload';

export default function UploadCarteira() {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

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
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="whiteAlpha.800" p="8">
          <Heading size="lg" fontWeight="normal">
            Nova Carteira
          </Heading>

          <Divider my="6" borderColor="blue.700" />

          <Upload onUpload={handleUpload} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} remove={removeFile} />}

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Button colorScheme="blue">Enviar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
