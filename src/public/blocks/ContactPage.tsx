import { useState } from '@wordpress/element'
import { useForm, Controller } from 'react-hook-form'
import { Input, Button, Alert } from 'antd'
import axios from 'axios'

export default function ContactForm() {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { name: '', email: '', phone: '' }
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

  const InputField = ({ name, label, placeholder, rules = {} }: any) => (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <Input {...field} placeholder={placeholder} className="contact-input" />
        )}
      />
    </div>
  )

  return (
    <div className="w-full">
      <h2 className="text-[20px] font-bold text-[#2E3690] mb-4">
        Liên hệ ngay với chúng tôi
      </h2>

      {success && <Alert message="Gửi thành công!" type="success" showIcon className="mb-3" />}
      {error && <Alert message={error} type="error" showIcon className="mb-3" />}

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">

        <style>{`
          .contact-input {
            height: 44px;
            border-radius: 10px !important;
            font-size: 15px;
            padding-left: 10px;
          }
        `}</style>

        {/* Bắt buộc */}
        <InputField
          name="name"
          label="Tên của bạn"
          placeholder="Nhập tên của bạn"
          rules={{ required: 'Vui lòng nhập tên' }}
        />

        {/* KHÔNG BẮT BUỘC */}
        <InputField
          name="email"
          label="Email (không bắt buộc)"
          placeholder="Nhập email nếu có"
          rules={{
            validate: (value: string) =>
              !value || /^\S+@\S+\.\S+$/.test(value) || 'Email không hợp lệ'
          }}
        />

        {/* Bắt buộc */}
        <InputField
          name="phone"
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          rules={{ required: 'Vui lòng nhập số điện thoại' }}
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
          {loading ? "Đang gửi..." : "Gửi tin nhắn"}
        </Button>
      </form>
    </div>
  )
}
