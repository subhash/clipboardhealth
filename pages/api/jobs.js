// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import filters from '../../data/filters';
import hospitals from '../../data/jobs';

export default async (req, res) => {
  // this timeout emulates unstable network connection, do not remove this one
  // you need to figure out how to guarantee that client side will render
  // correct results even if server-side can't finish replies in the right order
  await new Promise((resolve)=>setTimeout(resolve, 1000 * Math.random()));

  res.statusCode = 200;
  const { query } = req
  const search = query.search || ""
  const location = query.location ? parseInt(query.location) : 0
  const role = query.role ? parseInt(query.role) : 0
  const experience = query.experience ? parseInt(query.experience) : 0
  
  let results = hospitals

  if (search) {
    const s = search.toLowerCase()
    const jobs = results.flatMap(h => h.items)
    const hospitalMap = new Map()
    results = jobs.filter(j =>  
      j.city.toLowerCase().includes(s) ||
      j.name.toLowerCase().includes(s) ||
      j.state.toLowerCase().includes(s) ||
      j.job_title.toLowerCase().includes(s) ||
      j.job_type.toLowerCase().includes(s) ||
      j.type.toLowerCase().includes(s) ||
      j.work_schedule.toLowerCase().includes(s)
    ).map(j => {
      const h = hospitalMap.get(j.name) || {
        name: j.name, job_title: j.job_title, 
        items: [], total_jobs_in_hospital: 0
      }
      h.items.push(j)
      h.total_jobs_in_hospital += 1
      hospitalMap.set(j.name, h)
    })
    results = [...hospitalMap.values()]
  }

  if (location > 0 || role > 0 || experience > 0) {
    const jobs = results.flatMap(h => h.items)
    const hospitalMap = new Map()
    jobs.sort((a, b) => {
      let loc = location != 0 ? a.city.localeCompare(b.city): 0
      let rol = role != 0 ? a.job_title.localeCompare(b.job_title): 0
      let exp = experience != 0 ? a.experience.localeCompare(b.experience): 0
      loc = location == 1 ? loc : -loc
      rol = role == 1 ? rol : -rol
      exp = experience == 1 ? exp : -exp
      return loc == 0? (rol == 0? exp : rol) : loc
    }).map(j => {
      const h = hospitalMap.get(j.name) || {
        name: j.name, job_title: j.job_title, 
        items: [], total_jobs_in_hospital: 0
      }
      h.items.push(j)
      h.total_jobs_in_hospital += 1
      hospitalMap.set(j.name, h)
    })
    results = [...hospitalMap.values()]
  }

  // @todo: implement filters and search
  // @todo: implement automated tests

 
  res.json({ hospitals: results, search, 
    sort: { location, role, experience }, 
    query: { search, location, role, experience } })
}
