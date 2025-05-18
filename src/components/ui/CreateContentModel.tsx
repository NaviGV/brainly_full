import { useRef, useState } from "react";
import React from "react";

import Crossicon from "../../icon/Crossicon";
import Button from "./Button";
import Input from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { extractYouTubeVideoId } from "./EmbedUtils";

interface CreateContentModelProps {
  open: boolean;
  onClose: () => void;
}

const CreateContentModel: React.FC<CreateContentModelProps> = ({
  open,
  onClose,
}) => {
  const titleRef = useRef<HTMLInputElement | null>(null!);
  const linkRef = useRef<HTMLInputElement | null>(null!);

  type ContentType = "youtube" | "twitter";
  const [type, setType] = useState<ContentType>("youtube");
  const [loading, setLoading] = useState(false);

  async function addContent() {
    const title = titleRef.current?.value;
    let link = linkRef.current?.value;
    const token = localStorage.getItem("token");

    if (!title || !link || !type) {
      alert("Please fill in all fields");
      return;
    }

    if (type === "youtube") {
      const videoId = extractYouTubeVideoId(link);
      if (videoId) {
        link = `https://www.youtube.com/embed/${videoId}`;
      } else {
        alert(
          "Invalid YouTube link. Please provide a valid YouTube video URL (e.g., from the address bar or share button)."
        );
        setLoading(false); // Reset loading state if validation fails
        return; // Stop the submission
      }
    }

    console.log("Token being sent:", token);

    try {
      setLoading(true);
      console.log("Sending to backend:", { title, link, type });

      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        { title, link, type },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Content added!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to add content");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-slate-600 fixed top-0 left-0 opacity-70 flex justify-center items-center ">
          <div className="bg-white opacity-100 p-4 rounded">
            <div className="flex-col justify-end">
              <div className="flex justify-end p-2" onClick={onClose}>
                <Crossicon size="lg" />
              </div>

              <div>
                <Input ref={titleRef} placeholder={"Title"} />
                <Input ref={linkRef} placeholder={"Link"} />
              </div>
              <h1 className="flex justify-center m-3">Type</h1>
              <div className="flex justify-center gap-6 my-3">
                <Button
                  text="Youtube"
                  variant={type === "youtube" ? "primary" : "secondary"}
                  onClick={() => setType("youtube")}
                />
                <Button
                  text="Twitter"
                  variant={type === "twitter" ? "primary" : "secondary"}
                  onClick={() => setType("twitter")}
                />
              </div>
              <div className="flex justify-center p-2 mt-1">
                <Button onClick={addContent} variant="primary" text="submit" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateContentModel;
