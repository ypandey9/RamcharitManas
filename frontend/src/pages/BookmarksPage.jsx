import Navbar from "../components/Navbar";
import VerseCard from "../components/VerseCard";

import kandNames from "../data/kandNames";
import { getBookmarks } from "../services/bookmarkService";

import { getAllVerses } from "../services/verseService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function BookmarksPage() {

  const navigate = useNavigate();

  const [savedVerses, setSavedVerses] = useState([]);

  const [isLoggedIn] = useState(
    !!localStorage.getItem("token")
  );


  // ==========================================
  // Load Bookmarks
  // ==========================================

  useEffect(() => {

    if (!isLoggedIn) {
      return;
    }

    const loadBookmarks = async () => {

      try {

        const bookmarks =
          await getBookmarks();

        const allVerses =
          await getAllVerses();


        const bookmarkedVerses =
          allVerses.filter(
            verse =>
              bookmarks.some(
                b => b.verseId === verse.id
              )
          );


        setSavedVerses(
          bookmarkedVerses
        );


      } catch (error) {

        console.error(
          "Error loading bookmarks:",
          error
        );

      }

    };

    loadBookmarks();

  }, [isLoggedIn]);


  return (

    <>

      <Navbar />


      <div className="p-6">


        <h2 className="
          text-2xl
          font-bold
          text-center
          mb-6
          text-secondary
        ">
          📚 Saved Bookmarks
        </h2>


        {/* ==================================
            Not Logged In
        ================================== */}

        {!isLoggedIn ? (

          <div className="text-center mt-10">

            <p className="text-gray-500 mb-4">

              Please login to view your bookmarks.

            </p>


            <button
              onClick={() =>
                navigate("/admin-login")
              }
              className="
                bg-orange-600
                hover:bg-orange-700
                text-white
                px-6
                py-2
                rounded-lg
                font-semibold
              "
            >

              Login

            </button>

          </div>


        ) : savedVerses.length === 0 ? (


          /* ==================================
             Logged In - No Bookmarks
          ================================== */

          <p className="text-center text-gray-500">

            No bookmarks added yet

          </p>


        ) : (


          /* ==================================
             Logged In - Bookmarks
          ================================== */

          savedVerses.map((item, index) => (

            <div
              key={index}
              className="mb-8"
            >

              <h3 className="
                text-lg
                font-semibold
                mb-3
                text-orange-600
              ">

                {kandNames[item.kand] ||
                  item.kand}

              </h3>


              <VerseCard

                id={item.id}

                type={item.type}

                text={item.text}

                arth={item.arth}

                english={item.english}

                transliteration={
                  item.transliteration
                }

                kandKey={item.kand}

              />

            </div>

          ))

        )}

      </div>

    </>

  );

}