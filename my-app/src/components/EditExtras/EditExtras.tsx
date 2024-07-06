import React, { useEffect, useState } from "react";
import '../../components/SlideImages/SlideImages.css';
import './EditExtras.css';
import { useMediaQuery, Button, Typography } from '@mui/material';
import { db } from '../../Firebase/firebase';
import { getDownloadURL, ref, getStorage, listAll } from "firebase/storage";
import MediaGrid from "../MediaGrid/MediaGrid";
import { collection, getDocs, updateDoc, doc, getDoc, addDoc } from "firebase/firestore";
import Close from './../../assets/close.png';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { deleteDoc } from 'firebase/firestore';
import ModalExtra from "../ModalExtras/ModalExtras";
import BasicTextFieldOutline from "../BasicTextFieldOutline/BasicTextFieldOutline";
import VideoProcessor from "../VideoProcessor/VideoProcessor";
import { SnackbarKey, SnackbarProvider, closeSnackbar, enqueueSnackbar } from 'notistack';
import ModalConfirm from "../ModalConfirm/ModalConfirm";

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
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModal2, setOpenModal2] = useState<boolean>(false);
    const [newExtra, setNewExtra] = useState<string>("");

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

    const actionErrorInfo = (snackbarId: SnackbarKey | undefined) => (
        <>
            <img src={Close} alt='' className='close-image' onClick={() => { closeSnackbar(snackbarId) }}></img>
        </>
    );
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

                    const getFolderFiles = async (folderPath: string, imagensObjetos: string[]): Promise<{ url: string; type: 'image' | 'video'; url_original: string }[]> => {
                        const storage = getStorage();
                        const folderRef = ref(storage, folderPath);

                        try {
                            // Listar todos os itens na pasta do Storage
                            const filesList = await listAll(folderRef);

                            // Filtrar apenas as imagens que estão na lista do Firestore
                            const filteredFiles = filesList.items.filter(item => {
                                const fileName = item.name;
                                return imagensObjetos.some(img => {
                                    return extractFileNameFromUrl1(img) === fileName
                                });
                            });

                            // Obter os URLs para os arquivos filtrados
                            const urls = await Promise.all(filteredFiles.map(async (item) => {
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
                                    // Encontrar o URL original correspondente no Firestore
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
                        } catch (error) {
                            console.error("Error listing files or fetching URLs:", error);
                            return [];
                        }
                    };

                    const imageUrls = await getFolderFiles(pasta, imagensObjetos);

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

            const docRef = doc(db, "bastidor", selectExtra.id);
            const docSnapshot = await getDoc(docRef);
            const docData = docSnapshot.data();

            if (docSnapshot.exists() && docData && Array.isArray(docData.imagens)) {

                const newImagens = selectExtra.imagens.filter(imagem => !selectedItems.includes(imagem.url_original));


                setSelectedExtra(prevState => ({
                    ...prevState,
                    imagens: newImagens,
                }));

                const urlsOriginais = newImagens.map(imagem => imagem.url_original);

                await updateDoc(docRef, { imagens: urlsOriginais });

                setExtra(prevExtra =>
                    prevExtra.map(ex =>
                        ex.id === selectExtra.id
                            ? { ...ex, imagens: newImagens }
                            : ex
                    )
                );

                setSelectedItems([]);
            } else {
                console.error("Document does not exist or data is undefined: ", selectExtra.id);
            }
        } catch (error) {
            console.error("Erro ao remover itens:", error);
        }
    };

    const handleRemoveTema = async () => {
        try {
            const id = selectExtra.id
            const docRef = doc(db, 'bastidor', id);

            await deleteDoc(docRef);

            setExtra(prevExtra => prevExtra.filter(item => item.id !== id));
            setOpenModal2(false)
        } catch (error) {
            console.error("Erro ao remover tema:", error);
            
        }
    };

    const handleAddTema = async () => {
        const pastas = extra.map(e => e.pasta);
        if (pastas.includes("Bastidores/" + newExtra)) {
            enqueueSnackbar(
                <Typography
                    fontFamily={"Open Sans Variable"}
                    fontWeight={400}
                    fontSize={"14px"}
                    lineHeight={"20.02px"}
                >
                    O título {newExtra} já foi usado no passado ou é usado agora, utiliza outra!
                </Typography>
                , {
                    action: actionErrorInfo,
                    variant: 'error',
                    autoHideDuration: 10000
                });
            setNewExtra("")
            return
        }

        if (newExtra == "") {

            enqueueSnackbar(
                <Typography
                    fontFamily={"Open Sans Variable"}
                    fontWeight={400}
                    fontSize={"14px"}
                    lineHeight={"20.02px"}
                >
                    É necessário ter Titulo
                </Typography>
                , {
                    action: actionErrorInfo,
                    variant: 'error',
                    autoHideDuration: 10000
                });
            
            return

        }

        try {
            const docRef = await addDoc(collection(db, 'bastidor'), {
                titulo: newExtra,
                imagens: [],
                pasta: "Bastidores/" + newExtra,
                descricao: ""
            });

            const newDoc = await getDoc(docRef);
            const newDocData = newDoc.data();

            if (!newDocData) {
                throw new Error("Erro ao obter os dados do novo documento");
            }

            const newTema: Extra = {
                id: newDoc.id,
                titulo: newDocData.titulo,
                imagens: [],
                descricao: newDocData.descricao,
                pasta: newDocData.pasta,
            };

            setExtra([...extra, newTema]);

            closeModal();
            setNewExtra("");
            setSelectedExtra(newTema)
            setTema(newExtra)
        } catch (error: any) {
            console.error("Erro ao adicionar documento:", error);
            throw error;
        }
    };

    const addImageUrlToExtra = async (extraId: string, downloadURLs: string[], urlOriginals: string[]) => {
        try {
            // Adicionando URLs originais às imagens existentes
            const urlsOriginais = selectExtra.imagens.map(imagem => imagem.url_original);
            const newImagens = [...urlsOriginais, ...urlOriginals];
    
            // Referência ao documento no Firestore
            const docRef = doc(db, "bastidor", selectExtra.id);
    
            // Atualizando o documento no Firestore
            await updateDoc(docRef, { imagens: newImagens });
    
            // Processando cada URL e atualizando o estado local
            const newImagensData = downloadURLs.map((downloadURL, index) => {
                const regex = /[^/]+(?=\?alt=media)/;
                const match = downloadURL.match(regex);
                let type: 'image' | 'video' = 'image';
    
                if (match) {
                    const fileName = match[0];
                    const extension = fileName.split('.').pop()?.toLowerCase();
                    if (extension === 'mp4') {
                        type = 'video';
                    }
    
                    return {
                        url: downloadURL,
                        type: type,
                        url_original: urlOriginals[index],
                    };
                }
    
                return undefined;  
            }).filter((item): item is { url: string; type: 'image' | 'video'; url_original: string } => item !== undefined);
    
            setSelectedExtra((prevState: Extra) => ({
                ...prevState,
                imagens: [...prevState.imagens, ...newImagensData],
            }));
    
            setExtra((prevExtra: Extra[]) =>
                prevExtra.map(ex =>
                    ex.id === selectExtra.id
                        ? { ...ex, imagens: [...ex.imagens, ...newImagensData] }
                        : ex
                )
            );
    
        } catch (error) {
            console.error("Erro ao adicionar URL ao documento:", error);
        }
    };


    const closeModal = () => {
        setOpenModal(false);
        setOpenModal2(false);
    };

    const isSmallScreen = useMediaQuery('(max-width: 900px)');

    return (
        <div className='EditExtras'>
            <SnackbarProvider classes={{ root: 'snackbarMaxWidth' }} maxSnack={4} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='info' autoHideDuration={null} hideIconVariant={true} >

                <div className="top-temas">
                    
                    <div className="temas">
                        {extra.map(({ titulo, id }, index) => (
                            <div
                                className={"tema " + (titulo === tema ? " selected" : " ")}
                                onClick={() => {
                                    setTema(titulo);
                                    setSelectedExtra(extra[index]);
                                }}
                                key={id}
                            >
                                <p>{titulo}</p>
                                <img src={Close} alt="" onClick={() => setOpenModal2(true)} />
                            </div>
                        ))}
                    </div>

                    <div className="add-tema">
                        <AddCircleIcon sx={{ fontSize: "70px", marginLeft: "25px", cursor: "pointer" }} onClick={() => setOpenModal(true)}></AddCircleIcon>


                    </div>
                </div>

                {extra.map((item, index) => (
                    item.titulo === tema && (
                        <React.Fragment key={`extra-${index}`}>
                            <div className="remove">
                                <VideoProcessor
                                    key={index}
                                    extra={item}
                                    addImageUrlToExtra={(downloadURL, urlOriginal) => addImageUrlToExtra(item.id, downloadURL, urlOriginal)}
                                />
                            </div>
                            <div className="imagesGrid">
                                <MediaGrid
                                    selectedItems={selectedItems}
                                    setSelectedItems={setSelectedItems}
                                    mediaItems={item.imagens}
                                    titulo={item.titulo}
                                    descricao={item.descricao}
                                />
                            </div>
                        </React.Fragment>
                    )
                ))}


                {selectedItems.length > 0 &&
                    <div className="remove">
                        <Button variant="contained" color="secondary" onClick={handleRemoveItems}>
                            Remover Selecionados
                        </Button>

                    </div>
                }
                {tema == "" &&
                    <div className="remove">

                        Seleciona um Tema

                    </div>
                }


                {openModal &&

                    <ModalExtra

                        showButtons={false}
                        onClose={closeModal}
                        addTema={handleAddTema}
                        titulo={""}
                        height={""}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

                                <BasicTextFieldOutline label={"Titulo do Bastidor"} value={newExtra} set={setNewExtra}></BasicTextFieldOutline>

                            </div>

                           
                        </div>

                    </ModalExtra>
                }

                {openModal2 &&

                    <ModalConfirm

                        showButtons={false}
                        onClose={closeModal}
                        deleteTema={handleRemoveTema}
                        titulo={""}
                        height={""}>
                        <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>

                            <p>Vais querer realmente apagar o Bastidor <strong>{selectExtra.titulo}</strong> </p>
                        </div>

                    </ModalConfirm>
                }
            </SnackbarProvider>
        </div>

    );
};

export default EditExtras;

