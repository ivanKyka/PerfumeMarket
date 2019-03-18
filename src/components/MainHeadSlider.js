import React from 'react';
import {Carousel} from 'react-responsive-carousel';
import Image1 from '../resources/image/Dior-Addict-або-Miss-Dior.jpg'
import Image4 from '../resources/image/skyrim-dragon-word-wall.jpg';
import Image3 from '../resources/image/Vybiraem-aromat-dlya-leta.jpg';
import Image2 from '../resources/image/zbytek_top10_714x350.jpg';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default class MainHeadSlider extends React.Component {
    render() {
        let images = [ Image1, Image2, Image3, Image4];
        return(
            <Carousel autoPlay showThumbs={false} infiniteLoop={true} showStatus={false} stopOnHover={false}>
                {images.map((img, index) =>
                    <a href={`/${index}`}>
                        <div key={index}>
                            <img src={img} alt="" style={{height: '450px', width: '100%'}}/>
                        </div>
                    </a>)}
            </Carousel>
        );
    }
}