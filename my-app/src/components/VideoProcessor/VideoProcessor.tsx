import React, { useState, useEffect } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from '../../Firebase/firebase';
import { Typography, useMediaQuery, Checkbox } from '@mui/material';
import { VideoPlayer } from "@graphland/react-video-player";

interface Extra {
    id: string;
    titulo: string;
    imagens: { url: string; type: 'image' | 'video'; url_original: string }[];
    descricao: string;
    pasta: string;
}

interface VideoProcessorProps {
    extra: Extra;
    addImageUrlToExtra: (urlOriginal: string[], downloadURL: string[]) => Promise<void>;
}

const VideoProcessor: React.FC<VideoProcessorProps> = ({ extra, addImageUrlToExtra }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [processing, setProcessing] = useState<boolean>(false);
    const [previewUrls, setPreviewUrls] = useState<{ [key: string]: string }>({});
    const isSmallScreen = useMediaQuery('(max-width: 900px)');

    useEffect(() => {
        const urls: { [key: string]: string } = {};

        // Função para adicionar URL de pré-visualização para cada arquivo
        const addPreviewUrl = (file: File, url: string) => {
            setPreviewUrls(prevUrls => ({
                ...prevUrls,
                [file.name]: url
            }));
        };

        // Função auxiliar para verificar se todas as URLs estão prontas
        const checkAndSetPreviewUrls = () => {
            if (Object.keys(urls).length === files.length) {
                setPreviewUrls(urls);
            }
        };

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    addPreviewUrl(file, reader.result); // Adicionar a URL de pré-visualização para este arquivo
                    urls[file.name] = reader.result; // Armazenar a URL de pré-visualização no objeto urls
                    checkAndSetPreviewUrls(); // Verificar e definir as URLs de pré-visualização quando todas estiverem prontas
                }
            };
            reader.readAsDataURL(file);
        });

        // Certifique-se de verificar e definir as URLs de pré-visualização uma última vez
        // Se files.length for inicialmente zero, precisamos garantir que as URLs sejam definidas
        checkAndSetPreviewUrls();

    }, [files]);

    const processVideoFiles = async (files: File[]) => {
        try {
            const storage = getStorage();
            const uploadPromises = files.map(async (file) => {
                const storageRef = ref(storage, `${extra.pasta}/${file.name}`);

                const snapshot = await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(snapshot.ref);

                let url_original: string = `https://storage.googleapis.com/${app.options.storageBucket}`;
                url_original = url_original + `/${extra.pasta}/${file.name}`;

                return { downloadURL, url_original };
            });

            const uploadedFiles = await Promise.all(uploadPromises);

            const downloadURLs = uploadedFiles.map(file => file.downloadURL);
            const urlOriginals = uploadedFiles.map(file => file.url_original);

            await addImageUrlToExtra(downloadURLs, urlOriginals);
        } catch (error) {
            console.error("Error uploading files or updating Firestore:", error);
        } finally {
            setProcessing(false); // Definir processing como false independentemente do resultado
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files || []);
        const newFiles = selectedFiles.filter(file => !files.some(existingFile => existingFile.name === file.name));

        setFiles(prevFiles => [...prevFiles, ...newFiles]);

        event.target.value = ''; // Limpar o input de arquivo para permitir a seleção do mesmo arquivo novamente
    };

    const processFiles = async () => {
        if (files.length === 0) return;

        setProcessing(true);
        await processVideoFiles(files);
        setFiles([]);
        setPreviewUrls({});
    };

    const handleRemoveFiles = () => {
        setFiles([]);
        setPreviewUrls({});
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", justifyContent: "space-between" }}>
            <div>
                <h2>Adicionar Imagem/Video</h2>
                <input
                    style={{ display: 'none' }}
                    id="file-input"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*, video/mp4"
                    multiple
                />
                <label htmlFor="file-input">
                    <Button variant="contained" component="span">
                        Select Files
                    </Button>
                </label>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={processFiles}
                    disabled={files.length === 0 || processing}
                    style={{ marginLeft: '10px' }}
                >
                    {processing ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        'Upload'
                    )}
                </Button>
            </div>

            {Object.keys(previewUrls).length > 0 && (
                <>
                    <h3>Previews:</h3>
                    <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '20px',width:"100%" }}>
                        {files.map((file, index) => (
                            <div key={file.name} style={{ flexBasis: 'calc(25% - 20px)', marginTop: '20px',marginLeft:"1%" }}>
                                {file.type.startsWith('image/') ? (
                                    <img src={previewUrls[file.name]} alt={`Preview ${index}`} style={{ width: isSmallScreen ? 100 : 200, height: isSmallScreen ? 150 : 300 }} />
                                ) : (
                                    <VideoPlayer
                                        key={index}
                                        height={isSmallScreen ? 150 : 300}
                                        isFluid
                                        playbackRates={[0.5, 1, 1.5, 2]}
                                        sources={[{ src: previewUrls[file.name], type: 'video/mp4' }]}
                                        theme="fantasy"
                                        width={isSmallScreen ? 100 : 200}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <Button variant="contained" color="secondary" onClick={handleRemoveFiles} style={{ marginTop: '10px' }}>
                        Limpar
                    </Button>
                </>
            )}
        </div>
    );
};

export default VideoProcessor;
