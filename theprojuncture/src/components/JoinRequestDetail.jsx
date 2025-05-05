import React from "react";
import { useNavigate } from "react-router-dom";
import { useApproveJoinRequestMutation, useRejectJoinRequestMutation } from "../redux/slices/api/projectApiSlice";
import { toast } from "react-toastify";

const JoinRequestDetail = ({ userId, projectId }) => {
  const navigate = useNavigate();
  const [approveJoinRequest, { isLoading: isApproving }] = useApproveJoinRequestMutation();
  const [rejectJoinRequest, { isLoading: isRejecting }] = useRejectJoinRequestMutation();

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
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">
        Bu kullanıcı projene katılmak istiyor:
      </h3>

      <div className="flex gap-3">
        <button
          onClick={() => navigate(`/profile/${userId}`)}
          className="text-indigo-600 underline font-medium"
        >
          Profili Gör
        </button>

        <button
          onClick={handleApprove}
          disabled={isApproving}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isApproving ? "Onaylanıyor..." : "Onayla"}
        </button>

        <button
          onClick={handleReject}
          disabled={isRejecting}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isRejecting ? "Reddediliyor..." : "Reddet"}
        </button>
      </div>
    </div>
  );
};

export default JoinRequestDetail;
