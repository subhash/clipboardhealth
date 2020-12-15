import Head from 'next/head'
import "tailwindcss/tailwind.css";

import { useEffect, useState } from 'react'

export default function Home(props) {
  const [ hospitals, setHospitals ] = useState([])
  const [ selectedHospital, selectHospital ] = useState(null)
  const [ selectedJob, selectJob ] = useState(null)
  const [ searchInProgress, setSearchInProgress ] = useState("")
  const [ search, setSearch ] = useState("")
  const [ sort, setSort ] = useState({location: 0, role: 0, experience: 0})
  const [ modal, setModal ] = useState("")
  const [ requests, setRequests ] = useState([])
  const [ responses, setResponses ] = useState(new Map())
  const fetchHospitals = async () => {
    const query = { search: search, ...sort}
    const queryStr = Object.keys(query).map(k => `${k}=${query[k]}`).join("&")
    const url = `/api/jobs?${queryStr}`
    setRequests([...requests, { query, time: Date.now() }])
    const res = await fetch(url)
    const jsonRes = await res.json()
    const newResp = new Map(responses)
    newResp.set(query, jsonRes)
    setResponses(newResp)
  }
  const processResponses = async () => {
    while (requests.length && responses.has(requests[0].query)) {
      const req = requests.shift()
      const { hospitals, search, sort } = responses.get(req.query)
      responses.delete(req.query)
      setHospitals(hospitals)
      setRequests(requests)
    }
  }
  useEffect(() => processResponses(), [responses])
  useEffect(() => fetchHospitals(), [search, sort])
  const childProps = { 
    selectedHospital, selectHospital,
    selectedJob, selectJob,
    searchInProgress, setSearchInProgress,
    search, setSearch,
    sort, setSort,
    modal, setModal,
    requests, setRequests
  }
  return Dashboard(hospitals, childProps) 
}


function Dashboard(hospitals, props) {
  const jobs = hospitals.flatMap(h => h.items)
    return (
<div>


<nav className="bg-white-800">
  <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <div className="relative flex items-center justify-between h-16">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>

          <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
        


        <div className="flex-shrink-0 flex items-center text-blue=800">
            <a href="#" className="text-blue-800 px-3 py-2 rounded-md text-sm font-medium">HEALTH EXPLORE</a>
        </div>

        <div className="hidden sm:block sm:ml-6">
          <div className="flex space-x-4">
            
            
            <a href="#" className="text-gray-800 px-3 py-2 rounded-md text-sm font-medium">PROFILE</a>
            <a href="#" className="text-gray-800 px-3 py-2 rounded-md text-sm font-medium">JOBS</a>
            <a href="#" className="text-gray-800 px-3 py-2 rounded-md text-sm font-medium">PROFESSIONAL NETWORK</a>
            <a href="#" className="text-gray-800 px-3 py-2 rounded-md text-sm font-medium">LOUNGE</a>
            <a href="#" className="text-gray-800 px-3 py-2 rounded-md text-sm font-medium">SALARY</a>


          </div>
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


        <div className="ml-3 relative">
        <div className="ml-4 flex items-center md:ml-6">
            <button type="button" className="hidden md:block inline-flex items-center px-4 py-2 border border-blue-500 rounded-md shadow-sm text-sm font-medium text-blue-500 bg-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              CREATE JOB
            </button>  
            <div className="ml-3 relative">
              <button className="bg-blue-500 p-1 rounded-full text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">View notifications</span>
                JO
              </button>
            </div>

            <div className="hidden md:block ml-3 relative">
              <a href="#">LOGOUT</a>
            </div>
          </div>
{ false &&
          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
          </div>
}
        </div>
      </div>
    </div>
  </div>

  <div className="hidden sm:hidden">
    <div className="px-2 pt-2 pb-3 space-y-1">
      <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</a>
      <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</a>
      <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>
      <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</a>
    </div>
  </div>
</nav>



  <main className="bg-gray-100">
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 md:grid md:grid-cols-10 md:gap-6">
      <div className="px-4 sm:px-0 md:col-span-10"> { Search(props) }</div>

      <div className="px-4 sm:px-0 md:col-span-2">
       <div className="hidden md:block md:grid md:grid-cols-1 md:gap-6">
        <div className="md:col-span-1"> {Aggregate(props, jobs, "job_type", "JOB TYPE")} </div>
        <div className="md:col-span-1"> {Aggregate(props, jobs, "department", "DEPARTMENT")} </div>
        <div className="md:col-span-1"> {Aggregate(props, jobs, "work_schedule", "WORK SCHEDULE")} </div>
        <div className="md:col-span-1"> {Aggregate(props, jobs, "experience", "EXPERIENCE")} </div>
       </div>

      </div>
      <div className="px-4 sm:px-0 md:col-span-8">

       {Hospitals(hospitals, props)}

    </div>
    </div>

  </main>

  {Footer()}

</div>

    )
}

