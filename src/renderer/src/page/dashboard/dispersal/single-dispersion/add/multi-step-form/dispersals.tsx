import { useForm } from 'react-hook-form'
import { useFormState } from '../../../context/form-context'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Success from '../../../../../../assets/images/success.svg'

import { Button } from '../../../../../../components/ui/button'

type TFormValues = {
  dispersal_id: number
  livestock_id: number
  beneficiary_id: number
  dispersal_date: string
  contract_details: string
  init_num_heads: number
}

type DispersalFormProps = {
  onHandleBack: () => void
}

export function DispersalForm({ onHandleBack }: DispersalFormProps) {
  const [isCreated, setCreated] = useState(false)
  const { setFormData, formData } = useFormState()
  const { register, handleSubmit } = useForm<TFormValues>({
    defaultValues: {
      ...formData,
      init_num_heads: 1
    }
  })

  const onHandleFormSubmit = async (data: TFormValues) => {
    setFormData((prev: Record<string, unknown>) => ({ ...prev, ...data }))
    setCreated(true)
    try {
      // Call the DisperseLivestock function with the data
      await window.context.DisperseLivestock(data)

      console.log('Dispersal successfully created.')
    } catch (error) {
      console.error('Failed to submit data:', error)
    }
  }

  return isCreated ? (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <div className="flex flex-col items-center">
        <img src={Success} alt="success" className="w-24 h-24 items center" />
        <p className="text-green-500 font-bold text-xl mb-4 text-center">
          Dispersal created successfully
        </p>
        {/* <pre className="whitespace-pre-wrap">
        {JSON.stringify(formData, null, 2)}
      </pre> */}
        <Link to={'/dispersal'}>
          <Button className="my-12 bg-green-500 hover:bg-green-600"> Close</Button>
        </Link>
      </div>
    </div>
  ) : (
    <form onSubmit={handleSubmit(onHandleFormSubmit)}>
      <div className="flex flex-col space-y-2">
        <label htmlFor="dispersal_date" className="text-sm font-medium text-gray-600">
          Dispersal Date
        </label>
        <input
          autoFocus
          id="dispersal_date"
          {...register('dispersal_date')}
          type="date"
          required={true}
          className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="contract_details" className="text-sm font-medium text-gray-600">
          Contract Details
        </label>
        <input
          id="contract_details"
          {...register('contract_details')}
          type="text"
          required={true}
          className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="init_num_heads" className="text-sm font-medium text-gray-600">
          Initial Number of Heads
        </label>
        <input
          id="initialNumberOfHeads"
          {...register('init_num_heads')}
          type="number"
          required={true}
          className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end space-x-4 mt-4">
        <button
          type="button"
          onClick={onHandleBack}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-600"
        >
          Submit
        </button>
      </div>
    </form>
  )
}
