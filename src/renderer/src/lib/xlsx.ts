import { BatchDispersalList, DispersalList, LivestockInfo } from '@shared/model'
import xlsx, { IJsonSheet } from 'json-as-xlsx'

import moment from 'moment'

interface ApiResponse {
  success: boolean
  message: string
  data: Livestock[]
}
interface DispersalApiResponse {
  success: boolean
  message: string
  data: Dispersal[]
}
interface BatchDispersalApiResponse {
  success: boolean
  message: string
  data: BatchDispersal[]
}
interface Beneficiary {
  beneficiary_id: number
  barangay_name: string
  full_name: string
  mobile: string
  birth_date: string
}

interface Livestock {
  ear_tag: string
  type: string
  category: string
  livestock_id: number
}
interface BatchDispersal {
  batch_id: number
  livestock_received: string
  init_num_heads: number
  age: string
  dispersal_id: number
  num_of_heads: number
  dispersal_date: string
  status: string
  contract_details: string
  notes: string
  visit_date: string
  remarks: string
  visit_again: string
  beneficiary_id: number
  current_beneficiary: string
  previous_beneficiary: string
  recipient: string
  barangay_name: string
}
interface Dispersal {
  dispersal_id: number
  dispersal_date: string
  num_of_heads: number
  status: string
  contract_details: string
  notes: string
  beneficiary_id: number
  current_beneficiary: string
  previous_beneficiary: string
  recipient: string
  ear_tag: string
  category: string
  age: string
  init_num_heads: number
  barangay_name: string
  visit_date: string
  remarks: string
  visit_again: string
}

export async function downloadToExcelBeneficiaries() {
  try {
    const response = await window.context.fetchBeneficiaryList()

    const recipient = response.map((row: Beneficiary) => {
      const formattedBirthDate = moment(row.birth_date).format('MMMM DD, YYYY')

      return {
        ID: row.beneficiary_id,
        Barangay: row.barangay_name,
        Name: row.full_name,
        ContactNumber: row.mobile,
        Birthdate: formattedBirthDate
      }
    })
    const columns: IJsonSheet[] = [
      {
        sheet: 'Beneficiaries',
        columns: [
          { label: 'Benefeciary Id', value: 'ID' },
          { label: 'Barangay', value: 'Barangay' },
          { label: 'Name', value: 'Name' },
          { label: 'Contact Number', value: 'ContactNumber' },
          {
            label: 'Birth Date',
            value: 'Birthdate'
          }
        ],
        content: recipient
      }
    ]

    const settings = {
      fileName: 'Benefeciaries Excel'
    }
    xlsx(columns, settings)
  } catch (err) {
    console.error(err)
  }
}

export async function downloadToExcelLivestocks() {
  try {
    let response = await window.context.fetchLivestockList()

    // Ensure age is always a string
    response = response.map((livestock: LivestockInfo) => ({
      ...livestock,
      age: String(livestock.age)
    }))

    const livestock = response.map((row: Livestock) => ({
      EarTag: row.ear_tag,
      Type: row.type,
      Category: row.category,
      LivestockID: row.livestock_id
    }))

    const columns: IJsonSheet[] = [
      {
        sheet: 'Livestocks',
        columns: [
          { label: 'Ear Tag', value: 'EarTag' },
          { label: 'Type', value: 'Type' },
          { label: 'Category', value: 'Category' },
          { label: 'Livestock ID', value: 'LivestockID' }
        ],
        content: livestock
      }
    ]

    const settings = {
      fileName: 'Livestocks Excel'
    }
    xlsx(columns, settings)
  } catch (err) {
    console.error(err)
  }
}

