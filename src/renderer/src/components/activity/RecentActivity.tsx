import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

interface Activity {
  dispersal_id: number
  current_beneficiary: string
  livestock_received: string
  registration_date: string
  barangay_name: string
  num_of_heads: number
  status: string
}

function RecentActivity() {
  const [dispersalActivity, setDispersalActivity] = useState<Activity[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activityRecords = await window.context.fetchDispersalsActivity()
        setDispersalActivity(activityRecords)
      } catch (error) {
        console.error('There was an error fetching the dispersal activity records!', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="mx-auto dark:bg-[#020817] bg-white-100 rounded-md">
      <div className="flex justify-between">
        <h1 className="font-bold text-xl dark:text-white text-gray-500 mb-3">Recent Activity</h1>
        {/* Filter and View All buttons can be uncommented and styled as needed */}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[540px]">
          <thead>
            <tr>
              <th className="text-[12px] uppercase tracking-wide font-bold dark:text-gray-300 text-gray-400 py-2 px-4 dark:bg-gray-800 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                Recipients
              </th>
              <th className="text-[12px] uppercase tracking-wide font-bold dark:text-gray-300 text-gray-400 py-2 px-4 dark:bg-gray-800 bg-gray-50 text-left">
                Livestock Received
              </th>
              <th className="text-[12px] uppercase tracking-wide font-bold dark:text-gray-300 text-gray-400 py-2 px-4 dark:bg-gray-800 bg-gray-50 text-left">
                Quantity
              </th>
              <th className="text-[12px] uppercase tracking-wide font-bold dark:text-gray-300 text-gray-400 py-2 px-4 dark:bg-gray-800 bg-gray-50 text-left">
                Date Time
              </th>
              <th className="text-[12px] uppercase tracking-wide font-bold dark:text-gray-300 text-gray-400 py-2 px-4 dark:bg-gray-800 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                Barangay
              </th>
              <th className="text-[12px] uppercase tracking-wide font-bold dark:text-gray-300 text-gray-400 py-2 px-4 dark:bg-gray-800 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {dispersalActivity.slice(0, 5).map((activity) => {
              const names = activity.current_beneficiary.split(' ')
              const initials = names[0][0] + (names.length > 1 ? names[1][0] : '')

              const colors = {
                red: 'bg-red-300',
                yellow: 'bg-yellow-300',
                green: 'bg-green-300',
                blue: 'bg-blue-300',
                indigo: 'bg-indigo-300',
                purple: 'bg-purple-300',
                pink: 'bg-pink-300'
              }

              const colorKeys = Object.keys(colors)
              const randomColorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)]

              return (
                <tr key={activity.dispersal_id}>
                  <td className="py-2 px-2 border-b dark:border-b-gray-800 border-b-gray-50">
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 ${
                          colors[randomColorKey as keyof typeof colors]
                        } rounded-full flex items-center justify-center`}
                      >
                        <span className="text-white text-[13px] font-bold">
                          {initials.toUpperCase()}
                        </span>
                      </div>
                      <Link
                        to="#"
                        className="text-sm font-medium hover:text-blue-500 ml-2 truncate dark:hover:text-blue-300 dark:text-white text-gray-600"
                      >
                        {activity.current_beneficiary}
                      </Link>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b dark:border-b-gray-800 border-b-gray-50 text-left">
                    <span className="text-[13px] dark:text-white text-gray-500">
                      {activity.livestock_received}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b dark:border-b-gray-800 border-b-gray-50 text-left">
                    <span className="text-[13px] dark:text-white text-gray-500">
                      {activity.num_of_heads}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b dark:border-b-gray-800 border-b-gray-50">
                    <span className="text-[13px] font-medium dark:text-white text-gray-400">
                      {moment(activity.registration_date).fromNow()}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b dark:border-b-gray-800 border-b-gray-50">
                    <span className="text-[13px] font-medium dark:text-white text-gray-400">
                      {activity.barangay_name}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b dark:border-b-gray-800 border-b-gray-50">
                    <span
                      className={`inline-block p-1 rounded ${
                        activity.status === 'Dispersed'
                          ? 'bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20 dark:text-emerald-200'
                          : activity.status === 'Redispersed'
                            ? 'bg-red-500/10 text-red-500 dark:bg-red-500/20 dark:text-red-200'
                            : activity.status === 'Transferred'
                              ? 'bg-gray-500/10 text-gray-500 dark:bg-gray-500/20 dark:text-gray-200'
                              : ''
                      } font-medium text-[12px] leading-none`}
                    >
                      {activity.status}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentActivity
