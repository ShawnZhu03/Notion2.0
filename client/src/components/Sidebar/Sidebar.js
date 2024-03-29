import React, { useState, useEffect } from 'react';
import '../../MainPage.css'
import { useNavigate } from 'react-router-dom';

function Sidebar({ onFolderSelect, onAddFolder, folders, selectedFolderId }) {
    const navigate = useNavigate();
    const [newFolderName, setNewFolderName] = useState('');
    const username = localStorage.getItem("username");
    const [profilePicture, setProfilePicture] = useState('');

    useEffect(() => {
        fetchProfilePicture();
    }, [profilePicture]);

    const fetchProfilePicture = async () => {
        try {
            const response = await fetch(`https://notion2-0-gpts.vercel.app/users/getUserProfilePic/${username}`);
            console.log('Fetching profile picture for:', username); // Log username
            console.log('Response status:', response.status);
            if (response.ok) {
                const data = await response.json();
                console.log('Profile picture URL:', data.profilePicUrl); // Log profile picture URL
                setProfilePicture(data.profilePicUrl);
                localStorage.setItem("profilePicture", data.profilePicUrl);
            } else {
                
            }
        } catch (error) {
            console.error('Error fetching profile picture:', error);
        }
    };

    const handleFolderClick = (folderId) => {
        console.log(folderId);
        onFolderSelect(folderId);
    };

    const handleAddFolder = (e) => {
        e.preventDefault();

        const newFolder = {
            folderName: newFolderName,
            owner: username
        };

        fetch('https://notion2-0-gpts.vercel.app/folders/AddFolder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFolder)
        })
            .then(response => response.json())
            .then(addedFolder => {
                onAddFolder(addedFolder);
                setNewFolderName('');
            })
            .catch(error => console.error('Error adding folder:', error));
    };

    const handleProfilePictureUpload = async (e) => {
        e.preventDefault();

        if (e.target.files && e.target.files[0]) {
            let formData = new FormData();

            formData.append('profilePicture', e.target.files[0]);
            formData.append('username', username);

            try {
                const response = await fetch('https://notion2-0-gpts.vercel.app/users/uploadProfilePicture', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    const uploadedProfilePicUrl = data.profilePicture;
                    setProfilePicture(uploadedProfilePicUrl); 
                    localStorage.setItem("profilePicture", uploadedProfilePicUrl); 
                    alert('Profile picture uploaded successfully');
                } else {
                    alert('Upload failed');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            alert('No file selected');
        }
    };

    const handleLogOut = () => {
        navigate('/');
        localStorage.setItem("username", null);

    }

    return (
        <aside style={{ display: 'flex', flexDirection: 'column', overflowX: 'auto' }}>
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <img
                    src={profilePicture}
                    alt="Profile"
                    style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                />
                <input
                    type="file"
                    onChange={handleProfilePictureUpload}
                    style={{ display: 'block', margin: '10px auto' }}
                />
            </div>

            {folders.map(folder => (
                <div className='folder'
                    key={folder._id}
                    style={{
                        margin: '10px',
                        cursor: 'pointer',
                        // display: 'inline-block',
                        backgroundColor: folder._id === selectedFolderId ? '#f0f0f0' : 'transparent',
                    }}
                    onClick={() => handleFolderClick(folder._id)}
                >
                    {folder.folderName}
                </div>
            ))}
            <form onSubmit={handleAddFolder}>
                <input
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="New Folder Name"
                />
                <button type="submit">Add Folder</button>
            </form>

            <button onClick={handleLogOut}>
                Log Out
            </button>
        </aside>
    );
}

export default Sidebar;

