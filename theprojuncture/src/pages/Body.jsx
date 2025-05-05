import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useGetAllUsersQuery } from '../redux/slices/api/userApiSlice';
import { useGetAllProjectsQuery } from '../redux/slices/api/projectApiSlice';

// import logo from '/logo2.png';

export default function Body() {

    const navigate = useNavigate(); // ✅ bu satırı ekle

    const settings = {
        dots: true,
        infinite: true, 
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1 
      };

    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsToShow = 3; // Aynı anda 3 card göstermek için
    

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex + 1 < projects.length - itemsToShow + 1 ? prevIndex + 1 : 0
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex - 1 >= 0 ? prevIndex - 1 : projects.length - itemsToShow
        );
    };



    const setting = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1 
      };

    const [current, setCurrent] = useState(0);
    const itemToShow = 3; // Aynı anda 3 card göstermek için

    const prev = () => {
        setCurrent((prevIndex) => 
            prevIndex - 1 >= 0 ? prevIndex - 1 : projects.length - itemToShow
        );
    }

    const next = () => {
        setCurrent((prevIndex) => 
            prevIndex - 1 >= 0 ? prevIndex - 1 : projects.length - itemToShow
        );
    }




    const set = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1 
      };

    const [currIndex, setCurrIndex] = useState(0);
    const itemtoShow = 1;

    const prevS = () => {
        setCurrIndex((prevIndex) => 
            prevIndex - 1 >= 0 ? prevIndex - 1 : users.length - itemtoShow
        );
    }

    const nextS = () => {
        setCurrIndex((prevIndex) => 
            prevIndex - 1 >= 0 ? prevIndex - 1 : users.length - itemtoShow
        );
    }

    const { data: users = [], isLoading } = useGetAllUsersQuery();
    const { data: projects = [], isLoading: isProjectsLoading } = useGetAllProjectsQuery();



    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <section className="relative w-full bg-white overflow-hidden py-8">
                {dat.slice(currIndex, currIndex + itemtoShow).map((b, ind) => (
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8" key={ind}>
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                            {/* Image Container */}
                            <div className="w-full lg:w-1/2 transform transition-all duration-500 hover:scale-105">
                                <img 
                                    src={b.img} 
                                    alt="" 
                                    className="w-full h-[200px] sm:h-[300px] lg:h-[400px] object-cover rounded-2xl shadow-2xl"
                                />
                            </div>
                            {/* Content Container */}
                            <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6 text-center lg:text-left">
                                <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-600 font-medium text-sm rounded-full">
                                    {b.text}
                                </span>
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                                    {b.explanation}
                                </h2>
                                <a 
                                    href="#" 
                                    className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-indigo-600 text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                >
                                    Hemen Başla
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
                {/* Navigation Arrows - Hidden on mobile */}
                <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 w-full pointer-events-none">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between pointer-events-auto">
                            <button 
                                onClick={prevS} 
                                className="p-2 sm:p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-xl hover:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <FiChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
                            </button>
                            <button 
                                onClick={nextS} 
                                className="p-2 sm:p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-xl hover:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <FiChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Profiles Section */}
            <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
                        Senin için Önerilen Profiller
                    </h1>
                    <div className="relative">
                        <div className="flex gap-4 sm:gap-6 snap-x overflow-x-auto snap-mandatory scrollbar-hide pb-4 -mx-4 px-4">
                        {users.slice(current, current + itemToShow).map((user, i) => (
                            <div key={user._id || i} className="w-[280px] sm:w-[320px] lg:w-[340px] flex-shrink-0 snap-start">
                                <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <img 
                                    src="/profileimg.png"
                                    className="w-full h-[160px] sm:h-[180px] object-cover"
                                    alt={user.name}
                                />
                                <div className="p-4 sm:p-6">
                                    <h5 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">{user.name}</h5>
                                    <p className="text-sm sm:text-base text-gray-600 mb-4">{user.title || 'Meslek bilgisi yok'}</p>
                                    <button
                            onClick={() => navigate(`/profile/${user._id}`)}
                            className="w-full px-4 py-2 sm:px-6 sm:py-3 bg-indigo-600 text-white text-sm sm:text-base rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg"
                            >
                            Profili Görüntüle
                            </button>

                                </div>
                                </div>
                            </div>
                            ))}
                        </div>
                        {/* Navigation Arrows - Hidden on mobile */}
                        


                    </div>
                    
                </div>
                <div className="relative hidden sm:block">
                        <button 
                            onClick={prev} 
                            className="absolute top-[%10] left-[10px] p-2 sm:p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-xl hover:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-10"
                        >
                            <FiChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
                        </button>
                        <button 
                            onClick={next} 
                            className="absolute top-1/2 right-[10px] -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-xl hover:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-10"
                        >
                            <FiChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
                        </button>
                    </div>
            </section>

            {/* Projects Section */}
            <section className="py-12 sm:py-16 lg:py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
                        Senin için Önerilen Projeler
                    </h1>
                    <div className="relative">
                        <div className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4">
                            {projects.slice(currentIndex, currentIndex + itemsToShow).map((a, index) => (
                                <div key={index} className="w-[280px] sm:w-[320px] lg:w-[340px] flex-shrink-0 snap-start">
                                    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                        <div className="relative">
                                            <img 
                                                src={a.image || "/projectimg1.png"} 
                                                alt="Project" 
                                                className="w-full h-[160px] sm:h-[180px] object-cover" 
                                            />
                                            <span className="absolute top-3 left-3 px-3 py-1.5 bg-indigo-600 text-white text-xs sm:text-sm rounded-full font-medium">
                                                {a.category}
                                            </span>
                                        </div>
                                        <div className="p-4 sm:p-6">
                                            <div className="justify-between items-start gap-3">
                                                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">{a.title}</h2>
                                                <p className="text-sm sm:text-base text-gray-600 mb-4">{a.description}</p>
                                                <button 
                                                    onClick={() => navigate(`/project/${a._id}`)} 
                                                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                >
                                                    <FiArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Navigation Arrows - Hidden on mobile */}
                        <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 w-full pointer-events-none">
                            <div className="container mx-auto px-4">
                                <div className="flex justify-between pointer-events-auto">
                                    <button 
                                        onClick={prevSlide} 
                                        className="p-2 sm:p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-xl hover:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <FiChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
                                    </button>
                                    <button 
                                        onClick={nextSlide} 
                                        className="p-2 sm:p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-xl hover:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <FiChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}





const dat = [
    {
        id : 1,
        img : `/projectimg1.png`,
        text : `Lorem, ipsum dolor.`,
        explanation : `Lorem ipsum dolor sit amet.`
    },
    {
        id : 2,
        img : `/projectimg2.png`,
        text : `Lorem, ipsum dolor.`,
        explanation : `Lorem ipsum dolor sit amet.`
    },
    {
        id : 3,
        img : `/projectimg3.png`,
        text : `Lorem, ipsum dolor.`,
        explanation : `Lorem ipsum dolor sit amet.`
    }
]