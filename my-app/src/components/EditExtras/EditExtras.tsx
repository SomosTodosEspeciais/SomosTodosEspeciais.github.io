import React, { useEffect, useState } from "react";
import SlideImage from '../../components/SlideImages/SlideImages';
import '../../components/SlideImages/SlideImages.css';
import './EditExtras.css';
import { CarouselProvider } from "pure-react-carousel";
import Pagination from '@mui/material/Pagination';
import { useMediaQuery, Button } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { db } from '../../Firebase/firebase';
import { getDownloadURL, ref, getStorage, listAll } from "firebase/storage";
import MediaGrid from "../MediaGrid/MediaGrid";
import { collection, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";

interface Extra {
    id: string;
    titulo: string;
    imagens: { url: string; type: 'image' | 'video'; url_original: string }[];
    descricao: string;
    pasta: string;
}

interface Extra_Data {
    id: string;
    titulo: string;
    imagens: string[];
    descricao: string;
    pasta: string;
}

const EditExtras = () => {
    const [extra, setExtra] = useState<Extra[]>([]);
    const [selectExtra, setSelectedExtra] = useState<Extra>({
        id: "",
        titulo: "",
        imagens: [],
        descricao: "",
        pasta: "",
    });
    const [tema, setTema] = useState<string>("");
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    function extractFileNameFromUrl1(url: string): string | null {
        if (!url) return null;

        const regex = /\/([^/]+)$/;
        const match = url.match(regex);
        return match && match[1] ? match[1] : null;
    }

    function extractFileNameFromUrl(url: string): string | null {
        const regex = /\/([^/]+)$/; // Regex para capturar o nome do arquivo após a última barra
        const match = decodeURIComponent(url).match(regex); // Decodifica a URL antes de fazer o match
        return match && match[1] ? match[1] : null;
    }


    useEffect(() => {
        const fetchExtra = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "bastidor"));
                const extrasData: Extra_Data[] = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    titulo: doc.data().titulo,
                    imagens: doc.data().imagens,
                    descricao: doc.data().descricao,
                    pasta: doc.data().pasta
                }));

                const extrasComImagens = await Promise.all(extrasData.map(async (extra_tmp) => {
                    const pasta = extra_tmp.pasta || "";

                    const imagensObjetos: string[] = extra_tmp.imagens;

                    const getFolderFiles = async (folderPath: string): Promise<{ url: string; type: 'image' | 'video'; url_original: string }[]> => {
                        const storage = getStorage();
                        const folderRef = ref(storage, folderPath);
                        const filesList = await listAll(folderRef);
                        const urls = await Promise.all(filesList.items.map(async (item) => {
                            const imageUrl = await getDownloadURL(item);
                            const regex = /[^/]+(?=\?alt=media)/;
                            const match = imageUrl.match(regex);
                            let type: 'image' | 'video' = 'image';
                            let originalUrl: string = "";

                            if (match) {
                                const fileName = match[0];
                                const extension = fileName.split('.').pop()?.toLowerCase();
                                if (extension === 'mp4') {
                                    type = 'video';
                                }
                                for (let i = 0; i < imagensObjetos.length; i++) {
                                    const img_tmp = imagensObjetos[i];


                                    if (extractFileNameFromUrl1(img_tmp) === extractFileNameFromUrl(fileName)) {
                                        originalUrl = img_tmp;
                                        break;
                                    }
                                }
                            }

                            return { url: imageUrl, type: type, url_original: originalUrl };
                        }));
                        return urls;
                    };

                    const imageUrls = await getFolderFiles(pasta);

                    return {
                        id: extra_tmp.id,
                        titulo: extra_tmp.titulo,
                        descricao: extra_tmp.descricao,
                        pasta: extra_tmp.pasta,
                        imagens: imageUrls
                    };
                }));

                setExtra(extrasComImagens);
            } catch (error) {
                console.error("Error fetching extra data:", error);
            }
        };

        fetchExtra();
    }, []);

    const handleRemoveItems = async () => {
        try {
            console.log(selectExtra)
            const docRef = doc(db, "bastidor", selectExtra.id);
            const docSnapshot = await getDoc(docRef);
            const docData = docSnapshot.data();

            if (docSnapshot.exists() && docData && Array.isArray(docData.imagens)) {
                console.log(selectedItems)
                const newImagens = selectExtra.imagens.filter(imagem => !selectedItems.includes(imagem.url_original));
                console.log(newImagens)

                setSelectedExtra(prevState => ({
                    ...prevState,
                    imagens: newImagens,
                }));

                // Atualiza o documento no Firestore
                await updateDoc(docRef, { imagens: newImagens });

                // Atualiza o estado local para refletir a remoção
                setExtra(prevExtra =>
                    prevExtra.map(ex =>
                        ex.id === selectExtra.id
                            ? { ...ex, imagens: newImagens }
                            : ex
                    )
                );

                // Reseta o selectedItems
                setSelectedItems([]);
            } else {
                console.error("Document does not exist or data is undefined: ", selectExtra.id);
            }
        } catch (error) {
            console.error("Erro ao remover itens:", error);
        }
    };


    const isSmallScreen = useMediaQuery('(max-width: 900px)');

    return (
        <div className='EditExtras'>
            <div className="temas">
                {extra.map(({ titulo }, index) => (
                    <div className={"tema " + (titulo === tema ? " selected" : " ")} onClick={() => {
                        setTema(titulo)
                        setSelectedExtra(extra[index])
                    }
                    }
                        key={`${index}`}>
                        <p>{titulo}</p>
                    </div>
                ))}
            </div>

            {extra.map(({ titulo, imagens, descricao }, index) => (
                titulo === tema &&
                <div key={`${index}`} className="imagesGrid">
                    <MediaGrid
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                        mediaItems={imagens}
                        titulo={titulo}
                        descricao={descricao}
                    />
                </div>
            ))}
            {selectedItems.length > 0 &&
                <div className="remove">
                    <Button variant="contained" color="secondary" onClick={handleRemoveItems}>
                        Remover Selecionados
                    </Button>

                </div>
            }
            {selectedItems.length === 0 && selectExtra.titulo != "" &&
                <div className="remove">
                    
                    Seleciona Imagens

                </div>
            }

            {selectedItems.length === 0 && selectExtra.titulo === "" &&
                <div className="remove">
                    Seleciona um tema
                </div>
            }

        </div>
    );
};

export default EditExtras;

