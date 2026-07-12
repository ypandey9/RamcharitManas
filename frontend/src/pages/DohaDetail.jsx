import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ramayanData from "../data/ramayanData";

export default function DohaDetail() {
  const { name, id } = useParams();

  const dohas = ramayanData[name] || [];

  const selectedDoha = dohas.find(d => d.id === parseInt(id));

  if (!selectedDoha) {
    return <p className="text-center mt-10">Doha not found</p>;
  }

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-3xl mx-auto">

        {/* Doha */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-orange-100">

          <h2 className="text-xl font-bold text-center mb-6 text-secondary">
            दोहा {selectedDoha.id}
          </h2>

          <p className="text-xl leading-relaxed text-center font-medium mb-6">
            {selectedDoha.doha}
          </p>

          <div className="border-t my-6"></div>

          <h3 className="text-lg font-semibold mb-2 text-secondary">
            अर्थ
          </h3>

          <p className="text-gray-700 leading-relaxed text-justify">
            {selectedDoha.arth}
          </p>

        </div>

      </div>
    </>
  );
}