import { useState } from '@wordpress/element'
import { useForm, Controller } from 'react-hook-form'
import { Input, Button, Alert } from 'antd'
import axios from 'axios'

export default function ContactFormVoucher() {
  const {
    control,
    handleSubmit,
    reset
  } = useForm({
    mode: 'onChange',
    defaultValues: { name: '', phone: '' }
  })

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  // Regex chuẩn số điện thoại Việt Nam
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
      {/* Container chính màu đỏ với hiệu ứng tia sáng (radial-gradient) */}
      <div 
        className="relative flex flex-col md:flex-row items-center justify-between p-6 md:p-10 overflow-hidden"
        style={{
          // 1. Kết hợp cả màu nền và hình ảnh nền
          backgroundColor: '#F7151F', 
          backgroundImage: ` url('https://duomen.rocketdigital.solutions/wp-content/uploads/2026/01/image-30.png')`,
          //http://localhost:8000/wp-content/uploads/2026/01/image-30.png
          //https://duomen.rocketdigital.solutions/wp-content/uploads/2026/01/image-30.png
          
          // 2. Hòa trộn hình ảnh với màu đỏ (Multiply giúp màu đỏ phủ lên các chi tiết ảnh)
          backgroundBlendMode: 'multiply',
          
          // 3. Căn chỉnh hình ảnh
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          
          borderRadius: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}
      >
        {/* Hình ảnh trang trí (Nhân vật & Nhà thuốc) */}
        <div className="w-full md:w-1/2 flex justify-start items-end relative z-10 mb-6 ml-10 md:mb-0">
          <img 
            src="https://duomen.rocketdigital.solutions/wp-content/uploads/2026/01/Layer-1-1.png" 
            //http://localhost:8000/wp-content/uploads/2026/01/Layer-1-1.png
            //https://duomen.rocketdigital.solutions/wp-content/uploads/2026/01/Layer-1-1.png
            alt="DuoMen Decor" 
            className="w-full max-w-[180px] object-contain"
          />
        </div>

        {/* Cột chứa Form */}
        <div className="w-full  z-20">
          <h2 className="text-white text-2xl md:text-[32px] font-bold text-center mb-6 drop-shadow-md">
            Đăng ký nhận mẫu thử <span className="text-cyan-300">DuoMen</span>
          </h2>

          {success && (
            <Alert message="Gửi thành công!" type="success" showIcon className="mb-4 rounded-lg" />
          )}
          {error && (
            <Alert message={errorMessage} type="error" showIcon className="mb-4 rounded-lg" />
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 justify-center">
            <style>{`
              .duomen-input {
                height: 50px !important;
                width: 80% !important;
                border-radius: 50px !important;
                border: none !important;
                font-size: 16px !important;
                padding: 0 25px !important;
                margin-left: 40px !important;
                box-shadow: inset 0 2px 4px rgba(0,0,0,0.1) !important;
              }
              .duomen-input::placeholder {
                color: #999 !important;
                
              }
              .duomen-btn {
                height: 40px !important;
                background-color: #2e3690 !important;
                border: none !important;
                border-radius: 50px !important;
                font-size: 18px !important;
                font-weight: bold !important;
                margin-top: 10px !important;
                transition: all 0.3s !important;
                width: 30% !important;
                margin-left: 40px !important;
              }
              .duomen-btn:hover {
                background-color: #1e2460 !important;
                transform: translateY(-2px);
              }
            `}</style>

            {/* INPUT TÊN */}
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Vui lòng nhập tên' }}
              render={({ field, fieldState }) => (
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="Họ và tên"
                    className="duomen-input"
                    status={fieldState.error ? 'error' : ''}
                  />
                  {fieldState.error && (
                    <span className="text-yellow-300 text-[12px] absolute -bottom-5 left-5">
                      {fieldState.error.message}
                    </span>
                  )}
                </div>
              )}
            />

            {/* INPUT SỐ ĐIỆN THOẠI */}
            <Controller
              name="phone"
              control={control}
              rules={{
                required: 'Số điện thoại nhận mã Voucher',
                validate: (value) => vnf_regex.test(value) || 'Số điện thoại không hợp lệ'
              }}
              render={({ field, fieldState }) => (
                <div className="relative mt-2">
                  <Input
                    {...field}
                    type="tel"
                    placeholder="Số điện thoại nhận mã Voucher"
                    className="duomen-input"
                    status={fieldState.error ? 'error' : ''}
                    maxLength={10}
                    onChange={(e) => field.onChange(e.target.value.replace(/[^0-9]/g, ''))}
                  />
                  {fieldState.error && (
                    <span className="text-yellow-300 text-[12px] absolute -bottom-5 left-5">
                      {fieldState.error.message}
                    </span>
                  )}
                </div>
              )}
            />

            {/* NÚT GỬI */}
            <Button
              htmlType="submit"
              loading={loading}
              type="primary"
              className="duomen-btn"
            >
              {loading ? "Đang xử lý..." : "Nhận ngay"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}