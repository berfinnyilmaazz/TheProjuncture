import { useSearchParams } from "react-router-dom";
import { useGetAllProjectsQuery } from "../redux/slices/api/projectApiSlice";
import { useGetAllUsersQuery } from "../redux/slices/api/userApiSlice";
import ProjectCard from "../components/ProjectCard";
import UserCard from "../components/UserCard";

const SearchResults = () => {
  const [params] = useSearchParams();
  const q = params.get("q")?.toLowerCase() || "";

  const { data: projects = [] } = useGetAllProjectsQuery();
  const { data: users = [] } = useGetAllUsersQuery();

  const filteredProjects = projects.filter(p => p.title.toLowerCase().includes(q));
  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(q));

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h2 className="text-xl font-bold mb-4">Arama Sonuçları: "{q}"</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map(project => (
          <ProjectCard key={project._id} project={project} />
        ))}
        {filteredUsers.map(user => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
