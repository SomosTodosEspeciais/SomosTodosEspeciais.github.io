import React, { useState } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { Button } from '@mui/material';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from '../../Firebase/firebase';

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
    const [ffmpeg, setFFmpeg] = useState<FFmpeg | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const loadFFmpeg = async () => {
        if (!ffmpeg) {
            const ffmpegInstance = new FFmpeg();
            await ffmpegInstance.load();
            setFFmpeg(ffmpegInstance);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);

        // Pré-visualização da imagem selecionada
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    setPreviewUrl(reader.result);
                }
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setPreviewUrl(null);
        }
    };

    const processFile = async () => {
        if (!file) return;

        setProcessing(true);
        if (file.type.startsWith('video/')) {
            await processVideoFile(file);
        } else {
            await uploadFile(file);
        }
        setFile(null);
        setPreviewUrl(null);
        setProcessing(false);
    };

    const processVideoFile = async (file: File) => {
        await loadFFmpeg();

        const { name } = file;
        if (ffmpeg) {
            await ffmpeg.writeFile(name, await fetchFile(file));
            await ffmpeg.exec([
                '-i', name,
                '-c:v', 'libx264',
                '-crf', '23',
                '-c:a', 'aac',
                '-strict', 'experimental',
                '-b:a', '192k',
                '-movflags', '+faststart',
                'output.mp4'
            ]);

            const data = await ffmpeg.readFile('output.mp4');
            const videoBlob = new Blob([data], { type: 'video/mp4' });
            await uploadFile(videoBlob);
        }
    };


    const uploadFile = async (fileToUpload: File | Blob) => {
        const storage = getStorage();
        const storageRef = ref(storage, `${extra.pasta}/${fileToUpload instanceof File ? fileToUpload.name : 'output.mp4'}`);

        try {
            const snapshot = await uploadBytes(storageRef, fileToUpload);

            const downloadURL = await getDownloadURL(snapshot.ref);
            let url_original: string = `https://storage.googleapis.com/${app.options.storageBucket}`;
            url_original = url_original + `/${extra.pasta}/${fileToUpload instanceof File ? fileToUpload.name : 'output.mp4'}`
            addImageUrl(downloadURL, url_original);

        } catch (error) {
            console.error("Erro ao fazer upload do arquivo ou atualizar o Firestore:", error);
        }
    };


    return (
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
            {previewUrl && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Preview:</h3>
                    <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                </div>
            )}

        </div>
    );
};

export default VideoProcessor;
