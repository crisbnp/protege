import React, { useState, useEffect } from 'react'
import FindYourNext from '../components/FindYourNext'
import JobCard from '../components/JobCard'
import heroBG from '../assets/images/hero-bg-pattern.png'
import { db } from '../firebase/firebase'
import { Link } from 'react-router-dom'

const Home = () => {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    ;(async function retrieveJobs() {
      const querySnapshot = await db
        .collection('jobs')
        .where('approved', '==', true)
        .orderBy('postedAt', 'desc')
        .get()

      const jobList = querySnapshot.docs.map((documentSnapshot) => {
        let doc = documentSnapshot
        let job = documentSnapshot.data()

        return {
          id: doc.id,
          jobTitle: job.jobtitle,
          roleFocus: job.roleFocus,
          companyHQ: job.companyHQ,
          companyName: job.companyName,
          postedAt: job.postedAt,
          companyLogo: job.companyLogo,
        }
      })
      setJobs(jobList)
    })()
  }, [])

  return (
    <div>
      <img
        src={heroBG}
        alt=''
        className='hidden md:block absolute top-0 left-0 w-full'
      />

      <div className='relative pt-20 lg:pt-32 px-2'>
        <FindYourNext />

        <div className='flex md:w-3/4 flex-col text-center mx-auto mt-6'>
          <p className='tracking-wide lg:w-3/5 mx-auto text-lg text-blue-400 mb-6'>
            Looking for your next junior developer role? Look no further! Any
            jobs listed here are geared for those hungry to work and learn.
          </p>

          <button className='btn btn-teal mx-auto'>
            <Link to='/job-board'>Find a Job</Link>
          </button>
        </div>

        <div className='mt-12 lg:pt-16 mx-auto' style={{ maxWidth: 680 }}>
          <h2 className='text-center text-2xl text-blue-500 font-bold mb-8'>
            Latest Opportunities
          </h2>

          <div className='container'>
            {jobs.slice(0, 6).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
