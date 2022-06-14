import { VStack, UnorderedList, ListItem } from "@chakra-ui/react";
import { CircularProgressbar } from "react-circular-progressbar";
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'

import { FileInfo, Container } from './styles'

const FileList = ({ files, remove }: any) => {
    return (
        <VStack spacing="8">
            <Container>
                <UnorderedList>
                    {files.map((uploadedFile: any) => {
                        return (
                            <ListItem key={uploadedFile.id}>
                                <FileInfo>
                                    <div>
                                        <strong>{uploadedFile.name}</strong>
                                        <span>
                                            {uploadedFile.readableSize}{" "}
                                            <button onClick={() => remove(uploadedFile.id)}>Excluir</button>
                                        </span>
                                    </div>
                                </FileInfo>

                                <div>
                                    {!uploadedFile.uploaded && !uploadedFile.error && (
                                        <CircularProgressbar
                                            styles={{
                                                root: { width: 24 },
                                                path: { stroke: '#7159c1' }
                                            }}
                                            strokeWidth={10}
                                            value={uploadedFile.progress}
                                        />
                                    )}

                                    {uploadedFile.url && (
                                        <a href="/assets/images/logo-direto.png" target="_blank" rel="noopener noreferrer">
                                            <MdLink style={{ marginRight: 8 }} size={24} color='#222' />
                                        </a>
                                    )}

                                    {uploadedFile.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
                                    {uploadedFile.error && <MdError size={24} color="#e57878" />}
                                </div>
                            </ListItem>
                        )
                    })}
                </UnorderedList>
            </Container>
        </VStack >
    );
}

export default FileList;