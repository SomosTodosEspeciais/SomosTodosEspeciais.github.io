import React, { useState, useEffect } from 'react';
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { Button } from '@mui/material';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {app} from '../../Firebase/firebase';

interface Extra {
    id: string;
    titulo: string;
    imagens: { url: string; type: 'image' | 'video'; url_original: string }[];
    descricao: string;
    pasta: string;
}

interface VideoProcessorProps {
    extra: Extra;
    addImageUrl: (urlOriginal: any, downloadURL: string) => Promise<void>;
}

const VideoProcessor: React.FC<VideoProcessorProps> = ({ extra, addImageUrl }) => {
    const [file, setFile] = useState<File | null>(null);
    const [processing, setProcessing] = useState<boolean>(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (file && file.type.startsWith('video/')) {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    setPreviewUrl(reader.result);
                }
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl(null);
        }
    }, [file]);

    const processVideoFile = async (file: File) => {
        try {
            const storage = getStorage();
            const storageRef = ref(storage, `${extra.pasta}/${file.name}`);

            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            let url_original: string = `https://storage.googleapis.com/${app.options.storageBucket}`;
            url_original = url_original + `/${extra.pasta}/${file.name}`;

            await addImageUrl(downloadURL, url_original);
        } catch (error) {
            console.error("Error uploading file or updating Firestore:", error);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
        // Limpar o input de arquivo para permitir selecionar o mesmo arquivo novamente
        event.target.value = '';
    };

    const processFile = async () => {
        if (!file) return;

        setProcessing(true);
        await processVideoFile(file);
        setFile(null);
        setProcessing(false);
    };

    const handleRemoveFile = () => {
        setFile(null);
        setPreviewUrl(null);
    };

    return (
        <div style={{ display: "flex",alignItems:"center",gap:"85px",justifyContent:"space-between" }}>

            <div>
                <h2>Adicionar Imagem/Video</h2>
                <input
                    style={{ display: 'none' }}
                    id="file-input"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*, video/mp4"
                />
                <label htmlFor="file-input">
                    <Button variant="contained" component="span">
                        Select File
                    </Button>
                </label>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={processFile}
                    disabled={!file || processing}
                    style={{ marginLeft: '10px' }}
                >
                    {processing ? 'Processing...' : 'Upload'}
                </Button>
            </div>

            {file && (
                <div style={{ marginTop: '20px' }}>
                    {previewUrl && (
                        <div style={{ marginTop: '20px' }}>
                            <h3>Preview:</h3>
                            {file.type.startsWith('image/') ? (
                                <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                            ) : (
                                <video controls style={{ maxWidth: '100%', maxHeight: '300px' }}>
                                    <source src={previewUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>
                    )}
                    <Button variant="contained" color="secondary" onClick={handleRemoveFile} style={{ marginTop: '10px' }}>
                        Limpar
                    </Button>
                </div>
            )}
        </div>
    );
};

export default VideoProcessor;
