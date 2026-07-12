import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import VerseCard from "../components/VerseCard";

import kandNames from "../data/kandNames";
import kandHeaders from "../data/kandHeaders";


import { getAllVerses } from "../services/verseService";

export default function KandPage() {

  const { name } = useParams();

  // Backend verses
  const [backendVerses, setBackendVerses] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // Load verses from backend
  useEffect(() => {

    const loadVerses = async () => {

      try {

        const data = await getAllVerses();

        setBackendVerses(data);

      } catch (error) {

        console.error(
          "Failed to load verses:",
          error
        );
      }
    };

    loadVerses();

  }, []);

  // Kand header
  const header =
    kandHeaders[name] || {};

  // Backend verses for current kand
  const verses =
    backendVerses.filter(
      verse => verse.kand === name
    );

  // Pagination Logic
  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const endIndex =
    startIndex + itemsPerPage;

  const currentVerses =
    verses.slice(startIndex, endIndex);

  const totalPages =
    Math.ceil(
      verses.length / itemsPerPage
    );

  // Reset page when kand changes
  useEffect(() => {

    setCurrentPage(1);

  }, [name]);

  // Scroll to top on page change
  useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }, [currentPage]);

const handleDelete = (id) => {

  const allCustom =
    JSON.parse(
      localStorage.getItem("ramayan_custome_data")
    ) || [];

  const updated =
    allCustom.filter(
      v => v.verse.id !== id
    );

  localStorage.setItem(
    "ramayan_custome_data",
    JSON.stringify(updated)
  );

  window.location.reload();
};

const navigate = useNavigate();

const handleEdit = (id) => {
   navigate(`/edit-verse/${id}`);
};



  return (
    <>
      <Navbar />

      <div
        className="
          max-w-5xl mx-auto
          px-4 py-6
        "
      >

        {/* Kand Title */}
        <h2
          className="
            text-3xl font-bold
            text-center mb-8
            text-orange-700
          "
        >
          {kandNames[name] || name}
        </h2>

        {/* Header */}
        <div
          className="
            text-center mb-10
            space-y-2
          "
        >

          {header.lines?.map((line, index) => (

            <p
              key={index}

              className={`
                ${
                  index === 2
                    ? `
                      text-3xl
                      font-bold
                      text-orange-700
                    `
                    : `
                      text-lg
                      text-gray-700
                    `
                }
              `}
            >
              {line}
            </p>

          ))}

        </div>

        {/* No Data */}
        {verses.length === 0 ? (

          <p
            className="
              text-center
              text-gray-500
              text-lg
            "
          >
            No verses available
          </p>

        ) : (

          <>
            {/* Verse List */}
            <div className="space-y-6">

              {currentVerses.map((item) => (

                <VerseCard
                  key={item.id}

                  id={item.id}

                  type={item.type}

                  text={item.text}

                  transliteration={
                    item.transliteration
                  }

                  arth={item.arth}

                  english={item.english}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />

              ))}

            </div>

            {/* Pagination */}
            <div
              className="
                flex flex-wrap
                justify-center
                items-center
                gap-2 mt-10
              "
            >

              {/* Previous */}
              <button
                disabled={currentPage === 1}

                onClick={() =>
                  setCurrentPage(prev =>
                    Math.max(prev - 1, 1)
                  )
                }

                className={`
                  px-4 py-2 rounded-lg
                  transition

                  ${
                    currentPage === 1
                      ? `
                        bg-gray-200
                        text-gray-400
                        cursor-not-allowed
                      `
                      : `
                        bg-orange-200
                        hover:bg-orange-300
                      `
                  }
                `}
              >
                Prev
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages)].map(
                (_, index) => (

                  <button
                    key={index}

                    onClick={() =>
                      setCurrentPage(index + 1)
                    }

                    className={`
                      px-4 py-2 rounded-lg
                      transition

                      ${
                        currentPage === index + 1
                          ? `
                            bg-orange-500
                            text-white
                          `
                          : `
                            bg-gray-200
                            hover:bg-gray-300
                          `
                      }
                    `}
                  >
                    {index + 1}
                  </button>

                )
              )}

              {/* Next */}
              <button
                disabled={
                  currentPage === totalPages
                }

                onClick={() =>
                  setCurrentPage(prev =>
                    Math.min(
                      prev + 1,
                      totalPages
                    )
                  )
                }

                className={`
                  px-4 py-2 rounded-lg
                  transition

                  ${
                    currentPage === totalPages
                      ? `
                        bg-gray-200
                        text-gray-400
                        cursor-not-allowed
                      `
                      : `
                        bg-orange-200
                        hover:bg-orange-300
                      `
                  }
                `}
              >
                Next
              </button>

            </div>
          </>
        )}

      </div>
    </>
  );
}