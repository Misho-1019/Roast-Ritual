import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useCartStore } from '../../stores/cartStore'

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'Afghanistan', 'Albania', 'Algeria', 'Argentina',
  'Armenia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium',
  'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria',
  'Burkina Faso', 'Cambodia', 'Cameroon', 'Chile', 'China', 'Colombia', 'Congo', 'Costa Rica', 'Croatia',
  'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador',
  'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana',
  'Greece', 'Guatemala', 'Guinea', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India',
  'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan',
  'Kazakhstan', 'Kenya', 'Kuwait', 'Laos', 'Latvia', 'Lebanon', 'Libya', 'Liechtenstein', 'Lithuania',
  'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritius', 'Mexico',
  'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nepal',
  'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway',
  'Oman', 'Pakistan', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
  'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saudi Arabia', 'Senegal', 'Serbia', 'Sierra Leone', 'Singapore',
  'Slovakia', 'Slovenia', 'Somalia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname',
  'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Trinidad and Tobago',
  'Tunisia', 'Turkey', 'Turkmenistan', 'Uganda', 'Ukraine', 'United Arab Emirates', 'Uruguay', 'Uzbekistan',
  'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe',
]

const countryCodeMap: Record<string, string> = {
  'United States': 'US', 'Canada': 'CA', 'United Kingdom': 'GB', 'Australia': 'AU',
  'Afghanistan': 'AF', 'Albania': 'AL', 'Algeria': 'DZ', 'Argentina': 'AR', 'Armenia': 'AM',
  'Austria': 'AT', 'Azerbaijan': 'AZ', 'Bahamas': 'BS', 'Bahrain': 'BH', 'Bangladesh': 'BD',
  'Barbados': 'BB', 'Belarus': 'BY', 'Belgium': 'BE', 'Belize': 'BZ', 'Benin': 'BJ', 'Bhutan': 'BT',
  'Bolivia': 'BO', 'Bosnia and Herzegovina': 'BA', 'Botswana': 'BW', 'Brazil': 'BR', 'Brunei': 'BN',
  'Bulgaria': 'BG', 'Burkina Faso': 'BF', 'Cambodia': 'KH', 'Cameroon': 'CM', 'Chile': 'CL',
  'China': 'CN', 'Colombia': 'CO', 'Congo': 'CG', 'Costa Rica': 'CR', 'Croatia': 'HR', 'Cuba': 'CU',
  'Cyprus': 'CY', 'Czech Republic': 'CZ', 'Denmark': 'DK', 'Dominican Republic': 'DO', 'Ecuador': 'EC',
  'Egypt': 'EG', 'El Salvador': 'SV', 'Estonia': 'EE', 'Ethiopia': 'ET', 'Fiji': 'FJ', 'Finland': 'FI',
  'France': 'FR', 'Gabon': 'GA', 'Gambia': 'GM', 'Georgia': 'GE', 'Germany': 'DE', 'Ghana': 'GH',
  'Greece': 'GR', 'Guatemala': 'GT', 'Guinea': 'GN', 'Guyana': 'GY', 'Haiti': 'HT', 'Honduras': 'HN',
  'Hong Kong': 'HK', 'Hungary': 'HU', 'Iceland': 'IS', 'India': 'IN', 'Indonesia': 'ID', 'Iran': 'IR',
  'Iraq': 'IQ', 'Ireland': 'IE', 'Israel': 'IL', 'Italy': 'IT', 'Ivory Coast': 'CI', 'Jamaica': 'JM',
  'Japan': 'JP', 'Jordan': 'JO', 'Kazakhstan': 'KZ', 'Kenya': 'KE', 'Kuwait': 'KW', 'Laos': 'LA',
  'Latvia': 'LV', 'Lebanon': 'LB', 'Libya': 'LY', 'Liechtenstein': 'LI', 'Lithuania': 'LT',
  'Luxembourg': 'LU', 'Madagascar': 'MG', 'Malawi': 'MW', 'Malaysia': 'MY', 'Maldives': 'MV',
  'Mali': 'ML', 'Malta': 'MT', 'Mauritius': 'MU', 'Mexico': 'MX', 'Moldova': 'MD', 'Monaco': 'MC',
  'Mongolia': 'MN', 'Montenegro': 'ME', 'Morocco': 'MA', 'Mozambique': 'MZ', 'Myanmar': 'MM',
  'Namibia': 'NA', 'Nepal': 'NP', 'Netherlands': 'NL', 'New Zealand': 'NZ', 'Nicaragua': 'NI',
  'Niger': 'NE', 'Nigeria': 'NG', 'North Korea': 'KP', 'North Macedonia': 'MK', 'Norway': 'NO',
  'Oman': 'OM', 'Pakistan': 'PK', 'Panama': 'PA', 'Papua New Guinea': 'PG', 'Paraguay': 'PY',
  'Peru': 'PE', 'Philippines': 'PH', 'Poland': 'PL', 'Portugal': 'PT', 'Qatar': 'QA', 'Romania': 'RO',
  'Russia': 'RU', 'Rwanda': 'RW', 'Saudi Arabia': 'SA', 'Senegal': 'SN', 'Serbia': 'RS',
  'Sierra Leone': 'SL', 'Singapore': 'SG', 'Slovakia': 'SK', 'Slovenia': 'SI', 'Somalia': 'SO',
  'South Africa': 'ZA', 'South Korea': 'KR', 'Spain': 'ES', 'Sri Lanka': 'LK', 'Sudan': 'SD',
  'Suriname': 'SR', 'Sweden': 'SE', 'Switzerland': 'CH', 'Syria': 'SY', 'Taiwan': 'TW', 'Tajikistan': 'TJ',
  'Tanzania': 'TZ', 'Thailand': 'TH', 'Togo': 'TG', 'Trinidad and Tobago': 'TT', 'Tunisia': 'TN',
  'Turkey': 'TR', 'Turkmenistan': 'TM', 'Uganda': 'UG', 'Ukraine': 'UA', 'United Arab Emirates': 'AE',
  'Uruguay': 'UY', 'Uzbekistan': 'UZ', 'Vatican City': 'VA', 'Venezuela': 'VE', 'Vietnam': 'VN',
  'Yemen': 'YE', 'Zambia': 'ZM', 'Zimbabwe': 'ZW',
}

