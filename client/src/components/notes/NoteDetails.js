// NoteDetails.js
import React from 'react';

function NoteDetails({ note }) {
  if (!note) {
    return null; // If no note is selected, don't render anything
  }

  return (
    <div className='note'>
      <h2>{note.name}</h2>
      <p>{note.content}</p>
    </div>
  );
}

export default NoteDetails;
