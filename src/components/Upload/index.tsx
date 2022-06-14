import {
    SimpleGrid,
    VStack,
} from "@chakra-ui/react";

import { DropContainer, UploadMessage } from './styles'

import Dropzone from "react-dropzone";

export default function Upload({ onUpload }: any) {
    const renderDragMessage = (isDragActive: any, isDragReject: any) => {
        if (!isDragActive) {
            return <UploadMessage>Clique ou arraste arquivos aqui</UploadMessage>
        }

        if (isDragReject) {
            return <UploadMessage type="error">Arquivo não suportado</UploadMessage>
        }

        return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>
    }

    return (
        <>
            <VStack spacing="8">
                <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                    <Dropzone multiple={false} onDropAccepted={onUpload}>
                        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                            <DropContainer {...getRootProps()} isDragActive={isDragActive} isDragReject={isDragReject}>
                                <input {...getInputProps()} />

                                {renderDragMessage(isDragActive, isDragReject)}
                            </DropContainer>
                        )}
                    </Dropzone>
                </SimpleGrid>
            </VStack>
        </>
    )
}