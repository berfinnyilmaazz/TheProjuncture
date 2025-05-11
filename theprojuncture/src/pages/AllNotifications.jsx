import React from "react";
import { useGetAllNotificationsQuery } from "../redux/slices/api/userApiSlice";
import ViewNotification from "../components/ViewNotification";
import { useLocation } from "react-router-dom";

const AllNotifications = () => {
  const { data: allNotifications = [] } = useGetAllNotificationsQuery();

  const location = useLocation();


  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-xl font-semibold mb-4">Tüm Bildirimler</h2>
      {allNotifications.length === 0 ? (
        <p className="text-gray-500">Hiç bildirim bulunamadı.</p>
      ) : (
        allNotifications.map((noti) => (
          <ViewNotification key={noti._id} notification={noti} />
        ))
      )}
    </div>
  );
};

export default AllNotifications;
