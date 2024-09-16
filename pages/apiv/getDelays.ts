import { Agent } from 'https';
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { CompanyInfo, DelayInfo, TimeInfo, TrainInfo } from '../../types/DelayInfo';
import { SZResponse } from '../../types/SZResponse';

const regionalTrainTypes = ["Os", "Sp", "LET", "TL"];

async function GetSZData(): Promise<SZResponse> {
  const res = await fetch("https://mapy.spravazeleznic.cz/serverside/request2.php?module=Layers\\OsVlaky&action=load", {
    headers: {
      Host: "mapy.spravazeleznic.cz",
      Origin: "https://mapy.spravazeleznic.cz",
    },
    referrer: "https://mapy.spravazeleznic.cz",
    agent: new Agent({ rejectUnauthorized: false })
  });
  return await res.json() as SZResponse;
}

function ParseDate(dateString: string): Date {
  const [dayPart, timePart] = dateString.split(' ');
  const [day, month, year] = dayPart.split('.').map(Number);
  const [hour, minute, second] = timePart.split(':').map(Number);

  return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
}

function CalculateDelays(delayData: SZResponse): DelayInfo {
  const result: DelayInfo = {
    companies: [],
    timeFetched: delayData.md
  };

  const companyTrains: Record<string, { trains: TrainInfo[], timeInfo: TimeInfo }> = {};

  delayData.result.forEach(train => {
    const company = train.properties.d;
    if (!companyTrains[company]) {
      companyTrains[company] = { trains: [], timeInfo: { under0: 0, to5: 0, over5: 0, over15: 0, over30: 0, over60: 0 } };
    }
    const companyTrainData = companyTrains[company];
    companyTrainData.trains.push({ type: train.properties.tt, delay: train.properties.de });

    const delay = train.properties.de;
    if (delay > 60) companyTrainData.timeInfo.over60++;
    else if (delay > 30) companyTrainData.timeInfo.over30++;
    else if (delay > 15) companyTrainData.timeInfo.over15++;
    else if (delay > 5) companyTrainData.timeInfo.over5++;
    else if (delay >= 0) companyTrainData.timeInfo.to5++;
    else companyTrainData.timeInfo.under0++;
  });

  Object.keys(companyTrains).forEach(companyName => {
    const companyData = companyTrains[companyName];
    const totalTrains = companyData.trains.length;
    const totalRegionalTrains = companyData.trains.filter(train => regionalTrainTypes.includes(train.type)).length;
    const totalLongDistanceTrains = totalTrains - totalRegionalTrains;
    const totalDelay = companyData.trains.reduce((sum, train) => sum + train.delay, 0);
    const totalRegionalDelay = companyData.trains.filter(train => regionalTrainTypes.includes(train.type)).reduce((sum, train) => sum + train.delay, 0);
    const totalLongDistanceDelay = totalDelay - totalRegionalDelay;

    const companyInfo: CompanyInfo = {
      company: companyName,
      avgDelay: {
        avgDelay: totalDelay / totalTrains,
        avgRegionalDelay: totalRegionalDelay / totalRegionalTrains,
        avgLongDistanceDelay: totalLongDistanceDelay / totalLongDistanceTrains
      },
      delayInfo: { ...companyData.timeInfo },
      trainCounts: {
        total: totalTrains,
        totalRegional: totalRegionalTrains,
        totalLongDistance: totalLongDistanceTrains
      }
    };
    result.companies.push(companyInfo);
  });

  result.companies.sort((a, b) => b.trainCounts.total - a.trainCounts.total);
  return result;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<DelayInfo>) {
  const szResponse = await GetSZData();
  const delayInfo = CalculateDelays(szResponse);
  res.status(200).setHeader("Cache-Control", "max-age=0, s-maxage=60").json(delayInfo);
}