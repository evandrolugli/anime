import React, { useEffect, useState } from 'react';
import AnimeCard from '../components/AnimeCard';
import { fetchAnimes } from '../services/api';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = ({ user, onLogout }) => {
  const [animes, setAnimes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAnimes = async () => {
      const animes = await fetchAnimes();
      setAnimes(animes);
    };
    loadAnimes();
  }, []);

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Anime List</h1>
        <h5>Hi, {user ? user.username : 'Guest'}</h5>
        <div>
          <Button onClick={() => navigate('/create-anime')} className="me-2">Create Anime</Button>
          <Button onClick={onLogout}>Logout</Button>
        </div>
      </div>
      <Row>
        {animes.map(anime => (
          <Col key={anime.id} xs={12} sm={6} md={4} lg={3}>
            <AnimeCard anime={anime} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;