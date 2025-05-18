import Share from "../../icon/Share";
import  { useEffect } from 'react';
import { getTwitterEmbedLink, getYouTubeEmbedUrl } from "./EmbedUtils";


export interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}



const Card = ({ title, link, type }: CardProps) => {

  useEffect(() => {
    if (type === "twitter") {
      // Ensure the Twitter widget script is available
      if ((window as any).twttr && (window as any).twttr.widgets) {
        (window as any).twttr.widgets.load();
      } else {
        // console.warn("Twitter widget script (widgets.js) not loaded. Twitter embeds may not work.");
      }
    }
  }, [link, type]); 

 // Process URLs using the utility functions
  const youtubeEmbedUrl = type === "youtube" ? getYouTubeEmbedUrl(link) : null;
  const twitterLink = type === "twitter" ? getTwitterEmbedLink(link) : "";
 
  // Add these logs for debugging YouTube embeds
  if (type === "youtube") {
    console.log(`[Card Component Debug] YouTube Content:`);
    console.log(`  Title: ${title}`);
    console.log(`  Original Link Prop: ${link}`);
    console.log(`  Generated Embed URL: ${youtubeEmbedUrl}`);
  }

  return (
    <div className=" bg-white rounded-md shadow-md border p-4 border-gray-300 w-85 h-fit overflow-hidden">
      {/*Header*/}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
          <div className="text-gray-500 pr-2">
            <Share size="md" />
          </div>
          {title}
        </div>
        <div className="flex items-center  gap-2 text-gray-500">
          <div className="pr-2">
            <a href={link} target="_blank">
              <Share size="md" />
            </a>
          </div>
          <div className="pr-2">
            <Share size="md" />
          </div>
        </div>
      </div>
      {/*content*/}
      <div>
        <div className=" w-full"></div>
        {type === "youtube" && youtubeEmbedUrl && (
          <iframe
            className="w-full aspect-video rounded-md overflow-hidden "
            src={youtubeEmbedUrl}
            title={title || "YouTube video player"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {/* Show a message if YouTube URL is invalid or not embeddable */}
        {type === "youtube" && !youtubeEmbedUrl && (
          <p className="text-red-500 text-sm">
            Could not display YouTube video. Link might be invalid or not embeddable: <a href={link} target="_blank" rel="noopener noreferrer" className="underline">{link}</a>
          </p>
        )}

        {type === "twitter" && twitterLink && (
          <div className="w-full  max-w-full">
            <blockquote className="twitter-tweet w-full ">
              <p lang="en" dir="ltr">Loading tweet...</p>
              <a href={twitterLink}>Tweet by {title || 'User'}</a>
            </blockquote>
          </div>
        )}
         {/* Show a message if Twitter link is invalid */}
         {type === "twitter" && !twitterLink && (
          <p className="text-red-500 text-sm">
            Could not display Tweet. Link might be invalid: <a href={link} target="_blank" rel="noopener noreferrer" className="underline">{link}</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;
