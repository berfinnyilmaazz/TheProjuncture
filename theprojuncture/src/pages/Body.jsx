import React, { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useGetAllUsersQuery } from '../redux/slices/api/userApiSlice';
import { useGetAllProjectsQuery } from '../redux/slices/api/projectApiSlice';
import { useSelector } from "react-redux";

export default function Body() {

    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate(); // ✅ bu satırı ekle
    const cardRefs = useRef([]);
    const sliderRef = useRef(null);


    const settings = {
        dots: true,
        infinite: true, 
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1 
      };

    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsToShow = 4; // Aynı anda 3 card göstermek için
    

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + 1 < filteredProjects.length ? prevIndex + 1 : prevIndex
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
        slidesToShow: 4,
        slidesToScroll: 1 
      };

    const [current, setCurrent] = useState(0);
    const itemToShow = 4; // Aynı anda 3 card göstermek için

    const prev = () => {
        setCurrent((prevIndex) => 
            prevIndex - 1 >= 0 ? prevIndex - 1 : projects.length - itemToShow
        );
    }

    const next = () => {
        setCurrent((prevIndex) => 
            prevIndex + 1 < filteredUsers.length ? prevIndex + 1 : prevIndex
        );
    }

    const set = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1 
    };

    const { data: users = [], isLoading } = useGetAllUsersQuery();
    const { data: projects = [], isLoading: isProjectsLoading } = useGetAllProjectsQuery();

    const filteredUsers = users.filter(u => u._id !== user?._id);
    const filteredProjects = projects.filter(p => p.owner !== user?._id);

    // Sonsuz scroll efekti için listeyi uzatıyoruz
    const extendedProjects = [...filteredProjects, ...filteredProjects.slice(0, itemsToShow)];
    const extendedUsers = [...filteredUsers, ...filteredUsers.slice(0, itemsToShow)];



    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <section className="relative w-full bg-white overflow-hidden py-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                    {/* Logo */}
                    <div className="w-full lg:w-1/2 flex justify-center transform transition-all duration-500 hover:scale-105">
                        <img 
                        src="/logo2.png" 
                        alt="Projuncture Logo" 
                        className="w-full max-w-[400px] h-auto object-contain rounded-2xl shadow-2xl"
                        />
                    </div>

                    {/* İçerik */}
                    <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6 text-center lg:text-left">
                        <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-600 font-medium text-sm rounded-full">
                        Kendi Projeni Yayınla
                        </span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                        Yeteneğini Projeye Dönüştür!
                        </h2>
                        <a 
                        href="/publish-project" 
                        className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-indigo-600 text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                        >
                        Hemen Başla
                        </a>
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
                        <div className="flex gap-4 sm:gap-6 snap-x overflow-hidden snap-mandatory scrollbar-hide pb-4 -mx-4 px-4">
                        {extendedUsers.slice(current, current + itemToShow).map((user, i) => (
                            <div key={user._id || i} className="w-[280px] sm:w-[320px] lg:w-[340px] flex-shrink-0 snap-start">
                                <div  className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ">
                                    <div className="flex justify-center mt-6">                                   
                                        <img 
                                            src={user.avatar || "/profileimg.png"}
                                            className="w-40 h-40 rounded-full object-cover" 
                                            alt={user.name}
                                        />
                                    </div>
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
                    </div>                   
                </div>
                {/* Navigation Arrows - Hidden on mobile */}

                <div className="relative hidden sm:block">
                    <button 
                        onClick={prev} 
                        className="absolute top-[%10] left-[10px] p-2 sm:p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-xl hover:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-10"
                    >
                        <FiChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
                    </button>
                    <button 
                        onClick={next} 
                        className="absolute top-[%10] right-[10px] p-2 sm:p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-xl hover:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-10"
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
                        <div className="flex gap-4 sm:gap-6 overflow-hidden snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4">
                            {extendedProjects.slice(currentIndex, currentIndex + itemsToShow).map((a, index) => (
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
                        {/* <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 w-full pointer-events-none">
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
                        </div> */}
                    </div>
                </div>
                <div className="relative hidden sm:block">
                    <button 
                        onClick={prevSlide} 
                        className="absolute top-[%10] left-[10px] p-2 sm:p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-xl hover:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-10"
                    >
                        <FiChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
                    </button>
                    <button 
                        onClick={nextSlide} 
                        className="absolute top-[%10] right-[10px] p-2 sm:p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-xl hover:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-10"
                    >
                        <FiChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
                    </button>
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