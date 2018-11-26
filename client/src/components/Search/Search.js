import React, { Component } from 'react';
import './Search.css';
import axios from 'axios';
import Results from '../Results';
import Saved from '../Saved';
import tingle from 'tingle.js';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            saved: [],
            selected: "No selection yet"
        };
    };

    componentDidMount() {
        axios.get("/api/saved").then(res => {
            let newArr = [];
            for (let i = 0; i < res.data.length; i++) {
                newArr.push(res.data[i]);
            };
            this.setState({
                saved: newArr
            });
        });
    };

    handleSearch = event => {
        event.preventDefault();

        let searchTerm = document.getElementById("searchTerm").value;
        let numRecords = document.getElementById("numRecords").value;
        let startDate = document.getElementById("startDate").value;
        let endDate = document.getElementById("endDate").value;

        let apiURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=bfcbfaf5c097425db19434c8ccf73135";
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
        });
    };

    handleClear = () => {
        this.setState({
            results: []
        });
    };

    handleSave = event => {
        let articleId = event.target.value;
        let newArr = [];

        for (let i = 0; i < this.state.results.length; i++) {
            if (this.state.results[i]._id === articleId) {
                newArr.push(this.state.results[i]);
            };
        };

        let newObj = newArr[0];

        axios.post("/api/save/" + articleId, newObj).then(res => {
            let newArr = this.state.results;
            for (let i = 0; i < newArr.length; i++) {
                if (newArr[i]._id === articleId) {
                    newArr.splice(i, 1);
                };
            };
            let newSaved = this.state.saved;
            newSaved.unshift(res.data);
            this.setState({
                results: newArr,
                saved: newSaved
            });
        });
    };

    handleDelete = event => {
        let articleId = event.target.value;
        axios.put("/api/delete/" + articleId).then(res => {
            let newArr = this.state.saved;
            for (let i = 0; i < newArr.length; i++) {
                if (newArr[i]._id === articleId) {
                    newArr.splice(i, 1);
                };
            };
            this.setState({
                saved: newArr
            });
        });
    };

    handleNote = event => {
        let articleId = event.target.value;
        this.setState({
            selected: articleId
        }, () => {
            var modal = new tingle.modal({
                footer: true,
                stickyFooter: false,
                closeMethods: ['overlay', 'button', 'escape'],
                closeLabel: "Close",
                cssClass: ['custom-class-1', 'custom-class-2'],
                onOpen: function() {
                },
                onClose: function() {
                },
                beforeClose: function() {
                    return true;
                }
            });
            modal.setContent('<form><input type="text" id="modalInput" placeholder="Add your note here..."></form>');
            modal.addFooterBtn('Submit', 'tingle-btn tingle-btn--primary', () => {
                this.handleSubmit();
                modal.close();
            });
            modal.addFooterBtn('Exit', 'tingle-btn tingle-btn--danger', () => {
                modal.close();
            });
            modal.open();
        });
    };

    handleSubmit = () => {
        let newNote = {
            article: this.state.selected,
            body: document.getElementById("modalInput").value
        };
        axios.put("/api/note/" + this.state.selected, newNote).then(res => {
            console.log(res);
        });
    };

    handleView = event => {
        let articleId = event.target.value;
        this.setState({
            selected: articleId
        }, () => {
            axios.get("/api/notes/" + articleId).then(res => {
                let newArr = [];
                for (let i = 0; i < res.data.length; i++) {
                    newArr.push("<li>" + res.data[i].body + "</li>");
                };
                let newString = newArr.join('');
                var modal = new tingle.modal({
                    footer: true,
                    stickyFooter: false,
                    closeMethods: ['overlay', 'button', 'escape'],
                    closeLabel: "Close",
                    cssClass: ['custom-class-1', 'custom-class-2'],
                    onOpen: function() {
                    },
                    onClose: function() {
                    },
                    beforeClose: function() {
                        return true;
                    }
                });
                modal.setContent('<ul>' + newString + '</ul>');
                modal.addFooterBtn('Exit', 'tingle-btn tingle-btn--danger', () => {
                    modal.close();
                });
                modal.open();
            });
        });
    };

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
                                <label htmlFor="searchTerm">Search term: </label>
                                <input type="text" className="form-control" name="searchTerm" id="searchTerm"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="numRecords">Number of records to retrieve: </label>
                                <select className="form-control" name="numRecords" id="numRecords">
                                    <option value="1">1</option>
                                    <option value="5" selected>5</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="startDate">Start date (optional): </label>
                                <input type="date" className="form-control" name="startDate" id="startDate"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="endDate">End date (optional): </label>
                                <input type="date" className="form-control" name="endDate" id="endDate"></input>
                            </div>
                        </form>
                        <button type="submit" className="btn btn-primary" id="submit" onClick={this.handleSearch}><span className="fa fa-search"></span> Search</button>
                        <span> </span>
                        <button type="button" className="btn btn-danger" id="clear" onClick={this.handleClear}><span className="fa fa-trash"></span> Clear Results</button>
                    </div>
                </div>
                <Results results={this.state.results} handleSave={this.handleSave} />
                <Saved articles={this.state.saved} handleDelete={this.handleDelete} handleNote={this.handleNote} handleView={this.handleView}/>
            </div>
        );
    };
};

export default Search;
