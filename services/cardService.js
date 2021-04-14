import http from "./httpservice";
import { apiUrl } from "../config.json";
// import MyCards from "../components/myCards";

export function allCards() {
  return http.get(`${apiUrl}/cards`);
}
export function deleteCard(card) {
  const cardId = card._id;
  delete card._id;
  return http.delete(`${apiUrl}/cards/${cardId}`);
}
export function getCard(cardId) {
  return http.get(`${apiUrl}/cards/${cardId}`);
}

export function editCard(card) {
  const cardId = card._id;
  delete card._id;
  return http.put(`${apiUrl}/cards/${cardId}`, card);
}

export function getMyCards() {
  return http.get(`${apiUrl}/cards/my-cards`);
}

export function createCard(card) {
  return http.post(`${apiUrl}/cards`, card);
}

const service = {
  createCard,
  getMyCards,
  editCard,
  getCard,
  deleteCard,
  allCards,
};

export default service;
