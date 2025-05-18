import { useState } from "react";
import "../App.css";
import { Button } from "../components/ui/Button";
import CreateContentModel from "../components/ui/CreateContentModel";

import Plusicon from "../icon/Plusicon";
import Share from "../icon/Share";
import Card from "../components/ui/Card";
import Sidebar from "../components/ui/Sidebar";
import useContent from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(true);
  const [reload, setReload] = useState(0);
  const token = localStorage.getItem("token");

  const { contents, loading, error } = useContent(reload);

  const handleContentAdded = () => {
    setReload((prev) => prev + 1); // Triggers content re-fetch
    setModalOpen(false); // Close the modal
  };

  return (
    <>
      <Sidebar />
      <div className="p-4 ml-72 min-h-screen bg-gray-100 ">
        <CreateContentModel open={modalOpen} onClose={handleContentAdded} />

        <div className="">
          <div className="flex justify-end-safe mt-5 gap-5 ">
            <Button
              startIcon={<Plusicon size="md" />}
              size="sm"
              variant="secondary"
              text="Add Content"
              onClick={() => {
                setModalOpen(true);
              }}
            />

            <Button
              startIcon={<Share size="md" />}
              size="sm"
              variant="primary"
              text="Share"
              onClick={async () => {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/brain/share`,
                  {
                    share: true,
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                const shareUrl = `http://localhost:8000${response.data.hash}`;
                alert(shareUrl);
              }}
            />
          </div>
          <div className="w-full h-px bg-purple-500 my-6"></div>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 ">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error loading content</p>}

            {!loading &&
              !error &&
              contents.map(({ type, link, title, _id }) => (
                <Card key={_id} title={title} type={type} link={link} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