export async function downloadToExcelDispersals() {
  try {
    const response = await window.context.DispersedLivestockList()

    console.log(response)

    const dispersal = response.map((row: DispersalList) => ({
      ID: row.dispersal_id,
      DispersalDate: moment(row.dispersal_date).format('MMMM DD, YYYY'),
      NumberOfHeads: row.num_of_heads,
      Status: row.status,
      ContractDetails: row.contract_details,
      Notes: row.notes,
      BeneficiaryID: row.beneficiary_id,
      CurrentBeneficiary: row.current_beneficiary,
      RecipientBeneficiary: row.recipient,
      PreviousBeneficiary: row.previous_beneficiary,
      EarTag: row.ear_tag,
      Category: row.category,
      Age: row.age,
      InitNumHeads: row.init_num_heads,
      BarangayName: row.barangay_name,
      VisitDate: moment(row.visit_date).format('MMMM DD, YYYY'),
      Remarks: row.remarks,
      VisitAgain: row.visit_again || 'Not set'
    }))

    const columns: IJsonSheet[] = [
      {
        sheet: 'Livestocks',
        columns: [
          { label: 'Dispersal ID', value: 'ID' },
          { label: 'Barangay', value: 'BarangayName' },
          { label: 'BeneficiaryID', value: 'BeneficiaryID' },
          { label: 'Full Name', value: 'CurrentBeneficiary' },
          { label: 'Code', value: 'EarTag' },
          { label: 'Livestock Received', value: 'Category' },
          { label: 'Dispersal Date', value: 'DispersalDate' },
          { label: 'Age', value: 'Age' },
          { label: 'Initial Number of Heads', value: 'InitNumHeads' },
          { label: 'Number of Heads', value: 'NumberOfHeads' },
          { label: 'Contract Details', value: 'ContractDetails' },
          { label: 'Status', value: 'Status' },
          { label: 'Previous Recipients', value: 'PreviousBeneficiary' },
          { label: 'Recipients', value: 'RecipientBeneficiary' },
          { label: 'Notes', value: 'Notes' },
          { label: 'Visit Date', value: 'VisitDate' },
          { label: 'Remarks', value: 'Remarks' },
          { label: 'Visit Again', value: 'VisitAgain' }
        ],
        content: dispersal
      }
    ]

    const settings = {
      fileName: 'Dispersal Excel'
    }
    xlsx(columns, settings)
  } catch (err) {
    console.error(err)
  }
}

export async function downloadToExcelBatchDispersals() {
  try {
    const response = await window.context.BatchDispersedLivestockList()

    console.log(response)

    const batchdispersal = response.map((row: BatchDispersalList) => ({
      BatchID: row.batch_id,
      LivestockReceived: row.livestock_received,
      InitNumHeads: row.init_num_heads,
      Age: row.age,
      DispersalID: row.dispersal_id,
      NumOfHeads: row.num_of_heads,
      DispersalDate: moment(row.dispersal_date).format('MMMM DD, YYYY'),
      Status: row.status,
      ContractDetails: row.contract_details,
      Notes: row.notes,
      VisitDate: moment(row.visit_date).format('MMMM DD, YYYY'),
      Remarks: row.remarks,
      VisitAgain: row.visit_again,
      BeneficiaryID: row.beneficiary_id,
      CurrentBeneficiary: row.current_beneficiary,
      RecipientBeneficiary: row.recipient,
      PreviousBeneficiary: row.previous_beneficiary,
      BarangayName: row.barangay_name
    }))

    const columns: IJsonSheet[] = [
      {
        sheet: 'Batch Dispersals',
        columns: [
          { label: 'Dispersal ID', value: 'BatchID' },
          { label: 'Barangay', value: 'BarangayName' },
          { label: 'BeneficiaryID', value: 'BeneficiaryID' },
          { label: 'Full Name', value: 'CurrentBeneficiary' },
          { label: 'Livestock Received', value: 'LivestockReceived' },
          { label: 'Dispersal Date', value: 'DispersalDate' },
          { label: 'Initial Number of Heads', value: 'InitNumHeads' },
          { label: 'Age', value: 'Age' },
          // { label: "Dispersal ID", value: "DispersalID" },
          { label: 'Number of Heads', value: 'NumOfHeads' },
          { label: 'Status', value: 'Status' },
          { label: 'Contract Details', value: 'ContractDetails' },
          { label: 'Previous Recipients', value: 'PreviousBeneficiary' },
          { label: 'Recipients', value: 'RecipientBeneficiary' },
          { label: 'Notes', value: 'Notes' },
          { label: 'Visit Date', value: 'VisitDate' },
          { label: 'Remarks', value: 'Remarks' },
          { label: 'Visit Again', value: 'VisitAgain' }
        ],
        content: batchdispersal
      }
    ]

    const settings = {
      fileName: 'BatchDispersals Excel'
    }
    xlsx(columns, settings)
  } catch (err) {
    console.error(err)
  }
}
