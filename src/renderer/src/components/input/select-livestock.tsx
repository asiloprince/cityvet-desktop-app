import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'

import Select from './select'
import { MultiValue } from 'react-select'

interface Livestock {
  livestock_id: string
  ear_tag: string
  category: string
}

interface Option {
  value: string
  label: string
}

interface SelectLivestockProps {
  value: string | null
  onChange: (value: string) => void
}

const SelectLivestock = forwardRef((props: SelectLivestockProps, ref) => {
  const [isLoading, setIsLoading] = useState(false)
  const [livestocks, setLivestocks] = useState<Livestock[]>([])

  useEffect(() => {
    const fetchLivestocks = async () => {
      setIsLoading(true)
      try {
        const data = await window.context.fetchToDisperseLivestockList()
        setLivestocks(data)
      } catch (err) {
        console.error('Error fetching livestock data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLivestocks()
  }, [])

  const options: Option[] = livestocks.map((livestock) => ({
    value: livestock.livestock_id,
    label: `${livestock.category} - ${livestock.ear_tag}`
  }))

  const handleChange = (value: MultiValue<Option>) => {
    let selectedValue = ''
    if (value !== null && value !== undefined) {
      selectedValue = value[0]?.value || ''
    }
    props.onChange(selectedValue as string)
  }

  const currentOption = options.find((option) => option.value === props.value)

  useImperativeHandle(ref, () => ({}))

  return (
    <Select
      id="livestock_id"
      className="w-full p-2 border rounded-md focus:border-cyan-500"
      disabled={isLoading}
      label=""
      options={options}
      onChange={handleChange}
      value={currentOption ? [currentOption] : undefined}
      placeholder="Search livestock..."
    />
  )
})

SelectLivestock.displayName = 'SelectLivestock'

export default SelectLivestock
