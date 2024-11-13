import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateAnime = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [episodes, setEpisodes] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/api/animes', {
      title,
      genre,
      episodes,
      release_year: releaseYear,
    });
    navigate('/'); // Redirect back to Home
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Create Anime</h3>
        <Form.Group controlId="title" className="mb-3">
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Anime Title"
            required
          />
        </Form.Group>
        <Form.Group controlId="genre" className="mb-3">
          <Form.Control
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Genre"
            required
          />
        </Form.Group>
        <Form.Group controlId="episodes" className="mb-3">
          <Form.Control
            type="text"
            value={episodes}
            onChange={(e) => setEpisodes(e.target.value)}
            placeholder="Episodes"
            required
          />
        </Form.Group>
        <Form.Group controlId="releaseYear" className="mb-3">
          <Form.Control
            type="text"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            placeholder="Release Year"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Create Anime
        </Button>
      </Form>
    </Container>
  );
};

export default CreateAnime;
