import React from 'react';
import {Link} from 'react-router-dom';


const formatDate =  date => {
    const newDate = new Date(date).toLocaleDateString('en-US');
    const newTime = new Date(date).toLocaleTimeString('en-US');

    return `${newDate} at ${newTime}`; 
}

const UserInfo = ({session}) => (
    <div>
        <h3>UserInfo</h3>
        <p>Username: {session.getCurrentUser.username.toUpperCase()}</p>
        <p>Email: {session.getCurrentUser.email}</p>
        <p>Join Date: {formatDate(session.getCurrentUser.joinDate)}</p>
        <ul>
            <h3>{session.getCurrentUser.username.toUpperCase()}'s Favourites</h3>
            {session.getCurrentUser.favourites.map(favourite => {
                <li key={favourite._id}>
                     <Link to={`/recipes/${favourite._id}`}><p>favourite.name</p></Link>
                </li>
            })}
            {!session.getCurrentUser.favourites.length && (
                <p>
                    <strong>
                        You have no favourites currently. Go add some!
                    </strong>
                </p>
            )}
        </ul>
    </div>
);

export default UserInfo;