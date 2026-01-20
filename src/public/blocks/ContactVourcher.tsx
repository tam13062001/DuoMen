import { useState } from '@wordpress/element'
import { useForm, Controller } from 'react-hook-form'
import { Input, Button, Alert } from 'antd'
import axios from 'axios'

export default function ContactFormVourcher() {
  const {
    control,
    handleSubmit,
    reset
  } = useForm({
    mode: 'onChange',
    defaultValues: { name: '', phone: '' }
  })

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false) // Đổi thành boolean hoặc string tuỳ ý
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  // Regex chuẩn số điện thoại Việt Nam (các đầu số mới nhất)
  const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;

  const onSubmit = async (values) => {
    setSuccess(false)
    setError(false)
    setErrorMessage('')
    setLoading(true)

    try {
      // Gọi vào API nội bộ của WordPress (Custom Endpoint)
      // Lưu ý: thay đổi đường dẫn domain nếu cần, hoặc dùng relative path
      const response = await axios.post('/index.php?rest_route=/duomen/v1/send-voucher', values)
      
      if (response.data.status === 'success') {
          setSuccess(true)
          reset()
      } else {
          // Trường hợp eSMS trả lỗi (ví dụ hết tiền, sai số)
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
    <div className="w-full">
      <h2 className="text-[20px] font-bold text-[#2E3690] mb-4">
        Nhận mã xác thực (Test API)
      </h2>

      {success && (
        <Alert
          message="Gửi thành công! Hãy kiểm tra Zalo hoặc SMS."
          type="success"
          showIcon
          className="mb-3"
        />
      )}

      {error && <Alert message={errorMessage} type="error" showIcon className="mb-3" />}

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <style>{`
          .contact-input {
            height: 44px;
            border-radius: 10px !important;
            font-size: 15px;
            padding-left: 10px;
          }
        `}</style>

        {/* TÊN */}
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Vui lòng nhập tên' }}
          render={({ field, fieldState }) => (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Tên của bạn <span className="text-red-800">*</span>
              </label>
              <Input
                {...field}
                placeholder="Nhập tên"
                className="contact-input"
                status={fieldState.error ? 'error' : ''}
              />
              {fieldState.error && (
                <span className="text-red-500 text-[13px]">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          )}
        />

        {/* SỐ ĐIỆN THOẠI (VALIDATE VIỆT NAM) */}
        <Controller
          name="phone"
          control={control}
          rules={{
            required: 'Vui lòng nhập số điện thoại',
            validate: (value) => {
                if (!vnf_regex.test(value)) {
                    return 'Số điện thoại không đúng định dạng Việt Nam'
                }
                return true
            }
          }}
          render={({ field, fieldState }) => (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Số điện thoại <span className="text-red-800">*</span>
              </label>
              <Input
                {...field}
                type="tel"
                placeholder="Ví dụ: 0901888484"
                className="contact-input"
                status={fieldState.error ? 'error' : ''}
                maxLength={10}
                onChange={(e) => {
                  // Chỉ cho nhập số
                  const val = e.target.value.replace(/[^0-9]/g, '')
                  field.onChange(val)
                }}
              />
              {fieldState.error && (
                <span className="text-red-500 text-[13px]">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          )}
        />

        <Button
          htmlType="submit"
          loading={loading}
          className="!h-[46px] !rounded-full !font-semibold"
          style={{
            background: "linear-gradient(135deg, #2E3690, #1067B2)",
            color: "#fff",
            border: "none"
          }}
        >
          {loading ? "Đang xử lý..." : "Gửi OTP"}
        </Button>
      </form>
    </div>
  )
}