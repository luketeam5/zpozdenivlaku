import type { NextPage } from "next";
import useSWR from "swr";
import { DelayTable } from "../components/DelayTable";
import { DelayInfo } from "../types/DelayInfo";
import { MimoradnostInfo } from "../types/Mimoradnosti";

const Home: NextPage = () => {
  const { data, isValidating } = useSWR(
    "/apiv/getDelays",
    (...args) => fetch(...args).then((res) => res.json() as Promise<DelayInfo>),
    { refreshInterval: 60 * 1000 }
  );
  const { data: MimoradnostInfo } = useSWR(
    "/apiv/ziskatMimoradnosti",
    (...args) =>
      fetch(...args).then((res) => res.json() as Promise<MimoradnostInfo>),
    { refreshInterval: 60 * 1000 }
  );
  console.log(MimoradnostInfo?.pocetMimoradnosti);
  return (
    <div className="flex flex-col items-center min-w-min p-4">
      <h1 className="text-center text-2xl font-bold mb-4">
        Průměrné zpoždění vlaků železničních dopravců v ČR
      </h1>
      <span className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {"Naposledy aktualizováno: " +
          (data?.timeFetched ? data.timeFetched : "nikdy") +
          (!data || isValidating ? ", načítání..." : "")}
      </span>

      {MimoradnostInfo && (
        <div className="bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 p-4 rounded-lg mb-4">
          <p className="font-bold">⚠️ Pozor, mimořádnosti na trati!</p>
          <p>Počet mimořádností: {MimoradnostInfo.pocetMimoradnosti}</p>
          <a
            href="https://mapy.spravazeleznic.cz/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Detaily mimořádností naleznete na mapě Správy železnic
          </a>
        </div>
      )}

      {data && <DelayTable companyInfos={data?.companies} />}
    </div>
  );
};

export default Home;
