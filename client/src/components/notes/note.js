import React, { useState } from 'react';

function NotesArea({ folderId, onAddNote }) {
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');

    const handleAddNote = () => {
        const newNote = { id: Date.now(), title: noteTitle, content: noteContent };
        onAddNote(newNote, folderId);
        setNoteTitle('');
        setNoteContent('');
    };

    return (
        <div>
            <input value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} placeholder="Note Title" />
            <textarea value={noteContent} onChange={(e) => setNoteContent(e.target.value)} placeholder="Note Content" />
            <button onClick={handleAddNote}>Add Note</button>
        </div>
    );
}

export default NotesArea;
