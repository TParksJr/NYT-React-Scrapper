import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Search from "./components/Search";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Search />
        <br></br><br></br>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
