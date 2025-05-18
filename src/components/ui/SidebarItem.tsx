import type { ReactElement } from "react";

const SidebarItem = ({ text, icon }: { text: string; icon: ReactElement }) => {
  return (
    <div className="flex items-center gap-5 pl-4 p-3 cursor-pointer hover:bg-sidebar-300 rounded-md m-2 transition duration-1200 ">
      <div>{icon}</div>
      <div>{text}</div>
    </div>
  );
};

export default SidebarItem;
