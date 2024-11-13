import React, { useState, useEffect } from 'react';
import { postReview } from '../services/api';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { fetchReviews } from '../services/api';

const AnimeReviews = ({ animeId, setReviews }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [averageRating, setAverageRating] = useState(0);

  // Fetch reviews using the imported fetchReviews function
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const reviewsData = await fetchReviews(animeId);
        setReviews(reviewsData); // Update state with the list of reviews        
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    loadReviews();
  }, [animeId, setReviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get userId from localStorage
    const userId = localStorage.getItem('userId');
      
    // If userId is not found, show error message
    if (!userId) {
      setErrorMessage('You must be logged in to submit a review');
      return;
    }

    //const userId = 1; // Replace with actual logged-in user ID or retrieve it from context
    try {
      const response = await postReview(animeId, userId, reviewText, rating);

      if (response) {
        // Clear the form fields
        setReviewText('');
        setRating(1);
        setErrorMessage('');

        // Update the UI with the new review and average rating
        setAverageRating(response.average_rating);

        // Add the new review to the list
        setReviews((prevReviews) => [...prevReviews, {
          id: response.id,
          review_text: response.review_text,
          rating: response.rating,
          user_id: response.user_id,
        }]);
      } else {
        setErrorMessage('There was an error submitting your review. Please try again later');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setErrorMessage('There was an error submitting your review. Please try again later');
    }
  };

  return (
    <div>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <Form onSubmit={handleSubmit} className="mt-3">
        <FloatingLabel controlId="reviewText" label="Write your review" className="mb-3">
          <Form.Control
            as="textarea"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review"
            style={{ height: '100px' }}
            required
          />
        </FloatingLabel>
        <Form.Group controlId="rating" className="mb-3">
          <Form.Label>Rating:</Form.Label>
          <Form.Select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>{star}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Submit Review
        </Button>
      </Form>

      {averageRating > 0 && <div className="mt-3">Average Rating: {averageRating}</div>}
    </div>
  );
};

export default AnimeReviews;
