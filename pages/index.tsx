import type { NextPage } from 'next'
import { useState } from 'react'
import useSWR from 'swr'
import { DelayTable } from '../components/DelayTable'
import { DelayInfo } from '../types/DelayInfo'

const Home: NextPage = () => {
  const {data, isValidating} = useSWR('/api/getDelays', (...args) => fetch(...args).then(res => res.json() as Promise<DelayInfo>), {refreshInterval: 60*1000})
  return (
    <div className='flex flex-col items-center min-w-min'>
      <h1 className='text-center text-2xl font-bold'>Průměrné zpoždění vlaků železničních dopravců v ČR</h1>
      <span>{"Naposledy aktualizováno: " + (data?.timeFetched ? /*new Date(delayData.timeFetched)*/ data.timeFetched : "nikdy")}</span>
      {!data || isValidating && (<span>Načítání...</span>)}
      {data && <DelayTable companyInfos={data?.companies}/>}
    </div>
  )
}

export default Home
