import { useEffect, useState } from '@wordpress/element'
import { useForm, Controller } from 'react-hook-form'
import { Input, Button, Row, Col, Alert } from 'antd'
import axios from 'axios'

export default function ContactForm() {
  const [propsData, setPropsData] = useState<any>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    }
  })

  // 🔥 LOAD DATA-PROPS TỪ PHP
  useEffect(() => {
    const el = document.getElementById("contact-page-data")
    if (el) {
      const json = el.getAttribute("data-props")
      if (json) {
        setPropsData(JSON.parse(json))
      }
    }
  }, [])

  if (!propsData) return null // đợi PHP load

  const f = propsData.fields

  const onSubmit = async (values: any) => {
    setShowSuccess(false)
    setError(undefined)
    setIsSubmitting(true)

    try {
      await axios.post('/index.php?rest_route=/duomen/v1/save-contact', values)
      setShowSuccess(true)
      reset()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Row justify="start"  gutter={[40, 40]} >

      {/* ================= FORM ================= */}
      <Col xs={24} md={12} style={{ marginTop: 80 }}>

        {showSuccess && (
          <Alert message="Gửi thành công!" type="success" showIcon className="mb-4" />
        )}

        {error && (
          <Alert message={error} type="error" showIcon className="mb-4" />
        )}

        <form onSubmit={handleSubmit(onSubmit)}>

          <style>
            {`
              .contact-input {
                height: 35px;
                border-radius: 8px !important;
                font-size: 16px;
                margin-bottom: 18px;
              }
                .contact-input::placeholder {
                padding-left: 8px; /* ml-2 */
                }
            `}
          </style>

          {/* NAME */}
          <label className="font-medium text-[16px]">{f.name_label}</label>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input
                {...field}
                placeholder={f.name_placeholder}
                className="contact-input"
              />
            )}
          />

          {/* EMAIL */}
          <label className="font-medium text-[16px]">{f.email_label}</label>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                {...field}
                placeholder={f.email_placeholder}
                className="contact-input"
              />
            )}
          />

          {/* PHONE */}
          <label className="font-medium text-[16px]">{f.phone_label}</label>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <Input
                {...field}
                placeholder={f.phone_placeholder}
                type="number"
                className="contact-input"
              />
            )}
          />

          <Button
            htmlType="submit"
            loading={isSubmitting}
            style={{
              height: 52,
              width: "50%",
              borderRadius: 8,
              background: "#2E3690",
              color: "white",
              fontSize: 17,
              fontWeight: 600,
            }}
            
          >
            {isSubmitting ? "Đang gửi…" : propsData.button_text}
          </Button>
        </form>
      </Col>

      {/* ================= IMAGE / RIGHT SIDE ================= */}
      <Col xs={24} md={10} >
        <img
          src={propsData.image}
          alt="contact info"
          style={{
            width: "100%",
            maxWidth: 480,
            borderRadius: 12
          }}
        />
      </Col>

    </Row>
  )
}
