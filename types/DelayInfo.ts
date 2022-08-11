export type DelayInfo = {
	companies: Array<CompanyInfo>,
	timeFetched: string
}

export type CompanyInfo = {
	company: string,
	avgDelay: number,
	delayInfo: TimeInfo & {total: number}
}

export type TimeInfo = {
	under0: number,
	to5: number,
	over5: number,
	over15: number,
	over30: number,
	over60: number
}