import React from 'react';
import { Container, Carousel } from 'react-bootstrap';
import img1 from '../images/img-01.jpg';
import img2 from '../images/img-02.jpg';
import img3 from '../images/img-03.jpg';

const AnimePics = () => (
  <Container className="mt-5">
    <h2 className="text-center mb-4">Anime Pics</h2>
    <Carousel>
      {[img1, img2, img3].map((img, idx) => (
        <Carousel.Item key={idx}>
          <img
            className="d-block w-100"
            src={img}
            alt={`Anime ${idx + 1}`}
            style={{ height: '400px', objectFit: 'cover' }} // Set fixed height
          />
        </Carousel.Item>
      ))}
    </Carousel>
  </Container>
);

export default AnimePics;
