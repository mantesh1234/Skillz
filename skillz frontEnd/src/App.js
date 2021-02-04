import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import About from "./components/about";
import { Switch, Route } from "react-router-dom";
import signUp from "./components/SignUp";
import LogOut from "./components/logOut";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import signIn from "./components/signIn";
import userService from "./services/userService";
import BizsignUp from "./components/bizSignup";
import CreateCard from "./components/createCard";
import EditCard from "./components/editCard";
import ProtectedRoute from "./components/common/protectedRoute";
import MyCards from "./components/myCards";
import browseCards from "./components/browseCards";
import favorites from "./components/favorites";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = userService.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <header>
          <ToastContainer />
          <Navbar user={user} />
        </header>

        <main className="minh-900">
          <Switch>
            <ProtectedRoute
              path="/my-cards/edit/:id"
              component={EditCard}
              biz={true}
            />
            <ProtectedRoute path="/my-cards" component={MyCards} />
            <ProtectedRoute
              path="/create-Card"
              component={CreateCard}
              biz={true}
            />
            <ProtectedRoute path="/cards" component={browseCards} />
            <ProtectedRoute path="/favorites" component={favorites} />

            <Route path="/biz-signup" component={BizsignUp} />
            <Route path="/logOut" component={LogOut} />
            <Route path="/SignUp" component={signUp} />
            <Route path="/signIn" component={signIn} />
            <Route path="/about" component={About} />
            <Route path="/" exact component={Home} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
