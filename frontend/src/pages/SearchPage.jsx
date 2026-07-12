import { useEffect, useState } from "react";
import kandNames from "../data/kandNames";
import Navbar from "../components/Navbar";
import VerseCard from "../components/VerseCard";
import { searchVerses } from "../services/verseService";

export default function SearchPage() {

  const [query, setQuery] = useState("");

  const [results, setResults] = useState([]);

  const [page, setPage] = useState(0);

  const [totalPages, setTotalPages] = useState(0);

  const [totalResults, setTotalResults] = useState(0);

  const [loading, setLoading] = useState(false);

  // Reset page when query changes
  useEffect(() => {

    setPage(0);

  }, [query]);

  // Search API call
  useEffect(() => {

    const timer = setTimeout(async () => {

      if (!query.trim()) {

        setResults([]);
        setTotalPages(0);
        setTotalResults(0);

        return;
      }

      try {

        setLoading(true);

        const data = await searchVerses(
          query,
          page,
          5
        );

        console.log("Search Response:", data);

        const formatted =
          (data.content || []).map(verse => ({

            ...verse,

            kandKey: verse.kand,

            kandName:
              kandNames[verse.kand] ||
              verse.kand

          }));

        setResults(formatted);

setTotalResults(data.totalElements);

setTotalPages(data.totalPages);

      } catch (error) {

        console.error(
          "Search failed:",
          error
        );

      } finally {

        setLoading(false);
      }

    }, 500);

    return () => clearTimeout(timer);

  }, [query, page]);

  return (
    <>
      <Navbar />

      <div className="p-6">

        <h2 className="text-2xl font-bold text-center mb-6 text-secondary">
          🔍 Search Verses
        </h2>

        <input
          type="text"
          placeholder="Search verse, meaning, transliteration..."
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          className="
            w-full p-3 rounded-xl
            border border-orange-200
            mb-6
            focus:outline-none
            focus:ring-2
            focus:ring-orange-300
          "
        />

        {/* Loading */}
        {loading && (

          <p className="text-center text-gray-500 animate-pulse">
            Searching...
          </p>

        )}

        {/* No Results */}
        {!loading &&
          query &&
          results.length === 0 && (

            <p className="text-center text-gray-500">
              No verses found.
            </p>

          )}

        {/* Results Count */}
        {results.length > 0 && (

          <div className="text-center mb-6">

            <p className="text-gray-500">

              {totalResults} result(s) found

            </p>

            <p className="text-sm text-gray-400">

              {/* Page {page + 1} of {totalPages} */}

            </p>

          </div>

        )}

        {results.length > 0 && (
  <p className="text-sm text-gray-400 text-center">
    Page {page + 1} of {totalPages}
  </p>
)}

        {/* Results */}
        {results.map((item) => (

          <div
            key={`${item.kandKey}-${item.id}`}
            className="mb-8"
          >

            <h3 className="text-lg font-semibold text-orange-600 mb-3">

              {item.kandName}

            </h3>

            <VerseCard
              id={item.id}
              type={item.type}
              text={item.text}
              transliteration={item.transliteration}
              arth={item.arth}
              english={item.english}
              kandKey={item.kandKey}
            />

          </div>

        ))}

        {/* Pagination */}


        {totalPages > 1 && (

          <div className="flex justify-center gap-3 mt-8">

            <button
              disabled={page === 0}
              onClick={() =>
                setPage(prev => prev - 1)
              }
              className="
                px-4 py-2
                bg-orange-200
                rounded
                disabled:opacity-50
              "
            >
              Previous
            </button>

            <span className="px-4 py-2">

              Page {page + 1}
              {" / "}
              {totalPages}

            </span>

            <button
              disabled={
                page >= totalPages - 1
              }
              onClick={() =>
                setPage(prev => prev + 1)
              }
              className="
                px-4 py-2
                bg-orange-200
                rounded
                disabled:opacity-50
              "
            >
              Next
            </button>

          </div>

        )}

      </div>
    </>
  );
}