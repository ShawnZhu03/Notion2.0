// NotesArea.js
import React, { useState, useEffect } from 'react';
import NoteDetails from './NoteDetails'; // Import the new component


function NotesArea({ folderId }) {
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    
    //update notes when a new folder is selected
    useEffect(() => {
        if (folderId) {
          fetchNotes(folderId);
          setSelectedNote(null); // Reset selectedNote when folder changes
        }
      }, [folderId]);

    if (folderId === null) {
        return <></>
    }
    
    
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);
    formData.append('folderId', folderId);

    const response = await fetch('https://notion2-0-gpts.vercel.app/notes/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('File uploaded');
      fetchNotes(folderId); 
    } else {
      alert('Upload failed');
    }
  }
    
  const handleAddNote = () => {
    const newNote = { name: noteTitle, folder: folderId, content: noteContent };
    console.log(newNote);
    fetch('https://notion2-0-gpts.vercel.app/notes/AddNote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNote)
    })
      .then(response => response.json())
      .then(addedNote => {
        setNotes([...notes, addedNote]);
        setNoteTitle('');
        setNoteContent('');
        fetchNotes(folderId);
      })
      .catch(error => console.error('Error adding note:', error));
  };

  const handleOpenNote = (note) => {
    setSelectedNote(note);
  };

  const fetchNotes = (folderId) => {
    fetch('https://notion2-0-gpts.vercel.app/notes/Notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folder: folderId })
    })
      .then(response => response.json())
      .then(data => setNotes(data))
      .catch(error => console.error('Error fetching folders:', error));
      
  };

  

  return (
    
    <div className="note-container">
        <div>
          <form onSubmit={handleSubmit}>
            <input type="file" name="file" />
            <button type="submit">Upload</button>
          </form>
        </div>

      <input
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
        placeholder="Note Title"
        className="note-title-input"
      />
      <textarea
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        placeholder="Note Content"
        className="note-content-textarea"
      />
      <button
        onClick={handleAddNote}
        className="add-note-button"
      >
        Add Note
      </button>

      {notes.map(note => (
        <div
          key={note._id}
          style={{
            margin: '10px',
            cursor: 'pointer',
            backgroundColor: selectedNote && selectedNote._id === note._id ? 'lightgray' : 'white',
          }}
          onClick={() => handleOpenNote(note)}
        >
          {note.name}
        </div>
      ))}

      <NoteDetails note={selectedNote} fetchNotes = {fetchNotes} folderId = {folderId} setNote = {setSelectedNote}/>
    </div>
  );
}

export default NotesArea;
