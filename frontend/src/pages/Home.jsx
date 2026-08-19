import Navbar from "../components/Navbar";
import KandCard from "../components/KandCard";
import { getBookmarks } from "../services/bookmarkService";
import { useEffect, useState } from "react";

import { getReadingProgress }
from "../services/readingProgressService";

import ContinueReadingCard
from "../components/ContinueReadingCard";

export default function Home() {



const kands = [
  { name: "बालकाण्ड", key: "bal_kand" },
  { name: "अयोध्याकाण्ड", key: "ayodhya_kand" },
  { name: "अरण्यकाण्ड", key: "aranya_kand" },
  { name: "किष्किंधाकाण्ड", key: "kishkindha_kand" },
  { name: "सुन्दरकाण्ड", key: "sundar_kand" },
  { name: "लंकाकाण्ड", key: "lanka_kand" },
  { name: "उत्तरकाण्ड", key: "uttar_kand" },
  { name: "श्रीमद्भगवद्गीता", key: "shree_mad_bhagvat_geeta" }
];

  return (
    <>
      <Navbar />
  
      <div className="p-6">
        
        <h2 className="text-center text-2xl font-bold text-secondary mb-6">
          काण्ड चयन करें
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {kands.map((k, i) => (
            <KandCard key={i} name={k.name} keyName={k.key} />
          ))}
        </div>

      </div>
    </>
  );
}