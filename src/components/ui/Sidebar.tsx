import Logo from "../../icon/Logo";
import Twitter from "../../icon/Twitter";
import YoutubeIcon from "../../icon/YoutubeIcon";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <div className="h-screen bg-white border-r w-72 fixed left-0 top-0  border-none">
      <div className="flex justify-center  p-10 gap-2 items-center bg-cyan-300 pb-5">
        <div>
            <Logo/>
        </div>
        
        <h1 className="text-4xl">Brainly</h1>
      </div>
      <div className="pt-4 pl-4 bg-cyan-300 h-full">
        <SidebarItem text="Twitter" icon={<Twitter />} />

        <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
      </div>
    </div>
  );
};

export default Sidebar;
