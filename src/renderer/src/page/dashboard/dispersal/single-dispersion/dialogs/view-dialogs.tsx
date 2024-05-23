import { useState, useEffect } from 'react'
import { DialogHeader, DialogTitle } from '../../../../../components/ui/dialog'
import { DispersalType } from '../../../../schema'
import axios from 'axios'
import moment from 'moment'

type viewProps = {
  dispersal: DispersalType
}

const keyNames: { [key: string]: string } = {
  dispersal_id: 'Dispersal ID',
  dispersal_date: 'Dispersal Date',
  num_of_heads: 'Number of Heads',
  status: 'Status',
  contract_details: 'Contract Details',
  notes: 'Notes',
  beneficiary_id: 'Beneficiary ID',
  current_beneficiary: 'Beneficiary',
  previous_beneficiary: 'Previous Beneficiary',
  ear_tag: 'Ear Tag',
  recipient: 'Recipient',
  category: 'Category',
  registration_date: 'Registration Date',
  redispersal_date: 'Redispersal Date',
  age: 'Age',
  init_num_heads: 'Initial Number of Heads',
  barangay_name: 'Barangay',
  visit_date: 'Visit Date',
  remarks: 'Remarks',
  visit_again: 'Visit Again'
}

export default function ViewDialog({ dispersal }: viewProps) {
  const [dispersalDetails, setDispersalDetails] = useState<DispersalType | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await window.context.fetchDispersalInfo(dispersal.dispersal_id)
        if (data && data.length > 0) {
          setDispersalDetails(data[0])
        } else {
          console.error('No dispersal found with the provided ID')
        }
      } catch (err) {
        console.error('Error:', err)
      }
    }

    fetchData()
  }, [dispersal.dispersal_id])

  if (!dispersalDetails) {
    return <div>Loading...</div>
  }

  const entries = Object.entries(dispersalDetails).filter(
    ([key]) => key !== 'notes' && key !== 'prev_ben_id' && key !== 'recipient_id'
  )
  const notes = dispersalDetails.notes || ''
  return (
    <DialogHeader>
      <DialogTitle>View Dispersal Details</DialogTitle>
      <div className="py-4 text-sm text-slate-500 dark:text-slate-400">
        <div className="max-h-96 overflow-y-auto">
          <div className="divide-y divide-gray-200">
            <div className="bg-muted flex">
              <div className="w-1/2 px-4 py-4 font-bold border-t border-l border-gray-200">
                Name
              </div>
              <div className="w-1/2 px-4 py-4 font-bold border-t border-r border-gray-200">
                Details
              </div>
            </div>
            {entries.map(([key, value], index) => {
              const newKey = keyNames[key] || key
              let displayValue = value

              if (
                ['redispersal_date', 'registration_date', 'dispersal_date', 'visit_date'].includes(
                  key
                ) &&
                typeof value === 'string'
              ) {
                displayValue = moment(value).format('MMMM DD, YYYY')
              }

              return (
                <div key={index} className="flex hover:bg-gray-100">
                  <div className="w-1/2 px-4 py-4 border-b border-l border-gray-200">{newKey}</div>
                  <div className="w-1/2 px-4 py-4 border-b border-r border-gray-200">
                    {Array.isArray(displayValue)
                      ? displayValue.map((item, i) => (
                          <div key={i}>
                            <strong>Date Monitored:</strong>{' '}
                            {moment(item.visit_date).format('MMMM DD, YYYY')}
                            <br />
                            <strong>Remarks:</strong> {item.remarks}
                            <br />
                            <hr
                              style={{ height: '1px', backgroundColor: 'gray', margin: '8px 0' }}
                            />
                          </div>
                        ))
                      : displayValue}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-4">
            <h2 className="font-bold text-lg">Notes</h2>
            <textarea
              id="notes"
              name="notes"
              readOnly
              className="w-full h-20 p-2 border rounded-md mt-2"
              value={notes}
            />
          </div>
        </div>
      </div>
    </DialogHeader>
  )
}