function Hospitals(hospitals, props) {
  return (
<div className="flex flex-col">
  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <div className="min-w-full divide-y divide-gray-200">
          <div className="bg-white">
            <div className="md:block md:grid md:grid-cols-10 md:gap-6">
              <div scope="col" className="md:col-span-4 px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                {hospitals.flatMap(h => h.items).length} job postings
              </div>
              {SortBar(props)}
            </div>
          </div>
          <div className="grid grid-cols-3 bg-white divide-y divide-gray-200">
            {hospitals.map(h => Hospital(h, props))}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

function SortBar(props){
  const {sort, setSort, search } = props
  function toggleSort(t) {
    switch(t) {
      case 0: return 1
      case 1: return 2
      case 2: return 0
    }
  }

  function sortSymbol(t){
    switch(t){
      case 0: return ""
      case 1: return "↘"
      case 2: return "↗"
    }
  }
  return (
    <div scope="col" className="md:col-span-6 px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
      <span className="hidden md:inline  px-4 text-sm font-medium text-gray-900">Sort by</span>
      <span className="hidden md:inline  cursor-pointer px-2 text-sm text-gray-500" onClick={() => {
        const newSort = {...sort, location: toggleSort(sort.location)}
        setSort(newSort)
      }}>Location {sortSymbol(sort.location)}</span>
      <span className="hidden md:inline  cursor-pointer px-2 text-sm text-gray-500" onClick={() => {
        const newSort = {...sort, role: toggleSort(sort.role)}
        setSort(newSort)
      }}>Role {sortSymbol(sort.role)}</span>
      <span className="hidden md:inline   cursor-pointer px-2 text-sm text-gray-500" onClick={() => {
        const newSort = {...sort, experience: toggleSort(sort.experience)}
        setSort(newSort)
      }}>Experience {sortSymbol(sort.experience)}</span>
    </div>
  )
}

function Hospital(hospital, props ) {
  const rows = []
  const { selectedHospital, selectHospital } = props
  const isSelected = selectedHospital == hospital.name
  rows.push(
    <div className="col-span-3" key={hospital.name}>
    <div className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="ml-4 cursor-pointer" onClick={() => 
            isSelected ? selectHospital(null):selectHospital(hospital.name)
          }>
          <span className="px-2 inline-flex text-l leading-5 rounded-lg bg-gray-500 text-white">
            {hospital.name.substring(0, 2).toUpperCase()}
          </span>
          <span className="px-4 text-sm text-gray-500">
            {hospital.total_jobs_in_hospital} jobs for {hospital.name}
          </span>
        </div>
      </div>
    </div>
  </div>
  )
  if (isSelected) {
    for (const j of hospital.items) {
      rows.push(Job(j, props))
    }
  }
  return rows
}

function Job(j, { selectedJob, selectJob }){
  const id = j.job_id
  const isSelected = selectedJob == id
  const [mn, mx] = j.salary_range
  const rows = []
  rows.push(
    <div key={"j1_"+id} className="col-span-3 md:col-span-2 cursor-pointer px-6 py-1 md:py-4 whitespace-nowrap"
      onClick={() => { isSelected ? selectJob(null) : selectJob(j.job_id)}}>
        <div className="text-sm text-gray-900">{j.job_title}</div>
        <div className="text-sm text-gray-500">{j.job_type} | ${mn} - ${mx} an hour | {j.city}</div>
    </div>
  )
  rows.push(
    <div key={"j2_"+id} className="col-span-3 md:col-span-1 px-6 py-1 md:py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{timeSince(j.created)} ago</div>
    </div>
    )
    
  if (isSelected) {
    rows.push(JobDetails(j))
  }
  return rows
}

function JobDetails(j) {
  const id = j.job_id
  const rows = []
  rows.push(
    <div key={id} className="col-span-3 md:grid md:grid-cols-3">
      <div className="md:col-span-2 md:grid md:grid-cols-2">
        <div className="md:col-span-1 px-6 py-1 whitespace-nowrap text-sm text-gray-900">Department:</div>
        <div className="md:col-span-1 px-6 py-1 whitespace-wrap text-sm text-gray-500">{j.department.join(", ")}</div>
        <div className="md:col-span-1 px-6 py-1 whitespace-nowrap text-sm text-gray-900">Hours / shifts:</div>
        <div className="md:col-span-1 px-6 py-1 whitespace-nowrap text-sm text-gray-500">{j.hours.join("-")} hours / {j.work_schedule}</div>
        <div className="md:col-span-1 px-6 py-1 whitespace-nowrap text-sm text-gray-900">Summary:</div>
        <div className="md:col-span-1 px-6 py-1 whitespace-wrap text-sm text-gray-500">{j.description}</div>
      </div>
      <div className="md:col-span-1">
        <div className="px-6 py-2">
        <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Job details
        </button>
        </div>
        <div className="px-6 py-2">
        <button type="button" className="inline-flex items-center px-4 py-2 border border-blue-500 rounded-md shadow-sm text-sm font-medium text-blue-500 bg-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Save Job
        </button>
        </div>  
      </div>
    </div>
  )
  return rows
}

function Aggregate(props, jobs, attr, title){
  const { modal, setModal } = props
  const aggs = new Map()
  const vals = jobs.flatMap(j => j[attr])
  vals.map(v => aggs.set(v, 1 + aggs.get(v) || 0))
  const kvs = [...aggs.entries()]
  const direct = kvs.slice(0, 10)
  const extra = kvs.slice(10, kvs.length)

  return (
<div key={attr} className="flex flex-col">

    {
      modal==attr && Modal(props, kvs, title)
    }

  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
            <td className="px-6 py-4 whitespace-wrap">
                <div className="text-md text-gray-900">{title}</div>
                { direct.map(e => 
                <div key={e[0]} className="text-sm text-gray-900">
                  <span>{e[0]}</span>
                  <span className="px-4 text-sm text-gray-500">{e[1]}</span>                
                </div>
                ) }
                { 
                  (extra.length > 0) && (
                    <div className="cursor-pointer text-sm text-blue-600"
                      onClick={() => setModal(attr)}>
                      More
                    </div>
                  ) 
                }
            </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
</div>

  )
}

function Modal(props, kvs, title) {
  const { setModal } = props
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    
    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>
    
    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="grid grid-cols-4">
          <div className="col-span-4">{title}</div>
          { kvs.map(e => 
            <div className="col-span-1 text-sm text-gray-900">
              <span>{e[0]}</span>
              <span className="px-4 text-sm text-gray-500">{e[1]}</span>                
            </div>
          ) }
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => setModal("")}>
          Close
        </button>
      </div>
    </div>
    </div>
    </div>
  )
}

