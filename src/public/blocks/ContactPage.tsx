
import { useForm } from 'react-hook-form'
import Checkbox from '../elements/Checkbox'
import { useState, useEffect } from '@wordpress/element'
import axios from "axios"

type ContactFormProps = {
  label?: string
  info_options?: string[]
}

export default function ContactForm(_props: ContactFormProps) {
  const [error, setError] = useState<string>()
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [infoOptions, setInfoOptions] = useState<string[]>([])
  const [infoLabel, setInfoLabel] = useState('Your new website needs to:')
  const [infoLabelmss, setInfoLabelmss] = useState('Your design requirements')
  const [isProject, setIsProject] = useState(false)
  const [isContact, setIsContact] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      company: '',
      jobTitle: '',
      website: '',
      requirement: '',
      info: []
    }
  })

  useEffect(() => {
    const url = window.location.pathname.toLowerCase()

    if (url.includes('/drop-us/')) {
      setIsProject(true)
      setInfoLabelmss('Your message')
    } else if (url.includes('/start-project/')) {
      setInfoLabelmss('Your requirements')
      setIsContact(true)
    } else if (url.includes('/web') || url.includes('/website')) {
      setInfoLabel('Your new website needs to:')
    } else if (url.includes('/create') || url.includes('/creative-production')) {
      setInfoLabel('What projects can we help you produce?')
    } else {
      setInfoLabel('Your new website needs to:')
    }
  }, [])

  useEffect(() => {
    const el = document.querySelector('.wp-rocket-block-contact-form')
    const rawOptions = el?.getAttribute('data-info-options') || ''
    const parsed = rawOptions
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean)
    setInfoOptions(parsed)
  }, [])

  const onSubmit = (values: Record<string, any>) => {
    setError(undefined)
    setIsSubmitting(true)
    setShowSuccess(false)

    const payload = {
      ...values,
      job: values.info.join(', '),
      pagesubmit: window.location.href,           // full URL
      website_path: window.location.pathname      // chỉ path sau domain
    }

    // 👇 Log ra console để kiểm tra
    console.log('📩 Data gửi lên API:', payload)

    axios.post('/index.php?rest_route=/rocket/v1/save-contact', payload)
      .then(() => setShowSuccess(true))
      .catch(e => setError(e.message))
      .finally(() => setIsSubmitting(false))
  }

  const handleNewForm = () => {
    reset()
    setShowSuccess(false)
  }

  return (
    <div>
      {showSuccess ? (
        <div className="mb-5">
          <div className="text-green-600 font-semibold text-lg mb-4">Form saved</div>
          <button
            onClick={handleNewForm}
            className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition"
          >
            Fill New Form
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full px-[50px] lg:px-0">

              <div className="flex flex-col md:flex-row gap-5 mb-[50px]">
                <input
                  {...register('name')}
                  className="form-control w-full md:w-1/2"
                  placeholder="Your Name"
                  type="text"
                />
                <input
                  {...register('email')}
                  className="form-control w-full md:w-1/2"
                  placeholder="Email"
                  type="text"
                />
                <input
                  {...register('phone')}
                  className="form-control w-full md:w-1/2"
                  placeholder="Phone Number"
                  type="number"
                />
              </div>
 
          </div>



          <div className="">
            <div className="flex items-center w-full lg:justify-start justify-between">
                {/* Đường kẻ - chỉ hiện ở mobile */}
                <div className="flex-1 border-b-2 border-gray-500 mr-4 lg:hidden w-[800px]"></div>

                {/* Nút SEND US */}
                <button
                disabled={isSubmitting}
                className="mr-[50px] lg:mr-0 group relative bg-black px-5 py-[22px] text-white overflow-hidden transition-all duration-300 hover:text-black z-0 disabled:opacity-50"
                type="submit"
                >
                <span className="absolute inset-0 bg-white transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-in-out z-[-1]"></span>
                <span className="relative flex items-center">
                    <span className="mr-2">
                    {isSubmitting ? 'SENDING...' : 'SEND US'}
                    </span>
                </span>
                </button>
            </div>
          </div>

        </form>
      )}
    </div>
  )
}
