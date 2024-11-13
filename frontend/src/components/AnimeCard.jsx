// import React, { useEffect, useState } from 'react';
// import AnimeReviews from './AnimeReviews';
// import { Card, ListGroup } from 'react-bootstrap';
// import { fetchReviews } from '../services/api';

// const AnimeCard = ({ anime }) => {
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     const loadReviews = async () => {
//       const reviewsData = await fetchReviews(anime.id);
//       setReviews(reviewsData);
//     };
//     loadReviews();
//   }, [anime.id]);

//   return (
//     <Card className="mb-4 shadow-sm">
//       <Card.Body>
//         <Card.Title className="text-center">{anime.title}</Card.Title>
//         <Card.Text>Genre: {anime.genre}</Card.Text>
//         <Card.Text>Episodes: {anime.episodes}</Card.Text>
//         <Card.Text>Release Year: {anime.release_year}</Card.Text>
//         <AnimeReviews animeId={anime.id} setReviews={setReviews} /> {/* Pass setReviews */}
//         <ListGroup variant="flush" className="mt-3">
//           <h5>Reviews:</h5>
//           {reviews.map((review) => (
//             <ListGroup.Item key={review.id}>
//               <p><strong>User {review.user_id}:</strong> {review.review_text}</p>
//               <p>Rating: {review.rating} / 5</p>
//             </ListGroup.Item>
//           ))}
//         </ListGroup>
//       </Card.Body>
//     </Card>
//   );
// };

// export default AnimeCard;

// src/components/AnimeCard.js
import React, { useEffect, useState } from 'react';
import AnimeReviews from './AnimeReviews';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { fetchReviews } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AnimeCard = ({ anime, onDelete }) => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadReviews = async () => {
      const reviewsData = await fetchReviews(anime.id);
      setReviews(reviewsData);
    };
    loadReviews();
  }, [anime.id]);

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title className="text-center">{anime.title}</Card.Title>
        <Card.Text>Genre: {anime.genre}</Card.Text>
        <Card.Text>Episodes: {anime.episodes}</Card.Text>
        <Card.Text>Release Year: {anime.release_year}</Card.Text>
        <AnimeReviews animeId={anime.id} setReviews={setReviews} /> {/* Pass setReviews */}

        <Button onClick={() => navigate(`/edit-anime/${anime.id}`)} variant="warning" className="me-2">Edit</Button>

        {/* Delete Button */}
        <Button variant="danger" onClick={() => onDelete(anime.id)} className="mt-3">
          Delete Anime
        </Button>

        <ListGroup variant="flush" className="mt-3">
          <h5>Reviews:</h5>
          {reviews.map((review) => (
            <ListGroup.Item key={review.id}>
              <p><strong>User {review.user_id}:</strong> {review.review_text}</p>
              <p>Rating: {review.rating} / 5</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default AnimeCard;
