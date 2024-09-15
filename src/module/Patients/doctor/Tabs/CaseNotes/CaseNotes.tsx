import { useState, useCallback } from "react";
import { FaChevronDown } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

interface CaseNotesProps {
  onNext?: () => void;
  onBack?: () => void;
}

const initialNotesData = [
  {
    doctor: "Dr Jane Smith (Allergist):",
    text: '"John Doe has severe anaphylactic reactions to Penicillin; all records and alert tags must be updated. Avoid beta-lactam antibiotics; consider desensitization if necessary. For the peanut allergy, strict avoidance and carrying an epinephrine auto-injector are essential. Referred to a dietitian for label reading and cross-contamination avoidance. Latex allergy is mild; use non-latex alternatives. Regular follow-ups are crucial; next review in six months."',
  },
  {
    doctor: "Dr John Davis (Primary Care Physician):",
    text: '"Annual review of medications is advised to prevent accidental allergen exposure. Reinforce the importance of recognizing early signs of allergic reactions and proper use of emergency medications at each visit."',
  },
  {
    doctor: "Dr Jane Smith (Allergist):",
    text: '"John Doe has severe anaphylactic reactions to Penicillin; all records and alert tags must be updated. Avoid beta-lactam antibiotics; consider desensitization if necessary. For the peanut allergy, strict avoidance and carrying an epinephrine auto-injector are essential. Referred to a dietitian for label reading and cross-contamination avoidance. Latex allergy is mild; use non-latex alternatives. Regular follow-ups are crucial; next review in six months."',
  },
  {
    doctor: "Dr John Davis (Primary Care Physician):",
    text: '"Annual review of medications is advised to prevent accidental allergen exposure. Reinforce the importance of recognizing early signs of allergic reactions and proper use of emergency medications at each visit."',
  },
  {
    doctor: "Dr Jane Smith (Allergist):",
    text: '"John Doe has severe anaphylactic reactions to Penicillin; all records and alert tags must be updated. Avoid beta-lactam antibiotics; consider desensitization if necessary. For the peanut allergy, strict avoidance and carrying an epinephrine auto-injector are essential. Referred to a dietitian for label reading and cross-contamination avoidance. Latex allergy is mild; use non-latex alternatives. Regular follow-ups are crucial; next review in six months."',
  },
];

const CaseNotes = ({ onNext, onBack }: CaseNotesProps) => {
  const [isTextBarOpen, setTextBarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editorContent, setEditorContent] = useState("");
  const [notesData, setNotesData] = useState(initialNotesData);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState<number | null>(
    null
  );
  const [newNote, setNewNote] = useState(false);
  const notesPerPage = 4;
  const totalPages = Math.ceil(notesData.length / notesPerPage);

  const handlePagination = useCallback(
    (direction: "next" | "previous" | "end") => {
      setCurrentPage((prevPage) => {
        if (direction === "next" && prevPage < totalPages) return prevPage + 1;
        if (direction === "previous" && prevPage > 1) return prevPage - 1;
        if (direction === "end") return totalPages;
        return prevPage;
      });
    },
    [totalPages]
  );

  const handleToggleTextBar = () => {
    setTextBarOpen((prevState) => !prevState);
    if (!isTextBarOpen) {
      setEditorContent("");
      setSelectedNoteIndex(null);
      setNewNote(false);
    }
  };

  const handleAddNewNote = () => {
    setNewNote(true);
    setEditorContent("");
    setSelectedNoteIndex(null);
  };

  const handleSaveNote = () => {
    if (newNote) {
      setNotesData([
        ...notesData,
        { doctor: "New Doctor:", text: editorContent },
      ]);
    } else if (selectedNoteIndex !== null) {
      setNotesData(
        notesData.map((note, index) =>
          index === selectedNoteIndex ? { ...note, text: editorContent } : note
        )
      );
    }
    setEditorContent("");
    setTextBarOpen(false);
    setNewNote(false);
    setSelectedNoteIndex(null);
  };

  const handleCancelEdit = () => {
    setEditorContent("");
    setTextBarOpen(true);
    setNewNote(false);
    setSelectedNoteIndex(null);
  };

  const startIndex = (currentPage - 1) * notesPerPage;
  const currentNotes = notesData.slice(startIndex, startIndex + notesPerPage);

  return (
    <div className="flex flex-col w-full gap-2 px-6 py-6 border rounded-lg">
      {/* Label */}
      <div className="mb-3">
        <h4 className="label-text">Case Notes</h4>
        <div className="sub-label">Add your case notes.</div>
      </div>

      {/* Line */}
      <hr className=" divider" />

      {/* Text Bar Button*/}
      <div className="mb-2">
        <button
          className="flex items-center gap-2 py-2 px-[14px] text-[#175cd3] bg-[#f9fafb] text-xs rounded-lg border border-[#175cd3]"
          onClick={handleToggleTextBar}
          aria-expanded={isTextBarOpen}
          aria-controls="text-bar"
        >
          {isTextBarOpen ? "Close Text Bar" : "Open Text Bar"} <FaChevronDown />
        </button>
      </div>

      {/* Conditionally Render Editor and Notes */}
      {isTextBarOpen ? (
        <div id="text-bar">
          {newNote || selectedNoteIndex !== null ? (
            <div className="mb-4">
              <ReactQuill
                className=""
                value={editorContent}
                onChange={setEditorContent}
                modules={{
                  toolbar: [
                    ["italic"],
                    ["bold"],
                    ["underline"],
                    ["strike"],
                    ["link"],
                    [{ color: [] }],
                    [{ align: [] }],
                    [{ list: "bullet" }],
                  ],
                }}
                formats={[
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "list",
                  "bullet",
                  "align",
                  "link",
                  "color",
                ]}
              />
              <div className="flex justify-between mt-4">
                <button
                  className="px-3 py-2 text-white rounded bg-health-primary"
                  onClick={handleSaveNote}
                >
                  Save
                </button>
                <button
                  className="px-3 py-2 text-white bg-red-500 rounded"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <div className="mb-2 sub-label">
                Select a note to edit or add a new note:
              </div>
              <button
                className="px-3 py-2 mb-4 text-white rounded bg-health-primary"
                onClick={handleAddNewNote}
              >
                Add case notes
              </button>
              {currentNotes.map((note, index) => (
                <div
                  key={index}
                  className="mb-2 cursor-pointer"
                >
                  <div className="font-medium">{note.doctor}</div>
                  <div dangerouslySetInnerHTML={{ __html: note.text }} />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col w-full gap-4 px-3 py-3 border rounded-lg pr-[14px]">
          {currentNotes.map((note, index) => (
            <div key={index}>
              <div>{note.doctor}</div>
              <div dangerouslySetInnerHTML={{ __html: note.text }} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between text-[#878583] mt-4 font-inter text-sm">
        <button
          className="px-[14px] py-2 border rounded-lg border-[#afaead] font-semibold"
          onClick={() => handlePagination("previous")}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className="font-medium">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex gap-2">
          <button
            className="px-[14px] py-2 border rounded-lg border-[#afaead] font-semibold"
            onClick={() => handlePagination("next")}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <button
            className="px-[14px] py-2 border rounded-lg border-[#afaead] font-semibold"
            onClick={() => handlePagination("end")}
            disabled={currentPage === totalPages}
          >
            End
          </button>
        </div>
      </div>

      {/* Back and Next Buttons */}
      <div className="flex justify-between mt-8 text-white font-inter">
        <button
          className="px-5 py-3 font-semibold rounded-lg bg-health-primary"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="px-5 py-3 font-semibold rounded-lg bg-health-primary"
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CaseNotes;
