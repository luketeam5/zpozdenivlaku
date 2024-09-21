import { FunctionComponent } from "react";
import { CompanyInfo } from "../types/DelayInfo";

export const DelayTable: FunctionComponent<{
  companyInfos: Array<CompanyInfo>;
}> = ({ companyInfos }) => {
  return (
    <div className="overflow-x-auto dark">
      <table className="min-w-full divide-y divide-gray-200">
        <colgroup>
          <col span={3} />
          <col span={6} className="text-center" />
        </colgroup>
        <thead
          className="bg-gray-50"
          style={{ backgroundColor: "#0746dd" }}
        >
          <tr>
            <th
              rowSpan={2}
              className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
            >
              Dopravce
            </th>
            <th
              colSpan={3}
              className="hidden md:table-cell px-6 py-3 text-center text-xs font-bold text-white uppercase tracking-wider"
            >
              Počet vlaků
            </th>
            <th
              rowSpan={2}
              className="md:hidden px-6 py-3 text-center text-xs font-bold text-white uppercase tracking-wider"
            >
              Počet
              <br />
              vlaků
            </th>
            <th
              colSpan={3}
              className="hidden sm:table-cell px-6 py-3 text-center text-xs font-bold text-white uppercase tracking-wider"
            >
              Průměrné zpoždění
            </th>
            <th
              rowSpan={2}
              className="sm:hidden px-6 py-3 text-center text-xs font-bold text-white uppercase tracking-wider"
            >
              Průměrné
              <br />
              zpoždění
            </th>
            <th
              colSpan={6}
              className="px-6 py-3 text-center text-xs font-bold text-white uppercase tracking-wider"
            >
              Zpoždění v minutách
            </th>
          </tr>
          <tr>
            <th className="hidden md:table-cell px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Celkem
            </th>
            <th className="hidden md:table-cell px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Regionální
              <div className="text-xs font-light text-white">
                Os, Sp, LET, TL
              </div>
            </th>
            <th className="hidden md:table-cell px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Dálkové
              <div className="text-xs font-light text-white">
                R, IC, EC, RJ, LEO, ...
              </div>
            </th>
            <th className="hidden sm:table-cell px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Celkem
            </th>
            <th className="hidden sm:table-cell px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Regionální
            </th>
            <th className="hidden sm:table-cell px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Dálkové
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              {"<0"}
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              {"≤5"}
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              {">5"}
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              {">15"}
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              {">30"}
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              {">60"}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {companyInfos.map((x, index) => (
            <tr
              key={x.company}
              style={{
                backgroundColor: index % 2 === 0 ? "#0773fe" : "#0746dd",
              }}
            >
              <td className="px-6 py-4 whitespace-nowrap text-white">{x.company}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-white">
                {x.trainCounts.total}
              </td>
              <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-center text-white">
                {x.trainCounts.totalRegional}
              </td>
              <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-center text-white">
                {x.trainCounts.totalLongDistance}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center font-semibold text-white">
                {x.avgDelay.avgDelay.toFixed(2)}
              </td>
              <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-center text-white">
                {x.avgDelay.avgRegionalDelay !== null
                  ? x.avgDelay.avgRegionalDelay.toFixed(2)
                  : "-"}
              </td>
              <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-center text-white">
                {x.avgDelay.avgLongDistanceDelay !== null
                  ? x.avgDelay.avgLongDistanceDelay.toFixed(2)
                  : "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-white">
                {x.delayInfo.under0}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-white">
                {x.delayInfo.to5}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-white">
                {x.delayInfo.over5}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-white">
                {x.delayInfo.over15}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-white">
                {x.delayInfo.over30}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-white">
                {x.delayInfo.over60}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot
          className="bg-gray-50"
          style={{
            backgroundColor:
              companyInfos.length % 2 === 0 ? "#0773fe" : "#0746dd",
          }}
        >
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
              Celkový počet vlaků
            </th>
            <td className="px-6 py-3 text-center text-white">
              {companyInfos
                .map((x) => x.trainCounts.total)
                .reduce((a, b) => a + b, 0)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};