import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const AnimePics = () => {
  const animeImages = [
    'path/to/anime1.jpg',
    'path/to/anime2.jpg',
    'path/to/anime3.jpg',
  ];

  return (
    <Container className="mt-5">
      <h2>Anime Pics</h2>
      <Row>
        {animeImages.map((img, index) => (
          <Col key={index} xs={12} sm={6} md={4}>
            <Image src={img} alt={`Anime ${index + 1}`} fluid className="mb-3" />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AnimePics;
