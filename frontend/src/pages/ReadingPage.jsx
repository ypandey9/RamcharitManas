import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import VerseCard from "../components/VerseCard";
import { getReadingPage } from "../services/readingPageService";


export default function ReadingPage() {

    const navigate = useNavigate();

    const { name } = useParams();

    const { id } = useParams();

    const [readingPage, setReadingPage] = useState(null);

    useEffect(() => {

        async function loadVerse() {

            try {

const page =
    await getReadingPage(id);

setReadingPage(page);
                
            } catch (error) {

                console.error(error);

            }
        }

        loadVerse();

    }, [id]);

    if (!readingPage) {

        return (
            <>
                <Navbar />
                <p className="text-center mt-10">
                    Loading...
                </p>
            </>
        );
    }

    return (

        <>
            <Navbar />

            <div className="max-w-5xl mx-auto p-6">

                <div className="space-y-8">

                {readingPage.verses.map((verse)=>(

                <VerseCard

                    key={verse.id}

                    id={verse.id}

                    kandKey={verse.kand}

                    type={verse.type}

                    text={verse.text}

                    transliteration={verse.transliteration}

                    arth={verse.arth}

                    english={verse.english}

                />

                ))}

                </div>


<div className="flex justify-between mt-10">

    {readingPage.hasPrevious ? (

        <button
            onClick={() =>
                navigate(
                    `/kand/${name}/${readingPage.previousStartVerseId}`
                )
            }
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl"
        >
            ← Previous
        </button>

    ) : (

        <div />

    )}

    {readingPage.hasNext && (

        <button
            onClick={() =>
                navigate(
                    `/kand/${name}/${readingPage.nextStartVerseId}`
                )
            }
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl"
        >
            Next →
        </button>

    )}

</div>

</div>
        </>

    );
}