import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/Button";
import CreateContentModel from "./components/ui/CreateContentModel";


import Plusicon from "./icon/Plusicon";
import Share from "./icon/Share";
import Card from "./components/ui/Card";


function App() {

  const [modalOpen , setModalOpen] = useState(true);

  return (
    <>
     <CreateContentModel open ={modalOpen} onClose={()=>{
      setModalOpen(false);
     }} />

      <div className="">
        <div className="flex justify-end-safe mt-5 gap-5 ">
          <Button
            startIcon={<Share size="md" />}
            size="sm"
            variant="primary"
            text="Share"
            onClick={() => {
              setModalOpen(true);
            }}
          />
          <Button
            startIcon={<Plusicon size="md" />}
            size="sm"
            variant="secondary"
            text="Add Content"
          />
        </div>
        <div className="w-full h-px bg-purple-500 my-6" ></div>

        <div  className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-">
          <Card  title="mich clarke with cricket info channel" type="youtube" link="https://www.youtube.com/embed/82oYk8t6abs?si=p-HVjJkxEEGmC8QQ"/>

          <Card title="twitter" type="twitter" link="https://twitter.com/janwhyy/status/1921523420828692691" />

          

         <Card title="twitter" type="twitter" link="https://x.com/VibaliJoshi/status/1860199258051523003" />

         <Card title="twitter" type="twitter" link="https://x.com/VibaliJoshi/status/1860199258051523003" />

         <Card title="twitter" type="twitter" link="https://x.com/VibaliJoshi/status/1860199258051523003" />

         <Card title="twitter" type="twitter" link="https://x.com/VibaliJoshi/status/1860199258051523003" />
        </div>
      </div>
    </>
  );
}

export default App;
