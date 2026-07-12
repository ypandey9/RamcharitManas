import { useNavigate } from "react-router-dom";

export default function KandCard({ name ,keyName }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/kand/${keyName}`)}
      className="
        bg-white rounded-2xl shadow-md p-6 text-center cursor-pointer
        hover:shadow-xl hover:scale-105 transition duration-300
        border border-orange-100
      "
    >
      <h2 className="text-lg font-semibold text-secondary">
        {name}
      </h2>
    </div>
  );
}