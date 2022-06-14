import { Image } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// If you want to use your own Selectors look up the Advancaed Story book examples
const ImageSlider = ({ slides }: any) => {
  return (
    <Carousel infiniteLoop autoPlay interval={7000} transitionTime={2000} width="100%">
      {slides.map((slide: any) => {
        return <Image key={slide.image} src={slide.image} height="100%" maxH="560px" width="100%" />;
      })}
    </Carousel>
  );
};

export default ImageSlider;
