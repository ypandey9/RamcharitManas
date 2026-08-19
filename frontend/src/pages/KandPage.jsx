import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import VerseCard from "../components/VerseCard";

import kandNames from "../data/kandNames";
import kandHeaders from "../data/kandHeaders";

import {
  getPagedVersesByKand
} from "../services/verseService";

export default function KandPage() {

  const { name } = useParams();

  // ==========================================
  // Verses
  // ==========================================

  const [verses, setVerses] = useState([]);

  // ==========================================
  // Pagination
  // ==========================================

  const [currentPage, setCurrentPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(0);

  const itemsPerPage = 5;

  // ==========================================
  // Loading / Error
  // ==========================================

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ==========================================
  // Kand Header
  // ==========================================

  const header =
    kandHeaders[name] || {};

  // ==========================================
  // Reset page when Kand changes
  // ==========================================

  useEffect(() => {

    setCurrentPage(1);

  }, [name]);

  // ==========================================
  // Load verses from backend
  // ==========================================

  useEffect(() => {

    const loadVerses = async () => {

      try {

        setLoading(true);
        setError("");

        const data =
          await getPagedVersesByKand(
            name,
            currentPage - 1,
            itemsPerPage
          );

        setVerses(
          data.content || []
        );

        setTotalPages(
          data.totalPages || 0
        );

      } catch (error) {

        console.error(
          "Failed to load verses:",
          error
        );

        setVerses([]);

        setTotalPages(0);

        setError(
          "Unable to load verses. Please try again."
        );

      } finally {

        setLoading(false);

      }

    };

    loadVerses();

  }, [name, currentPage]);

  // ==========================================
  // Scroll to top when page changes
  // ==========================================

  useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }, [currentPage]);

  // ==========================================
  // UI
  // ==========================================

  return (
    <>
      <Navbar />

      <div
        className="
          max-w-5xl mx-auto
          px-4 py-6
        "
      >

        {/* =====================================
            Kand Title
        ====================================== */}

        <h2
          className="
            text-3xl font-bold
            text-center mb-8
            text-orange-700
          "
        >
          {kandNames[name] || name}
        </h2>


        {/* =====================================
            Kand Header
        ====================================== */}

        <div
          className="
            text-center mb-10
            space-y-2
          "
        >

          {header.lines?.map(
            (line, index) => (

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

            )
          )}

        </div>


        {/* =====================================
            LOADING
        ====================================== */}

        {loading ? (

          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              py-16
            "
          >

            {/* Spinner */}

            <div
              className="
                w-10
                h-10
                border-4
                border-gray-300
                border-t-orange-600
                rounded-full
                animate-spin
              "
            />

            <p
              className="
                mt-4
                text-gray-600
                text-lg
              "
            >
              Loading verses...
            </p>

          </div>


        ) : error ? (

          /* =====================================
             ERROR
          ====================================== */

          <div
            className="
              text-center
              py-12
            "
          >

            <p
              className="
                text-red-600
                text-lg
              "
            >
              {error}
            </p>

          </div>


        ) : verses.length === 0 ? (

          /* =====================================
             NO DATA
          ====================================== */

          <p
            className="
              text-center
              text-gray-500
              text-lg
              py-12
            "
          >
            No verses available.
          </p>


        ) : (

          /* =====================================
             VERSES
          ====================================== */

          <>

            <div
              className="
                space-y-6
              "
            >

              {verses.map(
                (item) => (

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
                  />

                )
              )}

            </div>


            {/* =================================
                PAGINATION
            ================================== */}

            {totalPages > 1 && (

              <div
                className="
                  flex
                  flex-wrap
                  justify-center
                  items-center
                  gap-2
                  mt-10
                "
              >

                {/* Previous */}

                <button
                  disabled={
                    currentPage === 1
                  }

                  onClick={() =>
                    setCurrentPage(
                      prev =>
                        Math.max(
                          prev - 1,
                          1
                        )
                    )
                  }

                  className={`
                    px-4 py-2
                    rounded-lg
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
                  (_, index) => {

                    const pageNumber =
                      index + 1;

                    return (

                      <button
                        key={pageNumber}

                        onClick={() =>
                          setCurrentPage(
                            pageNumber
                          )
                        }

                        className={`
                          px-4 py-2
                          rounded-lg
                          transition

                          ${
                            currentPage ===
                            pageNumber
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
                        {pageNumber}
                      </button>

                    );

                  }
                )}


                {/* Next */}

                <button
                  disabled={
                    currentPage ===
                    totalPages
                  }

                  onClick={() =>
                    setCurrentPage(
                      prev =>
                        Math.min(
                          prev + 1,
                          totalPages
                        )
                    )
                  }

                  className={`
                    px-4 py-2
                    rounded-lg
                    transition

                    ${
                      currentPage ===
                      totalPages
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

            )}

          </>

        )}

      </div>
    </>
  );
}