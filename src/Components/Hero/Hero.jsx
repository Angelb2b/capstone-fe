import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSession } from '../../middlewares/ProtectedRoutes';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import { getBlogPosts, searchBlogPost } from '../../Store/blogPostsSlice';
import '../MyNav/MyNav.css';

const Hero = () => {
    const [keyword, setKeyword] = useState('');
    const dispatch = useDispatch();
    const session = useSession();
    const actualTheme = useSelector(state => state.theme.theme);
    const maxTextLength = 500; // Definisci la lunghezza massima del testo prima di mostrare il pulsante "Mostra di più"

    const handleInputChange = (e) => {
        setKeyword(e.target.value);

        if (e.target.value.trim() === '') dispatch(getBlogPosts());
    };

    const longText = `
        Cercherò di essere breve, sono un giovane ragazzo di trent'anni che fin da piccolo ha avuto la passione per la grafica,
        il disegno e il design. Con la mia formazione scolastica ho avuto la possibilità di poter studiare tutto ciò e portare
        avanti questa piccola passione. Dopo gli studi universitari ho iniziato a lavorare in un'azienda della zona dove mi occupo
        di creare la grafica per ogni tipo di packaging alimentare. Di tanto in tanto nel tempo libero mi diverto a creare
        locandine, flyer, post per i social e tutto ciò che gira attorno a questo mondo. Venendo al dunque, l'intento di questo
        sito è quello di condividere con voi i miei lavori creati pro bono, vorrei capire cosa ne pensate e ricevere dei feedback
        per poter sapere dove posso migliorare.
        Qui sotto troverete tutti i miei lavori.
        Registrati e fammi sapere cosa ne pensi!
        Angelo.
    `;

    const isTextTooLong = longText.length > maxTextLength;
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <>
            <Carousel
                style={{ width: '100%', height: 'auto', margin: 'auto' }}
                className={actualTheme ? 'light' : 'dark-theme'}
            >
                <Carousel.Item>
                    <img
                        style={{ height: '400px', objectFit: 'cover' }}
                        className="d-block w-100"
                        src="https://res.cloudinary.com/dnnyejoza/image/upload/v1693749362/IMG_2157_Sx_oyemzb.jpg"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        style={{ height: '400px', objectFit: 'cover' }}
                        className="d-block w-100"
                        src="https://res.cloudinary.com/dnnyejoza/image/upload/v1693748170/Ectro_corporate_flyer_copia_ykbgpq.jpg"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        style={{ height: '400px', objectFit: 'cover' }}
                        className="d-block w-100"
                        src="https://res.cloudinary.com/dnnyejoza/image/upload/v1693749361/IMG_2157_dx_copia_ug7wfd.jpg"
                        alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        style={{ height: '400px', objectFit: 'cover' }}
                        className="d-block w-100"
                        src="https://res.cloudinary.com/dnnyejoza/image/upload/v1693748171/Ectro_corporate_flyer_verde_h7l4av.jpg"
                        alt="Fourth slide"
                    />
                </Carousel.Item>
            </Carousel>
            <div className='d-flex gap-2 mt-5 align-center Rowdies'>
                <h4>About of me!</h4>
            </div>
            <div className="text-center">
                <p className='Rowdies'>
                    {isTextTooLong && !showMore ? longText.substring(0, maxTextLength) : longText}
                </p>
            </div>
            <div className="text-center mt-3">
                {isTextTooLong && (
                    <Button
                        variant="outline-info"
                        onClick={toggleShowMore}
                    >
                        {showMore ? 'Mostra meno' : 'Mostra di più'}
                    </Button>
                )}
            </div>
        </>
    );
};

export default Hero;
