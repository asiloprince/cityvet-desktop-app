import { useNavigate } from 'react-router-dom'

import { Button } from '../../../../../components/ui/button'
import { useFormState } from '../../context/form-context'
import { FormProvider } from '../../context/single-dispersions-context'
import { BatchDispersalRecipient } from './multi-step-form/beneficiaries'
import { DispersalForm } from './multi-step-form/dispersals'
import { DisperseLivestock } from './multi-step-form/batch-livestocks'
import SideNavigator from '@renderer/components/forms-side-navigator/FormSideNavigator'

function ActiveStepFormComponent() {
  const { step, onHandleNext, onHandleBack } = useFormState()

  const handleNext = () => {
    if (step < 3) {
      onHandleNext()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      onHandleBack()
    }
  }

  switch (step) {
    case 1:
      return <DisperseLivestock onHandleNext={handleNext} />
    case 2:
      return <BatchDispersalRecipient onHandleNext={handleNext} onHandleBack={handleBack} />
    case 3:
      return <DispersalForm onHandleBack={handleBack} />
    default:
      return null
  }
}
export default function BatchDispersals() {
  const navigate = useNavigate()

  const disperseDirectHandler = () => {
    navigate('/disperse')
  }
  const batchDisperseDirectHandler = () => {
    navigate('/batch-disperse')
  }
  return (
    <div className="max-w-7x1 m-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between">
        <div className="flex justify-between mr-4">
          <h1 className="text-2xl font-bold mr-3">Dispersal</h1>
        </div>
        <div className="flex justify-between m-2">
          <Button
            className="font-poppin text-white text-sm mr-2 bg-cyan-600 rounded  hover:bg-cyan-700"
            onClick={disperseDirectHandler}
          >
            Disperse
          </Button>
          <Button
            className="font-poppin text-white text-sm ml-2 bg-cyan-600 rounded  hover:bg-cyan-700"
            onClick={batchDisperseDirectHandler}
          >
            Batch Disperse
          </Button>
        </div>
      </div>

      <main className="flex  flex-col items-center justify-between p-16 pt-12">
        <div className="flex flex-col md:flex-row w-full max-w-8xl flex-grow gap-4">
          <FormProvider>
            <SideNavigator />
            <div className="p-6 w-full md:w-3/4 border rounded-xl bg-white flex-grow">
              <h1 className="text-center text-2xl font-semibold py-4">Disperse</h1>
              <div className="space-y-6">
                <div className="w-full md:w-auto">
                  <ActiveStepFormComponent />
                </div>
              </div>
            </div>
          </FormProvider>
        </div>
      </main>
    </div>
  )
}
