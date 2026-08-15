import {
  useParams,
  useNavigate
} from "react-router-dom";

import { useState, useEffect } from "react";

import {
    isBookmarked,
    toggleBookmark
} from "../utils/bookmarkManager";
import { saveReadingProgress,getReadingProgress } from "../services/readingProgressService";



const TYPE_LABELS = {
  doha: "दोहा",
  chaupai: "चौपाई",
  chhand: "छंद",
  shlok: "श्लोक",
  soratha: "सोरठा"
};

export default function VerseCard({
  id,
  type,
  text,
  transliteration,
  arth,
  english,
  kandKey,
  onEdit,
  onDelete,
  showAdminActions = false
}) {

  const navigate = useNavigate();

const { name } = useParams();

const kand = kandKey || name;
const [bookmarked, setBookmarked] = useState(false);

// useEffect(() => {

//   async function loadBookmarkStatus() {

//     const status = await isBookmarked(
//       kand,
//       id
//     );

//     setBookmarked(status);

//   }

//   loadBookmarkStatus();

// }, [kand, id]);


useEffect(() => {

  const token = localStorage.getItem("token");

  // Don't call protected bookmark API
  // when user is not logged in.
  if (!token) {
    return;
  }

  async function loadBookmarkStatus() {

    try {

      const status = await isBookmarked(
        kand,
        id
      );

      setBookmarked(status);

    } catch (error) {

      console.error(
        "Error checking bookmark status:",
        error
      );

    }

  }

  loadBookmarkStatus();

}, [kand, id]);


  const [showTransliteration, setShowTransliteration] = useState(false);

//   const handleBookmark = async () => {

//   await toggleBookmark(
//     kand,
//     id
//   );

//   const status =
//     await isBookmarked(
//       kand,
//       id
//     );

//   setBookmarked(status);

// };

const handleBookmark = async () => {

  const token = localStorage.getItem("token");

  // User is not logged in
  if (!token) {

    navigate("/admin-login");

    return;
  }

  try {

    await toggleBookmark(
      kand,
      id
    );

    const status =
      await isBookmarked(
        kand,
        id
      );

    setBookmarked(status);

  } catch (error) {

    console.error(
      "Error updating bookmark:",
      error
    );

  }

};

  const lines = Array.isArray(text) ? text : [text];

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
        return;
    }

    async function saveProgress() {

        try {

            await saveReadingProgress(
                kand,
                id
            );

        } catch (error) {

            console.error(
                "Error saving reading progress:",
                error
            );

        }
    }

    saveProgress();

}, [kand, id]);


  return (

    <div className="bg-white p-6 rounded-2xl shadow-md mb-6 border border-orange-100">

      <div className="flex justify-end mb-2">

        <button
  onClick={(e) => {
    e.stopPropagation();
    handleBookmark();
  }}
  className="text-xl"
>
  {bookmarked ? "🔖" : "📑"}
</button>

{showAdminActions && (
  <div className="flex justify-center gap-2 mb-3">

    <button
      onClick={() => onEdit(id)}
      className="px-2 py-1 bg-blue-500 text-white rounded"
    >
      Edit
    </button>

    <button
      onClick={() => onDelete(id)}
      className="px-2 py-1 bg-red-500 text-white rounded"
    >
      Delete
    </button>

  </div>
)}
      </div>


      <h3 className="text-sm text-orange-500 font-semibold mb-2">
        {/* {TYPE_LABELS[type]} {id} */}
        {TYPE_LABELS[type]}
      </h3>

      <div className="text-lg text-center leading-relaxed font-medium mb-4">
        {lines.map((line, index) => (
          <p key={index} className="mb-1">{line}</p>
        ))}
      </div>

      <div className="flex justify-center mb-4">

  {showTransliteration && transliteration && (
  <div className="mb-4 text-center">
  
    {transliteration.map((line, index) => (
      <p
        key={index}
        className="
          italic text-gray-600
          leading-relaxed
        "
      >
        {line}
      </p>
    ))}

  </div>
)}

</div>

<div className="flex justify-center mb-4">
<button
    onClick={() =>
      setShowTransliteration(!showTransliteration)
    }
    className="
      text-sm px-3 py-1 rounded-full
      bg-orange-100 text-orange-700
      hover:bg-orange-200 transition
    "
  >
    {showTransliteration
      ? "Hide Transliteration"
      : "Show Transliteration"}
  </button>
</div>
      <div className="my-4 border-t"></div>

      <p className="text-gray-700 leading-relaxed text-justify">
        {arth}
      </p>

      {english && (
        <>
          <div className="border-t my-4"></div>
          <h4 className="text-sm font-semibold text-gray-500 mb-1">
            English Meaning
          </h4>
          <p className="text-gray-600 italic leading-relaxed">
            {english}
          </p>
        </>
      )}
    </div>
  );
}