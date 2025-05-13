import { FiArrowUpRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
    
    const navigate = useNavigate(); // ✅ bu satırı ekle
    
  return (
    <div className="w-[280px] sm:w-[320px] lg:w-[340px] flex-shrink-0 snap-start">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="relative">
                <img 
                    src={project.image || "/projectimg1.png"} 
                    alt="Project" 
                    className="w-full h-[160px] sm:h-[180px] object-cover" 
                />
                <span className="absolute top-3 left-3 px-3 py-1.5 bg-indigo-600 text-white text-xs sm:text-sm rounded-full font-medium">
                    {project.category}
                </span>
            </div>
            <div className="p-4 sm:p-6">
                <div className="justify-between items-start gap-3">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">{project.title}</h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">{project.description}</p>
                    <button 
                        onClick={() => navigate(`/project/${project._id}`)} 
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <FiArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProjectCard;
