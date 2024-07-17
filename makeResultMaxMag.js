import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";

const getPref = (i) => i.都道府県;
const getCity = (i) => i.市区町村;
const getName = (i) => i.撮影場所;
const getMag = (i) => parseFloat(i["夜空の明るさ\n（等級（mag/□”））"]);

const isSameSpot = (n, m) => {
  return getPref(n) == getPref(m) && getCity(n) == getCity(m) && getName(n) == getName(m);
};

//colors: "blue", "green", "orange", "yellow", "red", "purple", "violet"
const getColorByMag = (mag) => {
  if (mag >= 21) return "red";
  if (mag >= 20) return "orange";
  if (mag >= 19) return "yellow";
  if (mag >= 18) return "green";
  return "blue";
};

const spots = await CSV.fetchJSON("hoshizora_result/result_all.csv");
const spots2 = [];
for (const spot of spots) {
  if (spot.備考.indexOf("参考値") >= 0) continue;
  if (spot.備考.indexOf("観察時間外") >= 0) continue;
  if (spot.備考.indexOf("観察期間外") >= 0) continue;
  if (isNaN(getMag(spot))) continue;
  
  const nhit = spots2.findIndex(i => isSameSpot(i, spot));
  if (nhit >= 0) {
    const hit = spots2[nhit];
    //console.log(getMag(spot), getMag(hit), nhit, spot)
    if (getMag(spot) > getMag(hit)) {
      spots2[nhit] = spot;
    }
  } else {
    spots2.push(spot);
  }
}
spots2.forEach(i => i.color = getColorByMag(getMag(i)));
await Deno.writeTextFile("hoshizora_result/result_maxmag.csv", CSV.stringify(spots2));
