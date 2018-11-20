import React from 'react';
import './Saved.css'

const Saved = props => (
    <div>
        <br></br>
        <div className="panel panel-primary">
            <div className="panel-heading">
                <h3 className="panel-title"><strong><i className="fa fa-save"></i> Saved Articles</strong></h3>
                <hr></hr>
            </div>
            <div className="panel-body">
                {props.articles.map(article =>
                    <div className="savedContainer" key={article._id}>
                        <p>Headline: {article.headline}</p>
                        <p>Publication date: {article.date}</p>
                        <p>Word Count: {article.wordCount}</p>
                        <p>Score: {article.score}</p>
                        <p>URL: <a href={article.url} target="_blank">{article.url}</a></p>
                        <button className="btn btn-danger btn-block deleteButton" value={article._id} onClick={props.handleDelete}><i className="fa fa-trash-alt"></i> Delete article</button>
                    </div>
                )}
            </div>
        </div>
    </div>
)

export default Saved;
