import { Agent } from "https";
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { MimoradnostiResponse } from "../../types/Mimoradnosti";

async function ZiskatMimoradnostiOmezeniVyluky(): Promise<MimoradnostiResponse> {
  const res = await fetch(
    "https://mapy.spravazeleznic.cz/serverside/request2.php?module=Layers\\MimoradneUdalosti&action=load",
    {
      headers: {
        Host: "mapy.spravazeleznic.cz",
        Origin: "https://mapy.spravazeleznic.cz",
      },
      referrer: "https://mapy.spravazeleznic.cz",
      agent: new Agent({ rejectUnauthorized: false }),
    }
  );

  return (await res.json()) as MimoradnostiResponse;
}





export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await ZiskatMimoradnostiOmezeniVyluky();

  const pocetMimoradnosti = data.result.features.filter(
    (mimoradnost) => mimoradnost.properties.MU_DRUH_UDALOSTI !== 0
  ).length;

  res.status(200).json({ pocetMimoradnosti });
}
