import React, { useState } from 'react';

function NotesArea({ folderId, onAddNote }) {
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');

    const handleAddNote = () => {
        const newNote = { title: noteTitle, content: noteContent, folderId: folderId };

        fetch('http://localhost:5001/AddNote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newNote)
        })
            .then(response => response.json())
            .then(addedNote => {
                onAddNote(addedNote);
                setNoteTitle('');
                setNoteContent('');
            })
            .catch(error => console.error('Error adding note:', error));
    };

    return (
        <div className="note-container">
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
        </div>
    );
    
    }
export default NotesArea;
