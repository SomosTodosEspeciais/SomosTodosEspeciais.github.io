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
    const isSmallScreen = useMediaQuery('(max-width: 900px)');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files || []);
        const newFiles = selectedFiles.filter(file => !files.some(existingFile => existingFile.name === file.name));

        setFiles(prevFiles => [...prevFiles, ...newFiles]);

        event.target.value = ''; // Limpar o input de arquivo para permitir a seleção do mesmo arquivo novamente
    };

    const processFiles = async () => {
        if (files.length === 0) return;

        setProcessing(true);

        try {
            const storage = getStorage();
            const uploadPromises = files.map(async (file) => {
                const storageRef = ref(storage, `${extra.pasta}/${file.name}`);
                const snapshot = await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(snapshot.ref);

                let url_original: string = `https://storage.googleapis.com/${app.options.storageBucket}/${extra.pasta}/${file.name}`;

                return { downloadURL, url_original };
            });

            const uploadedFiles = await Promise.all(uploadPromises);

            const downloadURLs = uploadedFiles.map(file => file.downloadURL);
            const urlOriginals = uploadedFiles.map(file => file.url_original);

            await addImageUrlToExtra(downloadURLs, urlOriginals);
        } catch (error) {
            console.error("Error uploading files or updating Firestore:", error);
        } finally {
            setProcessing(false);
            setFiles([]); // Limpar os arquivos depois de processados
        }
    };

    const handleRemoveFiles = () => {
        setFiles([]);
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

            {files.length > 0 && (
                <>
                    <h3>Previews:</h3>
                    <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {files.map((file, index) => (
                            <div className="media-item" key={file.name}>
                                {file.type.startsWith('image/') ? (
                                    <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} style={{ width: isSmallScreen ? 150 : 300, height: isSmallScreen ? 150 : 300 }} />
                                ) : (
                                    <VideoPlayer
                                        height={isSmallScreen ? 150 : 300}
                                        isFluid
                                        playbackRates={[0.5, 1, 1.5, 2]}
                                        sources={[{ src: URL.createObjectURL(file), type: 'video/mp4' }]}
                                        theme="fantasy"
                                        width={isSmallScreen ? 150 : 300}
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
