import { FunctionComponent, useState } from "react";
import { CompanyInfo } from "../types/DelayInfo";

export const DelayTable: FunctionComponent<{companyInfos: Array<CompanyInfo>}> = ({companyInfos}) => {
	return (
		<table className="[&_:is(td,th)]:px-1 w-full sm:w-auto">
			<colgroup>
				<col span={3}/>
				<col span={6} className="text-center"/>
			</colgroup>
			<thead>
				<tr className="bg-zinc-300 dark:bg-zinc-700">
					<th rowSpan={2}>Dopravce</th>
					<th rowSpan={2}>Počet<br/>vlaků</th>
					<th rowSpan={2}>Průměrné<br/>zpoždění</th>
					<th colSpan={6}>Zpoždění v minutách</th>
				</tr>
				<tr className="bg-zinc-200 dark:bg-zinc-800">
					<th>{"<0"}</th>
					<th>{"≤5"}</th>
					<th>{">5"}</th>
					<th>{">15"}</th>
					<th>{">30"}</th>
					<th>{">60"}</th>
				</tr>
			</thead>
			<tbody className="[&>tr:nth-child(even)]:bg-zinc-300 dark:[&>tr:nth-child(even)]:bg-zinc-700">
			{companyInfos.map(x => (
				<tr key={x.company} className="[&>td:nth-child(n+4)]:text-center">
					<td>{x.company}</td>
					<td>{x.delayInfo.total}</td>
					<td>{x.avgDelay.toFixed(2)}</td>
					<td>{x.delayInfo.under0}</td>
					<td>{x.delayInfo.to5}</td>
					<td>{x.delayInfo.over5}</td>
					<td>{x.delayInfo.over15}</td>
					<td>{x.delayInfo.over30}</td>
					<td>{x.delayInfo.over60}</td>
				</tr>
			))}
			</tbody>
			<tfoot>
				<tr>
					<th>Celkový počet vlaků</th>
					<td>{companyInfos.map(x => x.delayInfo.total).reduce((a, b) => a + b, 0)}</td>
				</tr>
			</tfoot>
		</table>
	)
}