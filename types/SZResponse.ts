export interface SZResponse {
	result: Array<{
		properties: {
			de: number, //Delay in minutes
			tt: string //Train type
			d: string, //Train carrier
		}
	}>,
	md: string //Time of request
}