import { useRef, useState } from "react";

import Navbar from "../components/Navbar";
import { addVerse } from "../services/verseService";


const kandOptions = [
  "bal_kand",
  "ayodhya_kand",
  "aranya_kand",
  "kishkindha_kand",
  "sundar_kand",
  "lanka_kand",
  "uttar_kand"
];


const typeOptions = [
  "doha",
  "chaupai",
  "shlok",
  "soratha",
  "chhand"
];


export default function AdminPage() {

  const [isSaving, setIsSaving] =
    useState(false);

  const isSubmitting =
    useRef(false);


  const [formData, setFormData] =
    useState({
      kand: "bal_kand",
      type: "shlok",
      text: "",
      transliteration: "",
      arth: "",
      english: ""
    });


  // ==========================================
  // Handle Input Changes
  // ==========================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    // ==========================================
    // Validate Required Fields
    // ==========================================

    if (
      !formData.text.trim() ||
      !formData.transliteration.trim() ||
      !formData.arth.trim() ||
      !formData.english.trim()
    ) {

      alert(
        "Please fill all required fields."
      );

      return;
    }


    // ==========================================
    // Prevent Double Submission
    // ==========================================

    if (isSubmitting.current) {

      return;

    }


    isSubmitting.current = true;

    setIsSaving(true);


    try {

      // ========================================
      // Prepare Verse
      // ========================================

      const newVerse = {

        id: Date.now(),

        kand: formData.kand,

        type: formData.type,

        text:
          formData.text
            .split("\n")
            .filter(
              line =>
                line.trim() !== ""
            ),

        transliteration:
          formData.transliteration
            .split("\n")
            .filter(
              line =>
                line.trim() !== ""
            ),

        arth: formData.arth,

        english: formData.english

      };


      // ========================================
      // Save Verse
      // ========================================

      await addVerse(newVerse);


      alert(
        "Verse Added Successfully"
      );


      // ========================================
      // Reset Text Fields
      // Keep Kand and Type
      // ========================================

      setFormData(prev => ({

        ...prev,

        text: "",

        transliteration: "",

        arth: "",

        english: ""

      }));


    } catch (error) {

      console.error(
        "Failed to add verse:",
        error
      );

      alert(
        "Failed to add verse"
      );


    } finally {

      isSubmitting.current = false;

      setIsSaving(false);

    }

  };


  // ==========================================
  // UI
  // ==========================================

  return (
    <>
      <Navbar />


      <div
        className="
          max-w-4xl
          mx-auto
          p-6
        "
      >

        <h2
          className="
            text-3xl
            font-bold
            text-center
            mb-8
            text-orange-700
          "
        >
          Add Ramcharitmanas Verse
        </h2>


        <form
          onSubmit={handleSubmit}
          className="
            bg-white
            p-8
            rounded-2xl
            shadow-lg
            border
            border-orange-100
          "
        >


          {/* =====================================
              Kand
          ====================================== */}

          <div className="mb-6">

            <label
              className="
                block
                font-semibold
                mb-2
              "
            >
              Select Kand
            </label>


            <select
              name="kand"
              value={formData.kand}
              onChange={handleChange}
              className="
                w-full
                border
                rounded-lg
                p-3
              "
            >

              {kandOptions.map(
                (kand) => (

                  <option
                    key={kand}
                    value={kand}
                  >
                    {kand}
                  </option>

                )
              )}

            </select>

          </div>


          {/* =====================================
              Type
          ====================================== */}

          <div className="mb-6">

            <label
              className="
                block
                font-semibold
                mb-2
              "
            >
              Verse Type
            </label>


            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="
                w-full
                border
                rounded-lg
                p-3
              "
            >

              {typeOptions.map(
                (type) => (

                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>

                )
              )}

            </select>

          </div>


          {/* =====================================
              Original Text
          ====================================== */}

          <div className="mb-6">

            <label
              className="
                block
                font-semibold
                mb-2
              "
            >
              Original Verse
            </label>


            <textarea
              name="text"
              value={formData.text}
              onChange={handleChange}
              rows="5"
              placeholder="One line per row"
              required
              className="
                w-full
                border
                rounded-lg
                p-3
              "
            />

          </div>


          {/* =====================================
              Transliteration
          ====================================== */}

          <div className="mb-6">

            <label
              className="
                block
                font-semibold
                mb-2
              "
            >
              Transliteration
            </label>


            <textarea
              name="transliteration"
              value={
                formData.transliteration
              }
              onChange={handleChange}
              rows="5"
              placeholder="Roman transliteration"
              required
              className="
                w-full
                border
                rounded-lg
                p-3
              "
            />

          </div>


          {/* =====================================
              Hindi Arth
          ====================================== */}

          <div className="mb-6">

            <label
              className="
                block
                font-semibold
                mb-2
              "
            >
              Hindi Arth
            </label>


            <textarea
              name="arth"
              value={formData.arth}
              onChange={handleChange}
              rows="4"
              required
              className="
                w-full
                border
                rounded-lg
                p-3
              "
            />

          </div>


          {/* =====================================
              English
          ====================================== */}

          <div className="mb-6">

            <label
              className="
                block
                font-semibold
                mb-2
              "
            >
              English Translation
            </label>


            <textarea
              name="english"
              value={formData.english}
              onChange={handleChange}
              rows="4"
              required
              className="
                w-full
                border
                rounded-lg
                p-3
              "
            />

          </div>


          {/* =====================================
              Submit
          ====================================== */}

          <div
            className="
              flex
              justify-center
            "
          >

            <button
              type="submit"
              disabled={isSaving}
              className={`
                px-8
                py-3
                rounded-full
                text-white
                transition

                ${
                  isSaving
                    ? `
                      bg-gray-400
                      cursor-not-allowed
                    `
                    : `
                      bg-orange-500
                      hover:bg-orange-600
                    `
                }
              `}
            >

              {isSaving
                ? "Saving..."
                : "Save Verse"
              }

            </button>

          </div>

        </form>

      </div>
    </>
  );
}