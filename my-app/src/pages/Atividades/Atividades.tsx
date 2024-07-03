import React, { useEffect, useState } from "react";
import SlideImages from '../../components/SlideImages/SlideImages';
import './Atividades.css';
import { CarouselProvider } from "pure-react-carousel";
import Pagination from '@mui/material/Pagination';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../Firebase/firebase';
import { getDownloadURL, ref, getStorage, listAll } from "firebase/storage";

interface Atividade {
    titulo: string;
    imagens: { url: string, type: 'image' | 'video' }[];
    descricao: string;
    pasta: string;
}

const Atividades = () => {
    const [atividades, setAtividades] = useState<Atividade[]>([]);
    const [paginasTotal, setPaginasTotal] = useState<number>(1);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [showAtividades, setShowAtividades] = useState<Atividade[]>([]);
    const atividadesPorPagina = 2;

    useEffect(() => {
        const fetchAtividades = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "atividades"));
                const atividadesData = querySnapshot.docs.map(doc => doc.data() as Atividade);

                const atividadesComImagens = await Promise.all(atividadesData.map(async (atividade) => {
                    const pasta = atividade.pasta;

                    const getFolderFiles = async (folderPath: string): Promise<{ url: string, type: 'image' | 'video' }[]> => {
                        const storage = getStorage();
                        const folderRef = ref(storage, folderPath);
                        const filesList = await listAll(folderRef);
                        const urls = await Promise.all(filesList.items.map(async (item) => {
                            const imageUrl = await getDownloadURL(item);
                            const regex = /[^/]+(?=\?alt=media)/;
                            const match = imageUrl.match(regex);
                            let type: 'image' | 'video' = 'image'; // Default to 'image'

                            if (match) {
                                const fileName = match[0];
                                const extension = fileName.split('.').pop()?.toLowerCase();
                                if (extension === 'mp4') {
                                    type = 'video';
                                }
                            }

                            return { url: imageUrl, type };
                        }));
                        return urls;

                    };


                    const imageUrls = await getFolderFiles(pasta);

                    return {
                        ...atividade,
                        imagens: imageUrls
                    };
                }));
                console.log(atividadesComImagens)
                setAtividades(atividadesComImagens);
                setShowAtividades(atividadesComImagens.slice(0, atividadesPorPagina));
                setPaginasTotal(Math.ceil(atividadesComImagens.length / atividadesPorPagina));
            } catch (error) {

            }
        };

        fetchAtividades();
    }, []);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageIndex(value);
        const startIndex = (value - 1) * atividadesPorPagina;
        const endIndex = startIndex + atividadesPorPagina;
        setShowAtividades(atividades.slice(startIndex, endIndex));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {atividades && atividades.length > 0 && (
                <div className='Atividades'>
                    <div className='header'>
                        <h1>Atividades</h1>
                    </div>
                    {showAtividades.map(({ titulo, imagens, descricao }, index) => (
                        <div key={`${pageIndex}-${index}`}>
                            <CarouselProvider
                                key={`${titulo}-${index}`}
                                visibleSlides={1}
                                totalSlides={imagens.length}
                                naturalSlideWidth={200}
                                naturalSlideHeight={200}
                                interval={3000}
                                infinite={true}
                            >
                                <SlideImages images={imagens} titulo={titulo} descricao={descricao} />
                            </CarouselProvider>
                        </div>
                    ))}
                    {paginasTotal > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '10px', paddingTop: '10px' }}>
                            <Pagination count={paginasTotal} page={pageIndex} onChange={handleChange} size="large" />
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Atividades;
