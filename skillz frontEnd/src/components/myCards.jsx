import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import cardService from "../services/cardService";
import Card from "./card";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

class MyCards extends Component {
  state = {
    cards: [],
    bizName: "",
    filterCard: [],
  };

  // Search = (e) => {
  //   this.setState({ search: e.target.value });
  // };

  filterCards = (e) => {
    if (this.state.cards.length > 0) {
      let event = e.target.value;
      let filter = this.state.cards.filter((card) => {
        return card.bizName.toLowerCase().includes(event.toLowerCase());
      });
      this.setState({ filterCard: filter });
    }
  };

  async componentDidMount() {
    const { data } = await cardService.getMyCards();

    if (data.length > 0) this.setState({ cards: data });
  }

  cardDeleteHandler = (cardId, e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure that you want to delete this card?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#999",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let cards = [...this.state.cards];
        cards = cards.filter((card) => card._id !== cardId);

        this.setState({ cards });
        await cardService.deleteCard(cardId);

        Swal.fire("Deleted!", "Your card has been deleted.", "success");
      }
    });
  };

  render() {
    const { cards } = this.state;

    return (
      <React.Fragment>
        <PageHeader
          title={"My Cards Page"}
          description={"Your cards in the list below..."}
        />

        <div className="container">
          <div className="row">
            <div className="col-12">
              <Link to="create-card" className="btn btn-primary">
                <i className="fas fa-plus-circle mr-1"></i> Create a new card
              </Link>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            {cards.length > 0 &&
              cards.map((card) => (
                <Card
                  key={card._id}
                  card={card}
                  myCard={true}
                  deleted={this.cardDeleteHandler}
                />
              ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MyCards;
