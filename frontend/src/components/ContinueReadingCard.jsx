import { useNavigate } from "react-router-dom";

import kandNames from "../data/kandNames";

import verseTypes from "../utils/verseTypes";

export default function ContinueReadingCard({

    progress

}) {

    const navigate = useNavigate();

    return (

        <div className="bg-white rounded-3xl shadow-lg border border-orange-100 p-8 h-full">

            <h2 className="text-2xl font-bold text-orange-700 mb-6">

                📖 Continue Reading

            </h2>

            <p className="text-xl font-bold text-center">

                {kandNames[progress.currentKand]}

            </p>

            <p className="text-center text-orange-700 font-semibold mt-2">

                {verseTypes[progress.currentVerseType]}

            </p>

            <div className="border-t my-5"></div>

            <div className="text-center italic text-gray-700 leading-relaxed">

                {progress.currentVerseText?.map(

                    (line, index) => (

                        <p key={index}>

                            {line}

                        </p>

                    )

                )}

            </div>

            <div className="mt-6">

                <p className="text-sm text-gray-500">

                    Last Read

                </p>

                <p>

                    {new Date(

                        progress.lastRead

                    ).toLocaleString("en-IN", {

                        dateStyle: "medium",

                        timeStyle: "short"

                    })}

                </p>

            </div>

            <div className="mt-6">

                <div className="flex justify-between text-sm">

                    <span>

                        Reading Progress

                    </span>

                    <span>

                        {progress.progressPercentage}%

                    </span>

                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mt-2">

                    <div

                        className="bg-orange-500 h-3 rounded-full"

                        style={{

                            width:

                                `${progress.progressPercentage}%`

                        }}

                    ></div>

                </div>

                <p className="text-center mt-2 text-sm">

                    {progress.totalReadVerses}

                    {" / "}

                    {progress.totalVerses}

                    {" verses completed"}

                </p>

            </div>

            <button

                onClick={() =>

                    navigate(

                        `/kand/${progress.currentKand}/${progress.currentVerseId}`

                    )

                }

                className="mt-8 w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-semibold transition"

            >

                Continue Reading →

            </button>

        </div>

    );

}