import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../App.css';
import SearchBar from './SearchBarPage';
import './styles.css';
import { Link } from 'react-router-dom';
const Nav = () => {
    const [getByTitle, setTitle] = useState('');
    const history = useHistory();

    return (
        <nav className="nav_bar">
            <Link to="/api/recipe" className="nav_link">
                <h3 className="heading">Diary Recipe</h3>
            </Link>
            <div className="search">
                <input type="input" placeholder="Enter Recipe Title" className="search_box" value={getByTitle} onChange={(e) => setTitle(e.target.value)} />
                <button className="search_submit" type="submit" onClick={() => history.push('/api/recipe/result/' + getByTitle)}></button>
            </div>
            <ul className="nav-links">
                <Link to="/api/recipe/create" className="nav_link">
                    <li className="nav_link">Create Recipe</li>
                </Link>
                <Link to="/api/recipe/ingredient" className="nav_link">
                    <li className="nav_link">Find by Ingredient</li>
                </Link>
            </ul>
        </nav>
    );
};

export default Nav;
