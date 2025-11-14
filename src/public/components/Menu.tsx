import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (

      <div className="flex items-center justify-between py-8 px-6 relative">

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex gap-10 text-[18px] font-bold text-gray-700 ml-auto space-x-6 mr-10">
          <a href="#" className="text-[#2E3690]">TRANG CHỦ</a>
          <a href="#" className="hover:text-[#2E3690]">Duo<span className="font-normal">men</span> BỤNG YÊN RUỘT ỔN</a>
          <a href="#" className="hover:text-[#2E3690]">CÂU HỎI THƯỜNG GẶP</a>
          <a href="#" className="hover:text-[#2E3690]">LIÊN HỆ</a>
        </nav>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden absolute top-4 right-4 z-50 text-gray-800"
        >
          {open ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>

        {/* MOBILE MENU - SLIDE FROM RIGHT */}
        <div
          className={`fixed top-0 right-0 h-full w-[70%] bg-white shadow-lg px-6 py-10 
                      transform transition-transform duration-300 z-40
                      flex flex-col space-y-6 text-[18px] font-bold text-gray-700 md:hidden
                      ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <a href="#" className="hover:text-[#2E3690]">TRANG CHỦ</a>
          <a href="#" className="hover:text-[#2E3690]">Duo<span className="font-normal">men</span> BỤNG YÊN RUỘT ỔN</a>
          <a href="#" className="hover:text-[#2E3690]">CÂU HỎI THƯỜNG GẶP</a>
          <a href="#" className="hover:text-[#2E3690]">LIÊN HỆ</a>
        </div>

        {/* OVERLAY background mờ */}
        {open && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
            onClick={() => setOpen(false)}
          ></div>
        )}
      </div>
  );
}
