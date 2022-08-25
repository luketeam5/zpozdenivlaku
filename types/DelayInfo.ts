export type DelayInfo = {
	companies: Array<CompanyInfo>,
	timeFetched: string
}

export type CompanyInfo = {
	company: string,
	avgDelay: AvgDelayInfo,
	trainCounts: CountInfo,
	delayInfo: TimeInfo
}

export type AvgDelayInfo = {
	avgDelay: number,
	avgRegionalDelay: number | null,
	avgLongDistanceDelay: number | null
}

export type TimeInfo = {
	under0: number,
	to5: number,
	over5: number,
	over15: number,
	over30: number,
	over60: number
}

export type TrainInfo = {
	type: string,
	delay: number
}

export type CountInfo = {
	total: number,
	totalRegional: number,
	totalLongDistance: number
}