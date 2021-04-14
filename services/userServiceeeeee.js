import http from './httpService';
import { apiUrl } from '../config.json';
import jwtDecode from 'jwt-decode';

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('favorites');
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem('token');
    return jwtDecode(jwt);
  } catch (err) {
    return null;
  }
}

export async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });

  localStorage.setItem('token', data.token);
  localStorage.setItem('favorites', data.favorites);
}

export function getJwt() {
  return localStorage.getItem('token');
}

export async function toggleFavorites(cardId) {
  try {
    await http.patch(`${apiUrl}/users/toggle-favorites/${cardId}`);
    let action;

    let currentFavorites = JSON.parse(localStorage.getItem('favorites'));

    if (currentFavorites.includes(cardId)) {
      currentFavorites = currentFavorites.filter((favorite) => favorite !== cardId);
      action = 'removed';
    } else {
      currentFavorites.push(cardId);
      action = 'added';
    }

    localStorage.setItem('favorites', JSON.stringify(currentFavorites));

    return action;
  } catch (err) {}
}

export function getFavorites() {
  return localStorage.getItem('favorites');
}

export function getMyFavorites() {
  return http.get(`${apiUrl}/users/get-my-favorites`);
}

const user = {
  login,
  getCurrentUser,
  logout,
  getJwt,
  toggleFavorites,
  getFavorites,
  getMyFavorites
};

export default user;
