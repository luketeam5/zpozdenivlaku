import type { NextPage } from 'next'
import { useState } from 'react'
import { DelayTable } from '../components/DelayTable'
import { DelayInfo } from '../types/DelayInfo'

const Home: NextPage = () => {
  const [delayData, setDelayData] = useState<DelayInfo | null>(null)
  async function refreshData(): Promise<NodeJS.Timeout> {
    const res = await fetch('/api/getDelays')
    const data = await res.json()
    setDelayData(data)
    return setTimeout(refreshData, 60*11*1000)
  }
  if (delayData == null) {
    refreshData()
  }
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-2xl font-bold'>Průměrné zpoždění vlaků železničních dopravců v ČR</h1>
      {"Naposledy aktualizováno: " + (delayData?.timeFetched ? /*new Date(delayData.timeFetched)*/ delayData.timeFetched : "nikdy")}
      {delayData && <DelayTable companyInfos={delayData?.companies}/>}
    </div>
  )
}

export default Home
