import React from 'react';
import './Results.css'

const Results = props => (
    <div>
        <br></br>
        <div className="panel panel-primary">
            <div className="panel-heading">
                <h3 className="panel-title"><strong><i className="fa  fa-table"></i> Results</strong></h3>
                <hr></hr>
            </div>
            <div className="panel-body">
                {props.results.map(result => (
                    <div className="articleContainer" key={result._id}>
                        <p>Headline: {result.headline.main}</p>
                        <p>Publication date: {result.pub_date}</p>
                        <p>Word Count: {result.word_count}</p>
                        <p>Score: {result.score}</p>
                        <p>URL: <a href={result.web_url}>{result.web_url}</a></p>
                        <button className="btn btn-primary btn-block" value={result._id} onClick={props.handleSave}><i className="fa fa-save"></i> Save article</button>
                    </div>
                ))}
            </div>
        </div>
    </div>
)

export default Results;
