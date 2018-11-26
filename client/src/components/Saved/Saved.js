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
                        <button type="button" className="btn btn-warning btn-block noteButton" value={article._id} onClick={props.handleNote}><i className="fa fa-comment"></i> Leave Note</button>
                        <span> </span>
                        <button type="button" className="btn btn-primary btn-block viewButton" value={article._id} onClick={props.handleView}><i className="fa fa-comments"></i> View Notes</button>
                        <button type="button" className="btn btn-danger btn-block deleteButton" value={article._id} onClick={props.handleDelete}><i className="fa fa-trash"></i> Delete article</button>
                    </div>
                )}
            </div>
        </div>
    </div>
)

export default Saved;
