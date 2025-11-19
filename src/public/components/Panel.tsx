import { useState, useRef, useEffect } from "react";
import { PhoneCall } from "lucide-react";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  // --- CLICK OUTSIDE HANDLER ---
  useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);
  // ------------------------------

  return (
    <div className="fixed bottom-[30%] right-0 z-50">

      {/* ICON KHI CHƯA MỞ */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-[#E41E25] text-white p-3 rounded-l-full shadow-lg flex"
        >
          <PhoneCall className="lg:w-6 lg:h-6 w-4 h-4" />
        </button>

        
      )}

      {/* PANEL KHI MỞ */}
      {open && (
        <div
          ref={panelRef}
          className="flex flex-col space-y-3"
        >
          <button
            className="flex items-center bg-[#E41E25] text-white rounded-l-full pl-3 pr-5 py-2 shadow-md"
            onClick={() => (window.location.href = "/contact")}
          >
            <PhoneCall className="w-5 h-5 mr-2" />
            <span className="font-semibold">Để lại thông tin liên hệ</span>
          </button>
        </div>
      )}
    </div>
  );
}
