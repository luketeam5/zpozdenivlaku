import type { NextPage } from "next";
import useSWR from "swr";
import { DelayTable } from "../components/DelayTable";
import { DelayInfo } from "../types/DelayInfo";
import { MimoradnostInfo } from "../types/Mimoradnosti";

const Home: NextPage = () => {
  const { data, isValidating } = useSWR(
    "/api/getDelays",
    (...args) => fetch(...args).then((res) => res.json() as Promise<DelayInfo>),
    { refreshInterval: 60 * 1000 }
  );
  const { data: MimoradnostInfo } = useSWR(
    "/api/ziskatMimoradnosti",
    (...args) =>
      fetch(...args).then((res) => res.json() as Promise<MimoradnostInfo>),
    { refreshInterval: 60 * 1000 }
  );
  return (
    <div>
      <div className="flex flex-col items-center min-w-min p-4">
        <h1 className="text-center text-2xl font-bold mb-4 text-white">
          Průměrné zpoždění vlaků železničních dopravců v ČR
        </h1>
        <span className="text-sm text-gray-600">
          {"Další aktualizace: " +
            (data ? new Date(data.timeFetched).toLocaleTimeString() : "") +
            (!data || isValidating ? ", načítání..." : "")}
        </span>

        {MimoradnostInfo && (
          <div className="bg-yellow-200 text-yellow-800 p-4 rounded-lg mb-4">
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
      <div className="bg-black text-white p-4 text-center">
        <p>
          Tato stránka je neoficiální.
          Pro aktuální informace o zpoždění vlaků navštivte{" "}
          <a
            href="https://mapy.spravazeleznic.cz/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            web Správy železnic
          </a>
          nebo sledujte informace dopravce.
        </p>
        <p>
          Zdrojový kód této stránky je k dispozici na{" "}
          <a
            href="https://github.com/luketeam5/zpozdenivlaku"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            GitHubu
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Home;
