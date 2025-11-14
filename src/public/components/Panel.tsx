import { useState } from "react";
import { Video, PhoneCall, MessageCircle } from "lucide-react";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-[100px] right-0 z-50 flex flex-col space-y-3">

      {/* 3 ICON — khi đóng panel */}
      {!open && (
        <>
          <button
            onClick={() => setOpen(true)}
            className="bg-[#E41E25] text-white p-3 rounded-l-full shadow-lg"
          >
            <Video className="w-6 h-6" />
          </button>

          <button
            onClick={() => setOpen(true)}
            className="bg-[#E41E25] text-white p-3 rounded-l-full shadow-lg"
          >
            <PhoneCall className="w-6 h-6" />
          </button>

          <button
            onClick={() => setOpen(true)}
            className="bg-[#E41E25] text-white p-3 rounded-l-full shadow-lg"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        </>
      )}

      {/* PANEL — khi mở */}
      {open && (
        <div className="flex flex-col space-y-3">

          {/* 1 Video Call */}
          <button
            className="flex items-center bg-[#E41E25] text-white rounded-l-full pl-3 pr-5 py-2 shadow-md"
            onClick={() => setOpen(false)}
          >
            <Video className="w-5 h-5 mr-2" />
            <span className="font-semibold">
              Video call
              <span className="text-[13px] opacity-80"> (trong giờ hành chính)</span>
            </span>
          </button>

          {/* 2 Để lại thông tin liên hệ */}
          <button
            className="flex items-center bg-[#E41E25] text-white rounded-l-full pl-3 pr-5 py-2 shadow-md"
            onClick={() => setOpen(false)}
          >
            <PhoneCall className="w-5 h-5 mr-2" />
            <span className="font-semibold">Để lại thông tin liên hệ</span>
          </button>

          {/* 3 Chat với tư vấn viên */}
          <button
            className="flex items-center bg-[#E41E25] text-white rounded-l-full pl-3 pr-5 py-2 shadow-md"
            onClick={() => setOpen(false)}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            <span className="font-semibold">Chat với tư vấn viên</span>
          </button>

        </div>
      )}
    </div>
  );
}
