import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface Beneficiary {
  beneficiary_id: number
  full_name: string
  barangay_name: string
  registration_date: string
}

const BeneficiariesWidgets = () => {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([])

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const beneficiaries = await window.context.fetchBeneficiaryList()
        const sortedBeneficiaries = beneficiaries.sort(
          (a, b) =>
            new Date(b.registration_date).getTime() - new Date(a.registration_date).getTime()
        )
        setBeneficiaries(sortedBeneficiaries.slice(0, 5))
      } catch (error) {
        console.error('There was an error fetching the beneficiaries!', error)
      }
    }

    fetchBeneficiaries()
  }, [])

  const colors = {
    red: 'bg-red-300',
    yellow: 'bg-yellow-300',
    green: 'bg-green-300',
    blue: 'bg-blue-300',
    indigo: 'bg-indigo-300',
    purple: 'bg-purple-300',
    pink: 'bg-pink-300'
  }

  return (
    <div className="mx-auto bg-white-100 rounded-md">
      <span className="font-bold dark:text-white text-xl text-gray-500 mb-6 ">
        New Join Beneficiaries
      </span>
      <ul className="list-none p-4 mt-2">
        {beneficiaries.map((beneficiary) => {
          const names = beneficiary.full_name.split(' ')
          const initials = names[0][0] + (names.length > 1 ? names[1][0] : '')
          const colorKeys = Object.keys(colors)
          const randomColorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)]
          return (
            <li key={beneficiary.beneficiary_id} className="flex items-center justify-between my-3">
              <div
                className={`w-8 h-8 ${
                  colors[randomColorKey as keyof typeof colors]
                } rounded-full flex items-center justify-center`}
              >
                <span className="text-white text-base font-bold">{initials.toUpperCase()}</span>
              </div>
              <div className="flex flex-col ml-4 w-1/2">
                <span className="font-semibold">{beneficiary.full_name}</span>
                <span className="font-light">{beneficiary.barangay_name}</span>
              </div>
              <button className="flex items-center px-2 py-1 bg-gray-200 text-gray-600 rounded-md cursor-pointer">
                <Link to={'/beneficiaries'}>View</Link>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default BeneficiariesWidgets
