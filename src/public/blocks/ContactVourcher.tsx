import { useState } from '@wordpress/element'
import { useForm, Controller } from 'react-hook-form'
import { Input, Button, Alert } from 'antd'
import axios from 'axios'

export default function ContactFormVoucher() {
  const { control, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues: { name: '', phone: '' }
  })

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/;

  const onSubmit = async (values) => {
    setSuccess(false)
    setError(false)
    setErrorMessage('')
    setLoading(true)

    try {
      const response = await axios.post('/index.php?rest_route=/duomen/v1/send-voucher', values)
      if (response.data.status === 'success') {
        setSuccess(true)
        reset()
      } else {
        setError(true)
        setErrorMessage(response.data.message || 'Có lỗi xảy ra khi gửi tin nhắn.')
      }
    } catch (e) {
      setError(true)
      setErrorMessage(e.response?.data?.message || e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[900px] mx-auto my-10 relative">
      <div 
        className="relative flex flex-col md:flex-row items-center justify-between p-6 md:p-10 overflow-hidden"
        style={{
          backgroundColor: '#F7151F', 
          backgroundImage: `url('https://duomen.rocketdigital.solutions/wp-content/uploads/2026/01/image-30.png')`,
          backgroundBlendMode: 'multiply',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}
      >
        <div className="w-full md:w-1/3 flex justify-start items-end relative z-10 mb-6 md:mb-0">
          <img 
            src="https://duomen.rocketdigital.solutions/wp-content/uploads/2026/01/Layer-1-1.png" 
            alt="DuoMen Decor" 
            className="w-full max-w-[180px] object-contain"
          />
        </div>

        <div className="w-full md:w-2/3 z-20 text-white">
          {!success ? (
            <>
              <h2 className="text-white text-2xl md:text-[32px] font-bold text-center mb-6 drop-shadow-md">
                Đăng ký nhận mẫu thử <span className="text-cyan-300">DuoMen</span>
              </h2>

              {error && (
                <Alert message={errorMessage} type="error" showIcon className="mb-4 rounded-lg" />
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <style>{`
                  .duomen-input { 
                    height: 50px !important; 
                    border-radius: 50px !important; 
                    border: none !important; 
                    font-size: 16px !important; 
                    padding: 0 25px !important; 
                    box-shadow: inset 0 2px 4px rgba(0,0,0,0.1) !important; 
                    width: 100% !important; 
                  }
                  .duomen-btn { 
                    height: 45px !important; 
                    background-color: #2e3690 !important; 
                    border: none !important; 
                    border-radius: 50px !important; 
                    font-size: 18px !important; 
                    font-weight: bold !important; 
                    transition: all 0.3s !important; 
                    min-width: 150px !important; /* Đổi thành min-width để linh hoạt hơn */
                    white-space: nowrap !important;
                  }
                  .duomen-btn:hover { background-color: #1e2460 !important; transform: translateY(-2px); }
                  
                  .term-link {
                    display: inline-block;
                    padding: 10px 20px; /* Tăng padding để chiều cao tương đương nút Nhận ngay */
                    border: 1px solid rgba(255,255,255,0.6);
                    border-radius: 30px;
                    color: white;
                    font-size: 13px;
                    font-weight: 600;
                    text-transform: uppercase;
                    text-align: center;
                    transition: all 0.3s;
                    text-decoration: none;
                    white-space: nowrap; /* Giữ chữ trên 1 dòng nếu màn hình đủ rộng */
                    height: 45px; /* Cố định chiều cao bằng nút Nhận ngay */
                    line-height: 22px; /* Căn giữa chữ theo chiều dọc */
                    box-sizing: border-box;
                  }
                  .term-link:hover {
                    background-color: white;
                    color: #F7151F;
                    border-color: white;
                  }
                `}</style>

                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Vui lòng nhập tên' }}
                  render={({ field, fieldState }) => (
                    <div className="relative mb-2">
                      <Input {...field} placeholder="Họ và tên" className="duomen-input" status={fieldState.error ? 'error' : ''} />
                      {fieldState.error && <span className="text-yellow-300 text-[12px] absolute -bottom-5 left-5">{fieldState.error.message}</span>}
                    </div>
                  )}
                />

                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: 'Số điện thoại nhận mã Voucher',
                    validate: (value) => vnf_regex.test(value) || 'Số điện thoại không hợp lệ'
                  }}
                  render={({ field, fieldState }) => (
                    <div className="relative mb-2">
                      <Input {...field} type="tel" placeholder="Số điện thoại nhận mã Voucher" className="duomen-input" status={fieldState.error ? 'error' : ''} maxLength={10} onChange={(e) => field.onChange(e.target.value.replace(/[^0-9]/g, ''))} />
                      {fieldState.error && <span className="text-yellow-300 text-[12px] absolute -bottom-5 left-5">{fieldState.error.message}</span>}
                    </div>
                  )}
                />

                {/* --- KHU VỰC CÁC NÚT BẤM (Đã chỉnh flex-row) --- */}
                <div className="flex flex-col xl:flex-row items-center justify-center gap-3 mt-4 w-full">
                    {/* Nút Nhận Ngay */}
                    <Button htmlType="submit" loading={loading} type="primary" className="duomen-btn w-full xl:w-auto">
                      {loading ? "..." : "Nhận ngay"}
                    </Button>

                    {/* Nút Điều Khoản */}
                    <a 
                        href="/term-voucher/" 
                        // target="_blank" 
                        rel="noreferrer"
                        className="term-link w-full xl:w-auto"
                    >
                        Xem chi tiết về điều khoản & điều kiện
                    </a>
                </div>

              </form>
            </>
          ) : (
            <div className="text-left animate-fade-in">
              <h2 className="text-white text-2xl font-bold mb-4 uppercase">Đăng ký thành công!</h2>
              <p className="mb-4">Cảm ơn bạn đã đăng ký nhận mẫu thử DuoMen.</p>
              <p className="mb-4 text-sm leading-relaxed">
                Mã đổi mẫu thử sẽ được gửi qua Zalo. Vui lòng kiểm tra tin nhắn Zalo (từ Zalo Official Account của chương trình) để nhận mã code đổi mẫu thử tại Pharmacity.
              </p>
              
              <div className="bg-white/10 p-4 rounded-xl border border-white/20 mb-4">
                <p className="font-bold mb-2">(**) Lưu ý quan trọng:</p>
                <ul className="list-disc ml-5 text-sm space-y-1">
                  <li>Mã chỉ được sử dụng 01 lần</li>
                  <li>Áp dụng tại hệ thống nhà thuốc Pharmacity (TP.HCM & Hà Nội)</li>
                  <li>Thời hạn sử dụng mã: đến hết 31/03/2026</li>
                </ul>
              </div>

              <div className="text-sm">
                <p className="font-bold mb-1">(**) Chưa nhận được mã? Vui lòng kiểm tra:</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Bạn đang sử dụng Zalo với số điện thoại đã đăng ký</li>
                  <li>Không chặn tin nhắn từ Zalo Official Account</li>
                </ul>
              </div>

              <p className="mt-6 font-medium italic">
                Cảm ơn bạn đã quan tâm và trải nghiệm DuoMen 💙 Chúc bạn luôn có một hệ tiêu hóa khỏe, Bụng yên – Ruột ổn!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}