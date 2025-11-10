import { useState } from "@wordpress/element";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");

  // === Đăng nhập ===
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/index.php?rest_route=/rocket/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        const token = data.token;
        const role = data.data.role;
        const userId = data.data.id;

        localStorage.setItem("jwt", token);
        localStorage.setItem("rocket_token", token);
        localStorage.setItem("user_id", userId);

        // Xác định role_id
        let roleId = 1;
        if (role === "manager") roleId = 2;
        if (role === "employee") roleId = 3;

        // Lưu cookie
        document.cookie = `role_id=${roleId}; path=/; max-age=3600`;
        document.cookie = `rocket_token=${token}; path=/; max-age=3600`;

        setMessage("✅ Đăng nhập thành công!");
        if (role === "employee" || role === "admin") {
          window.location.href = "/orbit-me";
        } else if (role === "manager") {
          window.location.href = "/orbit-core";
        }
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (err) {
      setMessage("Lỗi server: " + err.message);
    }
  };

  // === Quên mật khẩu ===
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotMessage("⏳ Đang xử lý...");
    try {
      const res = await fetch("/index.php?rest_route=/rocket/v1/forgot_password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await res.json();

      if (data.success) {
        setForgotMessage("✅ Đã gửi mật khẩu mới tới email của bạn!");
      } else {
        setForgotMessage("❌ " + (data.message || "Không thể gửi email"));
      }
    } catch (err) {
      setForgotMessage("⚠️ Lỗi server: " + err.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      {/* Left side */}
      <div style={{ flex: 1 }}>
        <img
          src="https://static.vecteezy.com/system/resources/previews/021/259/194/non_2x/hand-drawn-astronaut-in-spacesuit-playing-basketball-doing-dunk-move-over-space-rocket-and-planets-vector.jpg"
          alt="Company"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Right side */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f9fafb",
          padding: "40px",
        }}
      >
        <div style={{ width: "100%", maxWidth: "360px" }}>
          <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
            🚀 Rocket Login
          </h2>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email công ty"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            />
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                background: "#0073aa",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Đăng nhập
            </button>
          </form>

          {/* ✅ Nút Quên mật khẩu */}
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <button
              onClick={() => setShowForgot(true)}
              style={{
                background: "none",
                border: "none",
                color: "#0073aa",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Quên mật khẩu?
            </button>
          </div>

          {message && (
            <p style={{ marginTop: "15px", textAlign: "center", color: "red" }}>
              {message}
            </p>
          )}
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="border-0 bg-slate-800/50 backdrop-blur-xl shadow-2xl w-full max-w-sm">
            <div className="p-8 sm:p-10">
              <div className="mb-8 text-center">
                <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500">
                  <span className="text-xl">🔐</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Quên mật khẩu</h2>
              </div>

              <form onSubmit={handleForgotPassword} className="space-y-5">
                <div className="space-y-2.5">
                  <label className="text-sm font-medium text-slate-300">Email công ty</label>
                  <Input
                    type="email"
                    placeholder="your@company.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-amber-400 focus:ring-amber-400/20"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold h-11"
                >
                  Gửi mật khẩu mới
                </Button>
              </form>

              {forgotMessage && (
                <div
                  className={`mt-5 p-3.5 rounded-lg text-sm text-center font-medium ${
                    forgotMessage.includes("✅") ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {forgotMessage}
                </div>
              )}

              <Button
                onClick={() => setShowForgot(false)}
                variant="outline"
                className="w-full mt-6 border-slate-600 text-slate-300 hover:bg-slate-700/50"
              >
                Đóng
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
