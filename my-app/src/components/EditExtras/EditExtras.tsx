import React, { useEffect, useState } from "react";
import SlideImage from '../../components/SlideImages/SlideImages';
import '../../components/SlideImages/SlideImages.css';
import './EditExtras.css';
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


const EditExtras = () => {

    const [extra, setAtividades] = useState<Extra[]>([]);


    useEffect(() => {

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

                setAtividades(extrasComImagens);

            } catch (error) {

            }
        };

        fetchExtra();
    }, []);


    const isSmallScreen = useMediaQuery('(max-width: 900px)');


    return (
        <div className='EditExtras'>


            {extra.map(({ titulo, imagens, descricao }, index) => (
                <div key={`${index}`}>
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

            <div className='citation' data-aos={isSmallScreen ? "fade-up" : "fade-right"}>
                <div className='content2'>
                    <p><q>As coisas mais belas são ditadas pela loucra e escritas pela razão</q></p>
                    <p className='author'>- André Gide</p>
                </div>
            </div>
        </div>
    );
};

export default EditExtras;
