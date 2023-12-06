// NoteDetails.js
import React, { useState, useEffect } from 'react';

function NoteDetails({ note , fetchNotes, folderId }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      // Set the initial values based on the note prop
      setTitle(note.name || ''); // Assuming the title field is named 'name'
      setContent(note.content || '');
    }
  }, [note]);

  const handleEdit = () => {
    const edit = { _id: note._id, name: title, content: content };
    fetch('http://localhost:5001/EditNote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(edit)
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        fetchNotes(folderId);
      })
      .catch(error => console.error('Error adding note:', error));
  };

  if (!note) {
    return null; // If no note is selected, don't render anything
  }

  return (
    <div className='note'>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Note Title'
        className='note-title-input'
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Note Content'
        className='note-content-textarea'
      />

      <button onClick = {handleEdit}>
        Save Changes
      </button>
    </div>
  );
}

export default NoteDetails;
