export interface SZResponse {
	result: Array<{
		properties: {
			de: number, //Delay in minutes
			d: string, //Train carrier
		}
	}>,
	md: string //Time of request
}