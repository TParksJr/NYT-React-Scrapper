import React from 'react';
import './Header.css'

const Header = props => (
        <header className="page-header py-3">
            <h1 className="text-center"><span className="fa fa-newspaper-o"></span> NYT React Scrapper</h1>
            <p className="text-center">Search the New York Times for articles, and even save them to read later!</p>
        </header>
)

export default Header;