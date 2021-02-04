import React from "react";
import PageHeader from "./common/pageHeader";
import Joi from "joi-browser";
import Form from "./common/form";
// import http from "../services/httpservice";
// import { apiUrl } from "../config.json";
// // import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
// import userService from "../services/userService";
// import { Redirect } from "react-router-dom";
import cardService from "../services/cardService";
import { Link } from "react-router-dom";

class CreateCard extends Form {
  state = {
    data: {
      bizName: "",
      bizDescription: "",
      bizAddress: "",
      bizPhone: "",
      bizImage: "",
    },
    errors: {},
  };

  schema = {
    bizName: Joi.string().min(2).max(255).required(),
    bizDescription: Joi.string().min(2).max(1024).required(),
    bizAddress: Joi.string().min(2).max(400).required(),
    bizPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    bizImage: Joi.string().min(11).max(1024).uri().allow(""),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    if (!data.bizImage) {
      delete data.bizImage;
    }
    await cardService.createCard(data);
    toast(`Your Card ${data.bizName} is created`);
    this.props.history.replace("/my-cards");
  };

  render() {
    return (
      <div className="container">
        <PageHeader titleText="Create your Card Form" />
        <div className="row">
          <div className="col-12">
            <p>Fill your business card details here!</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput("bizName", "Name")}
              {this.renderInput("bizDescription", "Description")}
              {this.renderInput("bizAddress", "Address")}
              {this.renderInput("bizPhone", "Phone")}
              {this.renderInput("bizImage", "Image")}
              {this.renderButton("Create Card")}
              <Link className="btn btn-danger ml-2" to="/my-cards">
                Take me Back!
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateCard;
