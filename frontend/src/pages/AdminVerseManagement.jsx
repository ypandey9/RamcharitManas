import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import VerseCard from "../components/VerseCard";

import kandNames from "../data/kandNames";

import {
  getAllVerses,
  deleteVerse,
  getPagedVerses,
  getDashbaseStats
} from "../services/verseService";



export default function AdminVerseManagement() {

  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [stats, setStats] = useState(null);


  const navigate = useNavigate();

useEffect(() => {

  loadVerses();

}, [page]);

useEffect(() => {

  const loadStats = async () => {

    try {

      const data =
        await getDashbaseStats();

        console.log("stats data : ", data );

      setStats(data);

    } catch(error) {

      console.error(error);

    }
  };

  loadStats();

}, []);


const loadVerses = async () => {

  try {

    setLoading(true);

const data =
  await getPagedVerses(
    page,
    5
  );

setVerses(
  data.content
);

setTotalPages(
  data.totalPages
);


  } catch(error) {

    console.error(error);

  } finally {

    setLoading(false);
  }
};


  // Delete Handler
  const handleDelete = async(id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this verse?"
    );

    if (!confirmDelete) return;

   try {

  await deleteVerse(id);

  alert("Verse deleted successfully.");

  await loadVerses();

} catch(error) {

  console.error(error);
}
  };

    // 👇 Place loading check here
  if (loading) {

    return (
      <>
        <Navbar />
        <p className="text-center mt-10">
          Loading verses...
        </p>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-5xl mx-auto">
      <div className="text-center m-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-orange-700">Dashboard</h1>
      {stats &&

 <div
  className="
    grid
    grid-cols-1
    md:grid-cols-2
    lg:grid-cols-3
    gap-6
    mb-10
  "
>

  <div className="bg-orange-100 p-6 rounded-xl shadow">
    <h3 className="text-lg font-semibold">
      📚 Total Verses
    </h3>
    <p className="text-3xl font-bold">
      {stats?.totalVerses}
    </p>
  </div>

  <div className="bg-yellow-100 p-6 rounded-xl shadow">
    <h3 className="text-lg font-semibold">
      📖 Doha
    </h3>
    <p className="text-3xl font-bold">
      {stats?.totalDoha}
    </p>
  </div>

  <div className="bg-green-100 p-6 rounded-xl shadow">
    <h3 className="text-lg font-semibold">
      📜 Chaupai
    </h3>
    <p className="text-3xl font-bold">
      {stats?.totalChaupai}
    </p>
  </div>

  <div className="bg-blue-100 p-6 rounded-xl shadow">
    <h3 className="text-lg font-semibold">
      🕉️ Shlok
    </h3>
    <p className="text-3xl font-bold">
      {stats?.totalShlok}
    </p>
  </div>

  <div className="bg-purple-100 p-6 rounded-xl shadow">
    <h3 className="text-lg font-semibold">
      ✍️ Soratha
    </h3>
    <p className="text-3xl font-bold">
      {stats?.totalSoratha}
    </p>
  </div>

  <div className="bg-pink-100 p-6 rounded-xl shadow">
    <h3 className="text-lg font-semibold">
      🎼 Chhand
    </h3>
    <p className="text-3xl font-bold">
      {stats?.totalChhand}
    </p>
  </div>

</div>

}
      </div>

        <h2 className="text-3xl font-bold text-center mb-8 text-orange-700">
          Manage Verses
        </h2>

        {verses.length === 0 ? (

          <p className="text-center text-gray-500">
            No verses found
          </p>

        ) : (

          verses.map((item) => (

            <div
              key={item.id}
              className="
                mb-10 border border-orange-100
                rounded-2xl p-4 bg-orange-50
              "
            >

              {/* Kand */}
              <h3 className="text-lg font-semibold mb-3 text-orange-700">
                {kandNames[item.kand] || item.kand}
              </h3>

              {/* Verse */}
            <VerseCard
  id={item.id}
  type={item.type}
  text={item.text}
  transliteration={item.transliteration}
  arth={item.arth}
  english={item.english}
  kandKey={item.kand}
  showAdminActions={false}
/>

              {/* Actions */}
              <div className="flex justify-center gap-4 mt-4">

                {/* Edit */}
                <button
                  onClick={() =>
                    navigate(`/admin/edit/${item.id}`)
                  }
                  className="
                    px-4 py-2 rounded-lg
                    bg-blue-500 text-white
                    hover:bg-blue-600 transition
                  "
                >
                  Edit
                </button>

                {/* Delete */}
                <button
                  onClick={() =>
                    handleDelete(item.id)
                  }
                  className="
                    px-4 py-2 rounded-lg
                    bg-red-500 text-white
                    hover:bg-red-600 transition
                  "
                >
                  Delete
                </button>

              </div>

            </div>
          ))

        )}

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


      </div>
    </>
  );
}