import axios from 'axios';

export const fetchAnimes = async () => {
  const response = await axios.get(`http://localhost:3001/api/animes`);
  return response.data;
};

export const fetchReviews = async (animeId) => {
  const response = await axios.get(`http://localhost:3001/api/animes/${animeId}/reviews`);
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await axios.post('http://localhost:3001/api/users/login', { email, password });
  return response.data;
};

export const postReview = async (animeId, userId, reviewText, rating) => {
  try {
    const response = await axios.post(`http://localhost:3001/api/animes/${animeId}/reviews`, {
      user_id: userId,
      review_text: reviewText,
      rating,
    });

    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Unexpected response structure');
    }
  } catch (error) {
    console.error('Error posting review:', error);
    throw new Error('Error posting review');
  }
};