import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  getVerseById,
  updateVerse
} from "../services/verseService";


const typeOptions = [
  "doha",
  "chaupai",
  "shlok",
  "soratha",
  "chhand"
];

export default function EditVersePage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "",
    text: "",
    transliteration: "",
    arth: "",
    english: ""
  });

  // Load verse
  useEffect(() => {

  const loadVerse = async () => {

    try {

      const existing =
        await getVerseById(id);

      setFormData({

        type: existing.type,

        text:
          existing.text?.join("\n") || "",

        transliteration:
          existing.transliteration?.join("\n") || "",

        arth:
          existing.arth || "",

        english:
          existing.english || ""

      });

    } catch(error) {

      console.error(error);
    }
  };

  loadVerse();

}, [id]);


  // Input change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Submit
  const handleSubmit = async (e) => {

  e.preventDefault();

  const updatedVerse = {

    id: Number(id),

    type: formData.type,

    text: formData.text
      .split("\n")
      .filter(line => line.trim() !== ""),

    transliteration:
      formData.transliteration
        .split("\n")
        .filter(line => line.trim() !== ""),

    arth: formData.arth,

    english: formData.english
  };

  try {

    await updateVerse(id, updatedVerse);

    alert("Verse updated successfully");

    navigate("/admin/verses");

  } catch (error) {

    console.error("Update failed:", error);

    alert("Failed to update verse");
  }
};

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">

        <h2 className="text-3xl font-bold text-center mb-8 text-orange-700">
          Edit Verse
        </h2>

        <form
          onSubmit={handleSubmit}
          className="
            bg-white p-8 rounded-2xl
            shadow-lg border border-orange-100
          "
        >

          {/* Type */}
          <div className="mb-6">

            <label className="block font-semibold mb-2">
              Verse Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >

              {typeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}

            </select>

          </div>

          {/* Original Text */}
          <div className="mb-6">

            <label className="block font-semibold mb-2">
              Original Verse
            </label>

            <textarea
              name="text"
              value={formData.text}
              onChange={handleChange}
              rows="5"
              className="w-full border rounded-lg p-3"
            />

          </div>

          {/* Transliteration */}
          <div className="mb-6">

            <label className="block font-semibold mb-2">
              Transliteration
            </label>

            <textarea
              name="transliteration"
              value={formData.transliteration}
              onChange={handleChange}
              rows="5"
              className="w-full border rounded-lg p-3"
            />

          </div>

          {/* Hindi Arth */}
          <div className="mb-6">

            <label className="block font-semibold mb-2">
              Hindi Arth
            </label>

            <textarea
              name="arth"
              value={formData.arth}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-lg p-3"
            />

          </div>

          {/* English */}
          <div className="mb-6">

            <label className="block font-semibold mb-2">
              English Translation
            </label>

            <textarea
              name="english"
              value={formData.english}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-lg p-3"
            />

          </div>

          {/* Submit */}
          <div className="flex justify-center">

            <button
              type="submit"
              className="
                px-8 py-3 rounded-full
                bg-orange-500 text-white
                hover:bg-orange-600 transition
              "
            >
              Update Verse
            </button>

          </div>

        </form>

      </div>
    </>
  );
}