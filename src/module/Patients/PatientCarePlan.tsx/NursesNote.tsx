import React, { useState, useEffect } from 'react';

type NursesNoteProps = {
  Note: {
    note: string;
    doctor: string;
    updatedOn: string;
    updatedBy: string;
  };
  onUpdateNote: (updatedNote: string) => void;
};

const NursesNote: React.FC<NursesNoteProps> = ({ Note, onUpdateNote }) => {
  const [newNote, setNewNote] = useState('');
  const [combinedNote, setCombinedNote] = useState(Note.note);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewNote(e.target.value);
  };

  const handleUpdateClick = () => {
    if (newNote.trim()) {
      const updatedCombinedNote = `${combinedNote}\n${newNote}`;
      setCombinedNote(updatedCombinedNote);
      onUpdateNote(updatedCombinedNote); 
      setNewNote('');
    }
  };

  useEffect(() => {
    setCombinedNote(Note.note);
  }, [Note]);

  return (
    <div className="w-full p-4 border border-[#EAECF0] min-h-[85vh] mb-4">
      <div className="block gap-4 pt-1 pb-2">
        <span className="font-semibold text-xl block pb-4 font-poppins">Nurses Note</span>
        <span className="border p-2 border-[#175CD3] rounded-md text-[#175CD3] text-xs">Open text bar</span>
      </div>
      <div className="p-4 border border-[#EAECF0] rounded-md mt-4 mb-4 min-h-[50vh] font-poppins">
        <p className="text-sm font-medium pb-2 font-poppins">{Note.doctor} (Allergist):</p>
        <p className="text-sm font-medium pb-4 font-poppins">{combinedNote}</p>
        <span className="block text-sm font-medium text-[#49566C] font-poppins">
          Updated on {Note.updatedOn} by {Note.updatedBy}
        </span>
        <textarea
          value={newNote}
          onChange={handleNoteChange}
          placeholder="Add a note"
          className="w-full text-sm font-medium text-[#49566C] font-poppins resize-none border-none outline-none focus:ring-0 cursor-text mt-4 mb-4"
        />
      </div>
      <span
        className="bg-[#175CD3] text-sm rounded-md p-2 float-right text-white mt-4 mb-4 cursor-pointer"
        onClick={handleUpdateClick}
      >
        Update Note
      </span>
    </div>
  );
};

export default NursesNote;
