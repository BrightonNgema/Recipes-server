import React from 'react';
import {Link} from 'react-router-dom';

const SearchItem = ({_id, name, category, likes}) => (

    <li>
        <Link to={`/recipes/${_id}`}><h4>{name}</h4></Link>
        <p>{likes}</p>
    </li>
                                                 
);

export default SearchItem;