import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAnimeById, updateAnime } from '../services/api';

const EditAnime = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState({ title: '', genre: '', episodes: '', release_year: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const loadAnime = async () => {
      const animeData = await fetchAnimeById(id);
      setAnime(animeData);
    };
    loadAnime();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnime((prevAnime) => ({ ...prevAnime, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAnime(id, anime);
      navigate('/'); // Redirect back to the Home page after successful edit
    } catch (error) {
      console.error('Error updating anime:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Edit Anime</h3>
        <Form.Group controlId="title" className="mb-3">
          <Form.Control
            type="text"
            name="title"
            value={anime.title}
            onChange={handleChange}
            placeholder="Anime Title"
            required
          />
        </Form.Group>
        <Form.Group controlId="genre" className="mb-3">
          <Form.Control
            type="text"
            name="genre"
            value={anime.genre}
            onChange={handleChange}
            placeholder="Genre"
            required
          />
        </Form.Group>
        <Form.Group controlId="episodes" className="mb-3">
          <Form.Control
            type="text"
            name="episodes"
            value={anime.episodes}
            onChange={handleChange}
            placeholder="Episodes"
            required
          />
        </Form.Group>
        <Form.Group controlId="release_year" className="mb-3">
          <Form.Control
            type="text"
            name="release_year"
            value={anime.release_year}
            onChange={handleChange}
            placeholder="Release Year"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default EditAnime;
