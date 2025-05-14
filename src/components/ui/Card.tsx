import Share from "../../icon/Share";


export interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}



const Card = ({ title, link, type }: CardProps) => {
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
        {type === "youtube" && (
          <iframe
            className="w-full aspect-video rounded-md overflow-hidden "
            src={link.replace("watch?v=", "embed/")}
            title=""
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {type === "twitter" && (
          <div className="w-full  max-w-full">
            <blockquote className="twitter-tweet w-full ">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
