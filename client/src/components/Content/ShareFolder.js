// ShareFolder.js
import React, { useState, useEffect } from 'react';

function ShareFolder({ folderId }) {
  const [shareWith, setShareWith] = useState('');
  const [users, setUsers] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  const handleShare = () => {
    const share = { folder: folderId, owner: shareWith };
    fetch('http://localhost:5001/folders/Share', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(share)
    })
      .then(response => {
        response.json()
        .then(data => {
          alert(data.message);
          setShareWith('');
        })
      })
      .catch(error => console.error('Error sharing folder:', error));
  };

  const fetchUsers = () => {
    fetch('http://localhost:5001/users/Users', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const usernames = data.map(user => user.username); // Extract usernames
        setUsers(usernames);
        setSuggestedUsers(usernames); // Initially, suggest all usernames
      })
      .catch(error => console.error('Error fetching users:', error));
  };
  
  

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!folderId) {
    return null; // If no note is selected, don't render anything
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    // Filter users based on input value
    const filteredUsers = users.filter(user =>
      user.toLowerCase().startsWith(inputValue)
    );
    setSuggestedUsers(filteredUsers);
    setShareWith(e.target.value);
  };

  return (
    <div className="share-folder">
      <input
        value={shareWith}
        onChange={handleInputChange}
        list="suggestedUsers"
      />
      <datalist id="suggestedUsers">
        {suggestedUsers.map((user, index) => (
          <option key={index} value={user} />
        ))}
      </datalist>
      <button
        onClick={handleShare}
      >
        Share Folder
      </button>
    </div>
  );
}

export default ShareFolder;