function Search(props) {
  const { setSearch, searchInProgress, setSearchInProgress } = props
  return (
    <div>
    <form onSubmit={(evt) => {
        evt.preventDefault()
        setSearch(searchInProgress)
      }}>
    <label htmlFor="search" className="sr-only">Search</label>
    <input id="search" name="search" type="search" 
      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
      placeholder="Search for any job, title, keywords or company"
      value={searchInProgress}
      onChange={(evt) => { setSearchInProgress(evt.target.value) }}
     />
    </form>
    </div>
  )
}

function Footer() {
  const row = 
  <div className="md:grid md:grid-cols-4">
    <div className="md:col-span-2">
        <div className="px-6 py-2 whitespace-nowrap text-lg text-gray-900">
            About us
        </div>
        <div className="px-6 py-2 whitespace-wrap text-sm text-gray-500">
          We are a team of doctors, nurses, technologists and executives dedicated to help nurses find the jobs they love
        </div>
        <div className="px-6 py-2 whitespace-wrap text-sm text-gray-500">
          All copyrights reserved c 2020 - Health Explore
        </div>
    </div>
    <div className="md:col-span-1">
        <div className="px-6 py-2 whitespace-nowrap text-lg text-gray-900">
          Sitemap
        </div>
        <div className="px-6 py-2 whitespace-wrap text-sm text-gray-500">
          Nurses  
        </div>
        <div className="px-6 py-2 whitespace-wrap text-sm text-gray-500">
          Employees
        </div>
        <div className="px-6 py-2 whitespace-wrap text-sm text-gray-500">
          Social Networking
        </div>
        <div className="px-6 py-2 whitespace-wrap text-sm text-gray-500">
          Jobs
        </div>
    </div>
    <div className="md:col-span-1">
        <div className="px-6 py-2 whitespace-wrap text-lg text-gray-900">
          Privacy 
        </div>
        <div className="px-6 py-2 whitespace-wrap text-sm text-gray-500">
          Terms of use  
        </div>
        <div className="px-6 py-2 whitespace-wrap text-sm text-gray-500">
          Privacy Policy
        </div>
        <div className="px-6 py-2 whitespace-wrap text-sm text-gray-500">
          Cookie Policy
        </div>
    </div>
  </div>

  return row
}

function timeSince(date) {

  var seconds = Math.floor((new Date() - new Date(date)) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}
