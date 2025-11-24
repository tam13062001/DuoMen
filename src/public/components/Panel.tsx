import { useState, useRef, useEffect } from "react";
import { PhoneCall, X } from "lucide-react";
import ContactForm from "../blocks/ContactPage"; // đường dẫn tùy project bạn

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  // CLICK NGOÀI ĐỂ ĐÓNG
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
      {/* BUTTON FLOAT */}
      <div className="fixed bottom-[10%] right-0 z-50">
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="bg-[#E41E25] text-white p-3 rounded-l-full shadow-lg flex"
          >
            <PhoneCall className="lg:w-6 lg:h-6 w-4 h-4" />
          </button>
        )}
      </div>

      {/* POPUP OVERLAY */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
          
          {/* MODAL */}
          <div
            ref={modalRef}
            className="bg-white rounded-xl p-6 w-[95%] max-w-[850px] lg:max-w-[650px] relative animate-scale-in"
          >
            {/* NÚT ĐÓNG */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <X size={22} />
            </button>

            {/* FORM CỦA BẠN */}
            <ContactForm />
          </div>
        </div>
      )}
    </>
  );
}
