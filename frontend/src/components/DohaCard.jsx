import { useNavigate, useParams } from "react-router-dom";

export default function DohaCard({ id, doha, arth }) {
  const navigate = useNavigate();
  const { name } = useParams();

  return (
    <div
      onClick={() => navigate(`/kand/${name}/${id}`)}
      className="bg-white p-6 rounded-2xl shadow-md mb-6 border border-orange-100 cursor-pointer hover:shadow-xl transition"
    >
      <p className="text-lg font-medium">{doha}</p>
      <div className="my-3 border-t"></div>
      <p className="text-gray-600">{arth.substring(0, 60)}...</p>
    </div>
  );
}