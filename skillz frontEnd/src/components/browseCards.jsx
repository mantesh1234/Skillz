import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import cardService from "../services/cardService";
import userService from "../services/userService";
import Card from "./card";
import { toast } from "react-toastify";
// import Favorites from "./favorites";

class BrowseCards extends Component {
  state = {
    cards: [],
    favorites: [],
  };

  async componentDidMount() {
    const { data } = await cardService.allCards();

    if (data.length > 0)
      this.setState({
        cards: data,
        favorites: userService.getFavorites(),
      });
  }

  // Favorites
  handleFavoritesClick = async (cardId) => {
    let action = await userService.toggleFavorites(cardId);
    let favorites = userService.getFavorites();
    this.setState({ favorites });

    toast.success(`Your card was ${action} successfully!`, {
      position: "top-center",
      autoClose: 1500,
    });
  };

  render() {
    const { cards, favorites } = this.state;

    return (
      <div className="container">
        <React.Fragment>
          <PageHeader titleText={"Browse Cards"} />
          <p>
            Here you can view all cards available and save them to your
            favorites list!
          </p>
          <div className="row">
            {/* <p>Here you can view All the cards in skillz</p> */}

            {cards.length > 0 ? (
              cards.map((card) => (
                <Card
                  key={card._id}
                  card={card}
                  browse={true}
                  isFavorite={favorites.includes(card._id)}
                  click={() => this.handleFavoritesClick(card._id)}
                />
              ))
            ) : (
              <span className="mt-4 mx-auto">No cards to show...</span>
            )}
          </div>
        </React.Fragment>
      </div>
    );
  }
}

export default BrowseCards;
