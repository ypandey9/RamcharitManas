import Navbar from "../components/Navbar";
import VerseCard from "../components/VerseCard";

import kandNames from "../data/kandNames";
import { getBookmarks } from "../services/bookmarkService";

import { getAllVerses } from "../services/verseService";
import { useEffect, useState } from "react";


export default function BookmarksPage() {

  const [savedVerses,setSavedVerses]=useState([]);

  // Build full verse list
  
  useEffect(()=>{
    const loadBookmarks=async()=>{
      const bookmarks= await getBookmarks();
      const allVerses=await getAllVerses();



      const bookmarkedVerses=allVerses.filter(verse=>bookmarks.some(b=>b.verseId===verse.id));

      console.log("Bookmarks:", bookmarks);
      console.log("All Verses:", allVerses);
      console.log("Matched:", bookmarkedVerses);

      setSavedVerses(bookmarkedVerses);
    };
    loadBookmarks();
  },[]);



  return (
    <>
      <Navbar />

      <div className="p-6">

        <h2 className="text-2xl font-bold text-center mb-6 text-secondary">
          📚 Saved Bookmarks
        </h2>

        {savedVerses.length === 0 ? (

          <p className="text-center text-gray-500">
            No bookmarks added yet
          </p>

        ) : (

          savedVerses.map((item, index) => (
            <div key={index} className="mb-8">

              {/* Kand Name */}
              <h3 className="text-lg font-semibold mb-3 text-orange-600">
              
                {kandNames[item.kand] || item.kand}
              </h3>

              <VerseCard
                id={item.id}
                type={item.type}
                text={item.text}
                arth={item.arth}
                english={item.english}
                transliteration={item.transliteration}
                kandKey={item.kand}
              />

            </div>
          ))

        )}

      </div>
    </>
  );
}