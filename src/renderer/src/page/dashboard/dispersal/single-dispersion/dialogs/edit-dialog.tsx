import { z } from 'zod'
import { DispersalType } from '../../../../schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../../../../components/ui/form'
import { Input } from '../../../../../components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../../../components/ui/select'
import { visitStatus } from '../../../../../components/data-table/data-table-status-filter'
import { Button } from '../../../../../components/ui/button'
import { DialogHeader, DialogTitle } from '../../../../../components/ui/dialog'

import axios from 'axios'
import { toast } from 'react-toastify'
import { DatePicker } from '@renderer/components/date-picker/date-picker'

type EditProps = {
  dispersal: DispersalType
}

const editSchema = z.object({
  id: z.number(),
  notes: z.string(),
  remarks: z.string(),
  contract_details: z.string().min(1, { message: 'Contract details Required' }),
  num_of_heads: z.number(),
  visit_again: z.enum(['Yes', 'No', 'Not set']),
  visit_date: z.union([z.string(), z.null()]).optional()
})

type editSchemaType = z.infer<typeof editSchema>

export default function EditDialog({ dispersal }: EditProps) {
  const form = useForm<editSchemaType>({
    resolver: zodResolver(editSchema),

    defaultValues: {
      id: dispersal.dispersal_id,
      notes: dispersal.notes,
      remarks: dispersal.remarks,
      contract_details: dispersal.contract_details,
      num_of_heads: dispersal.num_of_heads,
      visit_date: dispersal.visit_date,
      visit_again: dispersal.visit_again
    }
  })

  async function onSubmit(values: editSchemaType) {
    console.log('Form Values:', values)
    try {
      await window.context.updateDispersal(dispersal.dispersal_id, values)
      toast.success('Dispersal updated successfully!')
    } catch (error) {
      console.error('An error occurred while updating the dispersal: ', error)
      toast.error('An error occurred. Please try again.')
    }
  }

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Edit dispersal Details</DialogTitle>
      </DialogHeader>
      <div className="py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
            <FormField
              control={form.control}
              name="num_of_heads"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Heads</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        let value = parseInt(e.target.value)
                        if (value < 0) {
                          value = 0
                        }
                        field.onChange(isNaN(value) ? 0 : value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="visit_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="visit_date">Date Visit</FormLabel>
                    <FormControl>
                      <div>
                        <DatePicker
                          id="visit_date"
                          onChange={field.onChange}
                          value={field.value as string | null}
                        />
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="visit_again"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visit Again</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Status to Update" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {visitStatus.map((status, index) => (
                            <SelectItem key={index} value={status.value}>
                              <span className="flex items-center">
                                <status.icon className="mr-2 h-5 w-5 text-muted-foreground" />
                                {status.label}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="contract_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contract details</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remarks</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2 w-full bg-cyan-600 hover:bg-">
              Update Details
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
