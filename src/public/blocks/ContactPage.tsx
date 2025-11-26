import { useState } from '@wordpress/element'
import { useForm, Controller } from 'react-hook-form'
import { Input, Button, Alert } from 'antd'
import axios from 'axios'

const { TextArea } = Input

export default function ContactForm() {
  const {
    control,
    handleSubmit,
    reset
  } = useForm({
    mode: 'onChange',
    defaultValues: { name: '', email: '', phone: '', note: '' }
  })

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (values: any) => {
    setSuccess(false)
    setError(undefined)
    setLoading(true)

    try {
      await axios.post('/index.php?rest_route=/duomen/v1/save-contact', values)
      setSuccess(true)
      reset()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <h2 className="text-[20px] font-bold text-[#2E3690] mb-4">
        Yêu cầu tư vấn
      </h2>

      {success && (
        <Alert
          message="Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm."
          type="success"
          showIcon
          className="mb-3"
        />
      )}

      {error && <Alert message={error} type="error" showIcon className="mb-3" />}

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">

        <style>{`
          .contact-input {
            height: 44px;
            border-radius: 10px !important;
            font-size: 15px;
            padding-left: 10px;
          }

          .contact-textarea {
            border-radius: 10px !important;
            font-size: 15px;
            padding-left: 10px;
            padding-top: 5px;
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
                placeholder="Nhập tên của bạn"
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

        {/* EMAIL */}
        <Controller
          name="email"
          control={control}
          rules={{
            validate: (value: string) =>
              !value || /^\S+@\S+\.\S+$/.test(value) || 'Email không hợp lệ'
          }}
          render={({ field, fieldState }) => (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email (không bắt buộc)
              </label>
              <Input
                {...field}
                placeholder="Nhập email nếu có"
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

        {/* ✅ SỐ ĐIỆN THOẠI */}
        <Controller
          name="phone"
          control={control}
          rules={{
            required: 'Vui lòng nhập số điện thoại',
            validate: (value: string) => {
              if (!/^[0-9]*$/.test(value)) {
                return 'Số điện thoại chỉ được chứa chữ số'
              }

              if (value.length <= 5) {
                return 'Số điện thoại phải lớn hơn 5 số'
              }

              if (value.length >= 11) {
                return 'Số điện thoại phải nhỏ hơn 10 số'
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
                inputMode="numeric"
                placeholder="Nhập số điện thoại"
                className="contact-input"
                status={fieldState.error ? 'error' : ''}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault()
                  }
                }}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '')
                  field.onChange(value)
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

        {/* <Controller
          name="note"
          control={control}
          rules={{ required: 'Vui lòng nhập tin nhắn của bạn' }}
          render={({ field, fieldState }) => (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Lời nhắn <span className="text-red-800">*</span>
              </label>
              <TextArea
                {...field}
                rows={4}
                placeholder="Nhập tin nhắn của bạn"
                className="contact-textarea"
                status={fieldState.error ? 'error' : ''}
              />
              {fieldState.error && (
                <span className="text-red-500 text-[13px]">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          )}
        /> */}

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
          {loading ? "Đang gửi..." : "Gửi yêu cầu"}
        </Button>
      </form>
    </div>
  )
}
