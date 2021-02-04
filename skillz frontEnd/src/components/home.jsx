import React, { Component } from "react";
import PageHeader from "./common/pageHeader";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <PageHeader titleText="Welcome!" />

        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-12">
            <p className="opening">
              <br /> here at Skillz can create an account and join millions of
              skillful people <br /> that have already decided to have a
              comfortable and advanced way of showing off their businesses
              around the web. <br />
              we will be happy to assist you in any topic or a question. <br />
              <br />
              <br />
              <br />
              <b>skillz away!</b>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