export default function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const { items, total, clearCart } = useCartStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: '', zip: '', country: 'United States',
  })

  const updateField = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsLoading(true)
    setError('')

    try {
      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: { name: form.name, email: form.email },
        },
        shipping: {
          name: form.name,
          phone: form.phone,
          address: {
            line1: form.address,
            city: form.city,
            state: form.state,
            postal_code: form.zip,
            country: countryCodeMap[form.country] || 'US',
          },
        },
      })

      if (stripeError) {
        setError(stripeError.message || 'Payment failed')
      } else {
        setSuccess(true)
        clearCart()
        setTimeout(() => navigate('/orders'), 2500)
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (items.length === 0) navigate('/cart')
  }, [items.length, navigate])

  const inputClass = 'w-full bg-background border border-chestnut/50 rounded-lg px-4 py-3 text-on-surface placeholder:text-mocha-text/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all'

  if (success) {
    return (
      <div className="text-center py-12">
        <span className="material-symbols-outlined text-6xl text-green-500 mb-4">check_circle</span>
        <h2 className="text-h2 text-on-surface mb-2">Payment Successful!</h2>
        <p className="text-mocha-text mb-2">Thank you for your order.</p>
        <p className="text-mocha-text text-sm">Redirecting to your orders...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-error/10 border border-error/30 rounded-lg p-3">
          <p className="text-error text-sm">{error}</p>
        </div>
      )}

      <section>
        <h2 className="text-h2 text-on-surface mb-6">Shipping Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="font-small text-mocha-text block mb-2">Full Name</label>
            <input className={inputClass} placeholder="John Doe" required value={form.name} onChange={(e) => updateField('name', e.target.value)} />
          </div>
          <div>
            <label className="font-small text-mocha-text block mb-2">Email</label>
            <input className={inputClass} type="email" placeholder="john@example.com" required value={form.email} onChange={(e) => updateField('email', e.target.value)} />
          </div>
          <div>
            <label className="font-small text-mocha-text block mb-2">Phone</label>
            <input className={inputClass} type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className="font-small text-mocha-text block mb-2">Address</label>
            <input className={inputClass} placeholder="123 Coffee Street" required value={form.address} onChange={(e) => updateField('address', e.target.value)} />
          </div>
          <div>
            <label className="font-small text-mocha-text block mb-2">City</label>
            <input className={inputClass} placeholder="Portland" required value={form.city} onChange={(e) => updateField('city', e.target.value)} />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="font-small text-mocha-text block mb-2">State</label>
              <input className={inputClass} placeholder="OR" required value={form.state} onChange={(e) => updateField('state', e.target.value)} />
            </div>
            <div className="flex-1">
              <label className="font-small text-mocha-text block mb-2">ZIP</label>
              <input className={inputClass} placeholder="97201" required value={form.zip} onChange={(e) => updateField('zip', e.target.value)} />
            </div>
          </div>
          <div>
            <label className="font-small text-mocha-text block mb-2">Country</label>
            <select className={inputClass} value={form.country} onChange={(e) => updateField('country', e.target.value)}>
              {countries.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-h2 text-on-surface mb-2">Payment</h2>
        <p className="text-mocha-text font-small mb-6 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">lock</span>
          Secure payment via Stripe
        </p>
        <div className="bg-background border border-chestnut/50 rounded-lg px-4 py-4">
          <CardElement
            options={{
              hidePostalCode: true,
              style: {
                base: {
                  fontSize: '16px',
                  color: '#F5F0EB',
                  fontFamily: 'Inter, sans-serif',
                  '::placeholder': { color: '#B8A89A' },
                },
                invalid: { color: '#C85A3E' },
              },
            }}
          />
        </div>
      </section>

      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full bg-primary-container text-on-primary-container py-4 rounded-lg font-bold text-body hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
      >
        {isLoading ? (
          <span className="material-symbols-outlined animate-spin inline-block">refresh</span>
        ) : (
          `Place Order — $${total().toFixed(2)}`
        )}
      </button>
    </form>
  )
}
