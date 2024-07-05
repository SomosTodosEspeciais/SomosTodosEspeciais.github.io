import React, { useEffect, useState } from "react";
import SlideImage from '../../components/SlideImages/SlideImages';
import '../../components/SlideImages/SlideImages.css';
import './Extras.css';
import { CarouselProvider } from "pure-react-carousel";
import Pagination from '@mui/material/Pagination';
import { useMediaQuery } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../Firebase/firebase';
import { getDownloadURL, ref, getStorage, listAll } from "firebase/storage";

interface Extra {
    titulo: string;
    imagens: { url: string, type: 'image' | 'video' }[];
    descricao: string;
    pasta: string;
}


const Extras = () => {

    const [extra, setExtra] = useState<Extra[]>([]);
    const [paginasTotal, setPaginasTotal] = useState<number>(1);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [showExtra, setShowExtra] = useState<Extra[]>([]);
    const atividadesPorPagina = 2;

    useEffect(() => {
        AOS.init({
            once: false, // Permitir animações repetidas ao subir na página
        });
        const fetchExtra = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "bastidor"));
                const extrasData = querySnapshot.docs.map(doc => doc.data() as Extra);

                const extrasComImagens = await Promise.all(extrasData.map(async (atividade) => {
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

                setExtra(extrasComImagens);
                setShowExtra(extrasComImagens.slice(0, atividadesPorPagina));
                setPaginasTotal(Math.ceil(extrasComImagens.length / atividadesPorPagina));
            } catch (error) {

            }
        };

        fetchExtra();
    }, []);




    useEffect(() => {
        const startIndex = (pageIndex - 1) * atividadesPorPagina;
        const endIndex = startIndex + atividadesPorPagina;
        setShowExtra(JSON.parse(JSON.stringify(extra.slice(startIndex, endIndex))));
    }, [pageIndex]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageIndex(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const isSmallScreen = useMediaQuery('(max-width: 900px)');


    return (
        <div className='Extras'>
            <div className='header'>
                <h1>Bastidores</h1>
            </div>
            <div className="content">
                <p>Bem vindos aos nossos "bastidores". Um espaço mais informal mas exposto por ser fundamental no, e para, o grupo. Aqui encontrarão a fase de preparação das diversas atividades, assim como momentos de diversão e descontração decorrentes das respetivas ações. Afinal, Todos Somos Especiais é um grupo jovem caracterizado pela sua boa disposição, naturalidade e união, sendo estes alguns dos momentos que o exprimem. ❤️</p>

            </div>
            {showExtra.map(({ titulo, imagens, descricao }, index) => (
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
                        <SlideImage images={imagens} titulo={titulo} descricao={descricao} />
                    </CarouselProvider>
                </div>
            ))}
            {paginasTotal > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '10px', paddingTop: '10px' }}>
                    <Pagination count={paginasTotal} page={pageIndex} onChange={handleChange} size="large" />
                </div>
            )}
            <div className='citation' data-aos={isSmallScreen ? "fade-up" : "fade-right"}>
                <div className='content2'>
                    <p><q>As coisas mais belas são ditadas pela loucra e escritas pela razão</q></p>
                    <p className='author'>- André Gide</p>
                </div>
            </div>
        </div>
    );
};

export default Extras;
