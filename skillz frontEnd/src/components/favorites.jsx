import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
// import cardService from '../services/cardService';
import userService from "../services/userService";
import Card from "./card";
import Swal from "sweetalert2";

class Favorites extends Component {
  state = {
    cards: [],
    favorites: [],
  };

  async componentDidMount() {
    const { data } = await userService.getMyFavorites();

    if (data.length > 0)
      this.setState({
        cards: data,
        favorites: userService.getFavorites(),
      });
  }

  handleFavoritesClick = async (cardId) => {
    Swal.fire({
      title:
        "Are you sure that you want to remove this card from yopur favorites?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#999",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Remove from server
        await userService.toggleFavorites(cardId);

        // Get new list from local storage
        let favorites = userService.getFavorites();

        // Remove from state
        let { cards } = this.state;
        cards = cards.filter((card) => card._id !== cardId);

        // update the state
        this.setState({ favorites, cards });

        Swal.fire(
          "Removed!",
          "Your card has been removed from your favorites.",
          "success"
        );
      }
    });
  };

  render() {
    const { cards } = this.state;

    return (
      <div className="container">
        <React.Fragment>
          <PageHeader titleText={"Your Favorites"} />
          <p>Here you can view your favorites list!</p>
          <div className="row">
            {cards.length > 0 ? (
              cards.map((card) => (
                <Card
                  key={card._id}
                  card={card}
                  favorites={true}
                  click={() => this.handleFavoritesClick(card._id)}
                />
              ))
            ) : (
              <span className="mt-4 mx-auto">
                You don't have any favorites saved yet!
              </span>
            )}
          </div>
        </React.Fragment>
      </div>
    );
  }
}

export default Favorites;

// not favorite
// <i className='far fa-heart'></i>
// favorite
// <i class="fas fa-heart"></i>
