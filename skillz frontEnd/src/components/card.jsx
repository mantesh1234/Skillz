import React from "react";
import { Link } from "react-router-dom";
// import './card.module.css';

const Card = (props) => {
  const { card, click, isFavorite, browse, myCard, favorites } = props;

  return (
    <div className="col-md-6 col-lg-4 mt-3">
      <div className="card shadow rounded-3 ">
        <img width="200" src={card.bizImage} alt={card.bizName} />
        <div className="card-body">
          <h5 className="card-title">{card.bizName}</h5>
          <p className="card-text">{card.bizDescription}</p>
          <p className="card-text border-top pt-2">
            <b>Tel: </b>
            {card.bizPhone}
            <br />
            <b>Address: </b>
            {card.bizAddress}
          </p>

          {/* biz number */}
          <p style={{ fontSize: "11px", color: "#aaa" }}>#{card.bizNumber}</p>

          {favorites && (
            <div className="text-center">
              <button className="btn btn-danger p-1 m-1" onClick={click}>
                REMOVE
              </button>
            </div>
          )}

          {browse && (
            <i
              className={isFavorite ? "fas fa-heart" : "far fa-heart"}
              id="favorite"
              style={{ color: "red", cursor: "pointer" }}
              onClick={click}
            ></i>
          )}

          {myCard && (
            <React.Fragment>
              <Link to={`my-cards/edit/${card._id}`}>
                <i className="fas fa-pencil-alt"></i>
              </Link>

              <span className="mx-1"> | </span>

              <span
                style={{ cursor: "pointer" }}
                onClick={(e) => props.deleted(card._id, e)}
              >
                <i className="fas fa-trash-alt" style={{ color: "tomato" }}></i>
              </span>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
