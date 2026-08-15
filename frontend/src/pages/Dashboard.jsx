import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/userService";
import ContinueReadingCard from "../components/ContinueReadingCard";
import { getDashboardStats } from "../services/dashboardService";
import { useNavigate } from "react-router-dom";
import kandNames from "../data/kandNames";
import Navbar from "../components/Navbar";


export default function Dashboard() {

    const [user, setUser] = useState(null);
    const [stats,setStats]=useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        async function loadUser() {

            try {

                const data = await getCurrentUser();
                setUser(data);

            } catch (error) {

                console.error(error);

            }

        }

        loadUser();

    }, []);

    useEffect(()=>{

    async function loadStats(){

        try{

            const data=
                await getDashboardStats();

            setStats(data);

        }catch(error){

            console.error(error);

        }

    }

    loadStats();

},[]);

const kandKey = stats?.currentKand;

//console.log("KandKey ",kandKey);

    return (
        <>
        <Navbar />

        <div className="min-h-screen bg-orange-50 py-8">

            

            <div className="max-w-6xl mx-auto px-6">

                {/* Page Heading */}

                <h1 className="text-4xl font-bold text-orange-700 mb-8">

                    👤 My Dashboard

                </h1>

                {user && (

                    <div className="grid lg:grid-cols-2 gap-8">

                        {/* ===========================
                            Profile Card
                        ============================ */}

                        <div
                            className="
                            bg-white
                            rounded-2xl
                            shadow-lg
                            border
                            border-orange-100
                            p-8
                            "
                        >

                            <h2 className="text-2xl font-bold text-orange-700 mb-6">

                                👋 Welcome Back

                            </h2>

                            <div className="space-y-4">

                                <div>

                                    <p className="text-gray-500 text-sm">

                                        Full Name

                                    </p>

                                    <p className="text-2xl font-semibold">

                                        {user.fullName}

                                    </p>

                                </div>

                                <div>

                                    <p className="text-gray-500 text-sm">

                                        Username

                                    </p>

                                    <p className="text-lg">

                                        {user.username}

                                    </p>

                                </div>

                                <div>

                                    <p className="text-gray-500 text-sm">

                                        Email

                                    </p>

                                    <p className="text-lg break-all">

                                        {user.email}

                                    </p>

                                </div>

                            </div>

                            <div className="mt-8">

                                <span
                                    className="
                                    inline-block
                                    px-4
                                    py-2
                                    rounded-full
                                    bg-green-100
                                    text-green-700
                                    font-medium
                                    "
                                >

                                    🟢 Active Reader

                                </span>

                            </div>

                        </div>

                        {/* ===========================
                            Continue Reading
                        ============================ */}

                        <div>

                            {stats ? (

                                <ContinueReadingCard
                                    progress={stats}
                                />

                            ) : (

                                <div
                                    className="
                                    bg-white
                                    rounded-2xl
                                    shadow-lg
                                    border
                                    border-orange-100
                                    p-8
                                    h-full
                                    flex
                                    items-center
                                    justify-center
                                    text-gray-500
                                    "
                                >

                                    📖 Start reading Ramcharitmanas to see your progress.

                                </div>
                                

                            )}

                        </div>


                    </div>

                )}

                            {stats && (

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

<div
onClick={()=>navigate("/bookmarks")} 
className="bg-white rounded-2xl shadow-md p-6 text-center">

<h2 className="text-4xl">🔖</h2>

<p className="mt-3 text-gray-500">

Bookmarks

</p>

<p className="text-3xl font-bold text-orange-700">

{stats.bookmarkCount}

</p>

</div>


<div
onClick={() =>navigate(
    `/kand/${kandKey}`)}
    
className="bg-white rounded-2xl shadow-md p-6 text-center">

<h2 className="text-4xl">

📖

</h2>

<p className="mt-3 text-gray-500">

Current Kand

</p>

<p className="font-semibold">

{kandNames[stats.currentKand]}

</p>

</div>


<div className="bg-white rounded-2xl shadow-md p-6 text-center">

<h2 className="text-4xl">

🕒

</h2>

<p className="mt-3 text-gray-500">

Last Read

</p>

<p>

{stats.lastRead ?

new Date(stats.lastRead).toLocaleDateString()

:

"-"

}

</p>

</div>


<div className="bg-white rounded-2xl shadow-md p-6 text-center">

<h2 className="text-4xl">

📚

</h2>

<p className="mt-3 text-gray-500">

Reading Status

</p>

<p className="text-green-600 font-semibold">

Active Reader

</p>

</div>

</div>

)}

            </div>



        </div>

        </>

    );

}