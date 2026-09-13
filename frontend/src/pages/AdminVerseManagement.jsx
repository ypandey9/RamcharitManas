import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  getDashbaseStats
} from "../services/verseService";


export default function AdminVerseManagement() {

  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  // ==========================================
  // Load Dashboard Statistics
  // ==========================================

  useEffect(() => {

    const loadStats = async () => {

      try {

        const data =
          await getDashbaseStats();

        setStats(data);

      } catch (error) {

        console.error(
          "Failed to load dashboard statistics:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    loadStats();

  }, []);


  // ==========================================
  // Loading
  // ==========================================

  if (loading) {

    return (
      <>
        <Navbar />

        <p className="text-center mt-10">
          Loading dashboard...
        </p>

      </>
    );

  }


  // ==========================================
  // UI
  // ==========================================

  return (
    <>
      <Navbar />

      <div
        className="
          p-6
          max-w-5xl
          mx-auto
        "
      >

        {/* =====================================
            Dashboard Title
        ====================================== */}

        <h1
          className="
            text-3xl
            font-bold
            text-center
            mb-10
            text-orange-700
          "
        >
          Dashboard
        </h1>


        {/* =====================================
            Statistics
        ====================================== */}

        {stats && (

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-6
              mb-12
            "
          >

            {/* Total Verses */}

            <div
              className="
                bg-orange-100
                p-6
                rounded-xl
                shadow
                text-center
              "
            >

              <h3 className="text-lg font-semibold">
                📚 Total Verses
              </h3>

              <p className="text-3xl font-bold mt-2">
                {stats.totalVerses}
              </p>

            </div>


            {/* Doha */}

            <div
              className="
                bg-yellow-100
                p-6
                rounded-xl
                shadow
                text-center
              "
            >

              <h3 className="text-lg font-semibold">
                📖 Doha
              </h3>

              <p className="text-3xl font-bold mt-2">
                {stats.totalDoha}
              </p>

            </div>


            {/* Chaupai */}

            <div
              className="
                bg-green-100
                p-6
                rounded-xl
                shadow
                text-center
              "
            >

              <h3 className="text-lg font-semibold">
                📜 Chaupai
              </h3>

              <p className="text-3xl font-bold mt-2">
                {stats.totalChaupai}
              </p>

            </div>


            {/* Shlok */}

            <div
              className="
                bg-blue-100
                p-6
                rounded-xl
                shadow
                text-center
              "
            >

              <h3 className="text-lg font-semibold">
                🕉️ Shlok
              </h3>

              <p className="text-3xl font-bold mt-2">
                {stats.totalShlok}
              </p>

            </div>


            {/* Soratha */}

            <div
              className="
                bg-purple-100
                p-6
                rounded-xl
                shadow
                text-center
              "
            >

              <h3 className="text-lg font-semibold">
                ✍️ Soratha
              </h3>

              <p className="text-3xl font-bold mt-2">
                {stats.totalSoratha}
              </p>

            </div>


            {/* Chhand */}

            <div
              className="
                bg-pink-100
                p-6
                rounded-xl
                shadow
                text-center
              "
            >

              <h3 className="text-lg font-semibold">
                🎼 Chhand
              </h3>

              <p className="text-3xl font-bold mt-2">
                {stats.totalChhand}
              </p>

            </div>

          </div>

        )}


        {/* =====================================
            Verse Management
        ====================================== */}

        <div
          className="
            text-center
            border-t
            border-orange-100
            pt-10
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              text-orange-700
              mb-4
            "
          >
            Manage Verses
          </h2>


          <p
            className="
              text-gray-500
              mb-6
            "
          >
            Search for a verse to edit or delete it.
          </p>


          <button
            onClick={() =>
              navigate("/search")
            }
            className="
              px-6
              py-3
              rounded-xl
              bg-orange-500
              text-white
              font-semibold
              hover:bg-orange-600
              transition
              shadow
            "
          >
            🔍 Search & Manage Verses
          </button>

        </div>

      </div>

    </>
  );
}