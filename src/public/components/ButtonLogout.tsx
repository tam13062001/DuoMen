import { useState } from "@wordpress/element";

export default function LogoutButton() {
  const [message, setMessage] = useState("");

    const handleLogout = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
        const res = await fetch("/index.php?rest_route=/rocket/v1/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        });

        const data = await res.json();

        if (data.success) {
        // ❌ Xóa token
        localStorage.removeItem("token");
        document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // ❌ Xóa role_id
        document.cookie =
            "role_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        setMessage("Đã logout thành công!");
        
        // ✅ Về trang chủ (front-page)
        window.location.href = "/";
        } else {
        setMessage("Logout thất bại: " + data.message);
        }
    } catch (err) {
        console.error("Logout error:", err);
        setMessage("Có lỗi xảy ra khi logout");
    }
    };


  return (
    <div
      style={{   fontFamily: "sans-serif" }}
    >
      <button
        onClick={handleLogout}
        style={{
          padding: "8px 16px",
          borderRadius: "6px",
          background: "#ef4444",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
}
