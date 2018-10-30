import React, { Component } from 'react';
import './Search.css';
import axios from 'axios';
import Results from '../Results';

require("dotenv").config(); //not working for some reason, need to use this to hide key

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        };
    };

    handleSearch = event => {
        event.preventDefault();

        let searchTerm = document.getElementById("searchTerm").value;
        let numRecords = document.getElementById("numRecords").value;
        let startDate = document.getElementById("startDate").value;
        let endDate = document.getElementById("endDate").value;

        let apiURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + "bfcbfaf5c097425db19434c8ccf73135";
        if (searchTerm) {
            searchTerm = searchTerm.split(" ").join("");
            apiURL += "&q=" + searchTerm;
        };
        if (startDate) {
            startDate = startDate.split("-").join("");
            apiURL += "&begin_date=" + startDate;
        };
        if (endDate) {
            endDate = endDate.split("-").join("");
            apiURL += "&end_date=" + endDate;
        };

        axios.get(apiURL).then(res => {
            let newResults = [];
            for (let i = 0; i < numRecords; i++) {
                newResults.push(res.data.response.docs[i])
            };
            this.setState({
                results: newResults
            });
            console.log(this.state.results);
        });


        
    };

    handleClear = () => {
        this.setState({
            results: []
        });
    };

    handleSave = event => {
        console.log(event.target.value);

        
    }

    render() {
        return (
            <div className="container">
                <br></br>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title"><strong><i className="fa fa-list-alt"></i> Search Parameters</strong></h3>
                        <hr></hr>
                    </div>
                    <div className="panel-body">
                        <form>
                            <div className="form-group">
                                <label for="searchTerm">Search term: </label>
                                <input type="text" className="form-control" name="searchTerm" id="searchTerm"></input>
                            </div>
                            <div className="form-group">
                                <label for="numRecords">Number of records to retrieve: </label>
                                <select className="form-control" name="numRecords" id="numRecords">
                                    <option value="1">1</option>
                                    <option value="5" selected>5</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label for="startDate">Start date (optional): </label>
                                <input type="date" className="form-control" name="startDate" id="startDate"></input>
                            </div>
                            <div className="form-group">
                                <label for="endDate">End date (optional): </label>
                                <input type="date" className="form-control" name="endDate" id="endDate"></input>
                            </div>
                        </form>
                        <button type="submit" className="btn btn-primary" id="submit" onClick={this.handleSearch}><span className="fa fa-search"></span> Search</button>
                        <span> </span>
                        <button type="button" className="btn btn-danger" id="clear" onClick={this.handleClear}><span className="fa fa-trash"></span> Clear Results</button>
                    </div>
                </div>
                <Results results={this.state.results} handleSave={this.handleSave}/>
            </div>
        );
    };
};

export default Search;
