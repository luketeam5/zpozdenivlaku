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
					<th colSpan={3} className="hidden md:table-cell">Počet vlaků</th>
					<th rowSpan={2} className="md:hidden">Počet<br/>vlaků</th>
					<th colSpan={3} className="hidden sm:table-cell">Průměrné zpoždění</th>
					<th rowSpan={2} className="sm:hidden">Průměrné<br/>zpoždění</th>
					<th colSpan={6}>Zpoždění v minutách</th>
				</tr>
				<tr className="bg-zinc-200 dark:bg-zinc-800">
					<th className="hidden md:table-cell">Celkem</th>
					<th className="hidden md:table-cell">Regionální</th>
					<th className="hidden md:table-cell">Dálkové</th>
					<th className="hidden sm:table-cell">Celkem</th>
					<th className="hidden sm:table-cell">Regionální</th>
					<th className="hidden sm:table-cell">Dálkové</th>
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
				<tr key={x.company} className="[&>td:nth-child(n+2)]:text-center">
					<td>{x.company}</td>
					<td>{x.trainCounts.total}</td>
					<td className="hidden md:table-cell">{x.trainCounts.totalRegional}</td>
					<td className="hidden md:table-cell">{x.trainCounts.totalLongDistance}</td>
					<td>{x.avgDelay.avgDelay.toFixed(2)}</td>
					<td className="hidden sm:table-cell">{x.avgDelay.avgRegionalDelay !== null ? x.avgDelay.avgRegionalDelay.toFixed(2) : "-"}</td>
					<td className="hidden sm:table-cell">{x.avgDelay.avgLongDistanceDelay !== null ? x.avgDelay.avgLongDistanceDelay.toFixed(2) : "-"}</td>
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
					<td className="text-center">{companyInfos.map(x => x.trainCounts.total).reduce((a, b) => a + b, 0)}</td>
				</tr>
			</tfoot>
		</table>
	)
}