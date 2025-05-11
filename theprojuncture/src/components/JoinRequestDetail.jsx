import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useApproveJoinRequestMutation,
  useGetProjectByIdQuery,
  useRejectJoinRequestMutation,
} from "../redux/slices/api/projectApiSlice";
import { toast } from "react-toastify";
import { FaRegUserCircle } from "react-icons/fa";
import { useGetUserByIdQuery } from "../redux/slices/api/userApiSlice";

const JoinRequestDetail = ({ userId, projectId }) => {
  const navigate = useNavigate();
  const [approveJoinRequest, { isLoading: isApproving }] = useApproveJoinRequestMutation();
  const [rejectJoinRequest, { isLoading: isRejecting }] = useRejectJoinRequestMutation();
  const { data: userData } = useGetUserByIdQuery(userId);
  const { data: projectData } = useGetProjectByIdQuery(projectId);


  const handleApprove = async () => {
    try {
      await approveJoinRequest({ id: projectId, userId }).unwrap();
      toast.success("Katılım isteği onaylandı.");
    } catch (err) {
      toast.error("Onaylama başarısız.");
    }
  };

  const handleReject = async () => {
    try {
      await rejectJoinRequest({ id: projectId, userId }).unwrap();
      toast.info("İstek reddedildi.");
    } catch (err) {
      toast.error("Reddetme başarısız.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-xl w-full max-w-md mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <FaRegUserCircle className="text-4xl text-indigo-500" />
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            Katılım Talebi
          </h3>
          <p className="text-gray-500">
            {userData?.name || "Bir kullanıcı"}, {projectData?.title || "bir"} projenize katılmak istiyor.
          </p>

        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4">
        <button
          onClick={() => navigate(`/profile/${userId}`)}
          className="flex-1 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg transition"
        >
          Profili Gör
        </button>

        <button
          onClick={handleApprove}
          disabled={isApproving}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
        >
          {isApproving ? "Onaylanıyor..." : "Onayla"}
        </button>

        <button
          onClick={handleReject}
          disabled={isRejecting}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
        >
          {isRejecting ? "Reddediliyor..." : "Reddet"}
        </button>
      </div>
    </div>
  );
};

export default JoinRequestDetail;
