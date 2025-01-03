import React, { useState } from 'react';
import axios from 'axios';

const Home = ({ setUserData, setRepos }) => {
    const [username, setUsername] = useState('');

    const fetchUser = async () => {
        const userResponse = await axios.get(`https://api.github.com/users/${username}`);
        const reposResponse = await axios.get(userResponse.data.repos_url);
        console.log(userResponse);

        setUserData(userResponse.data);
        setRepos(reposResponse.data);
    };

    return (
        <div>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter GitHub username" />
            <button onClick={fetchUser}>Search</button>
        </div>
    );
};

export default Home;
