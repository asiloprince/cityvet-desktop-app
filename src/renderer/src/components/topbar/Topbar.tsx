import { Search } from 'lucide-react'
import { UserNav } from './UserNav'
function Topbar(): JSX.Element {
  return (
    <div className="col-span-5 ml-4">
      <header className="flex items-center justify-end p-4 w-full">
        {/* search */}
        {/* <form className="w-[40%]">
          <div className="relative w-full">
            <Search className="absolute left-2 top-3" />
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-100 p-2 pl-8 pr-4 outline-none rounded-lg w-full"
            />
          </div>
        </form> */}
        {/* notifiction */}
        <nav className="w-[70%] flex justify-end">
          <ul className="flex items-center gap-4">
            <li className="flex items-center gap-2 ml-6 ">
              <UserNav />
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Topbar
