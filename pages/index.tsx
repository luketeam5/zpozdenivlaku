import type { NextPage } from 'next'
import { useState } from 'react'
import useSWR from 'swr'
import { DelayTable } from '../components/DelayTable'
import { DelayInfo } from '../types/DelayInfo'

const Home: NextPage = () => {
  const {data, isValidating} = useSWR('/api/getDelays', (...args) => fetch(...args).then(res => res.json() as Promise<DelayInfo>), {refreshInterval: 60*1000})
  return (
    <div className='flex flex-col items-center min-w-min p-4'>
      <h1 className='text-center text-2xl font-bold mb-4'>Průměrné zpoždění vlaků železničních dopravců v ČR</h1>
      <span className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
        {"Naposledy aktualizováno: " + (data?.timeFetched ? data.timeFetched : "nikdy") + (!data || isValidating ? ", načítání..." : "")}
      </span>
      {data && <DelayTable companyInfos={data?.companies}/>}
    </div>
  )
}

export default Home