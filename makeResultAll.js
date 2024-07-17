import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";
//import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";
import { DateTime } from "https://js.sabae.cc/DateTime.js";

const spotmap = {
  都道府県: true,
  市町村: "市区町村",
  撮影場所: true,
  撮影日時: true,
  緯度: true,
  経度: true,
  "夜空の明るさ\n（等級（mag/□”）": "夜空の明るさ\n（等級（mag/□”））",
  ばらつき: true,
  周辺状況: true,
  継続観察登録地点: true,
  備考: true,
  都道府県名: "都道府県",
  市町村名: "市区町村",
  "夜空の明るさ\n（等級（mag/□”））": true,
  市区町村: true
};

/*
const getCity = (i) => {
  const name = i.市区町村;
  if (name == null) console.log(i)
  const n =  name.indexOf(" ");
  if (n >= 0) return name.substring(n + 1);
  return name;
};
*/

const normalizeSpot = (i) => {
  const res = {};
  for (const name in i) {
    const name2 = spotmap[name];
    if (name2 === undefined) {
      new Error("undefined name: " + name);
    }
    if (typeof name2 == "string") {
      res[name2] = i[name];
    } else if (name2 === true) {
      res[name] = i[name];
    }
  }
  return res;
};

const normalizeDateTime = (dt, year) => {
  try {
    const res = new DateTime(dt);
    if (res.day.year == year) return res.toString();
    //console.log(res, res.day.year, year, dt);
    return null;
  } catch (e) {
  }
  try {
    const res = new DateTime(year + "年" + dt);
    if (res.day.year == year) return res.toString();
    console.log(res, res.day.year, year, dt);
  } catch (e) {
    throw new Error(dt);
  }
};

const list = await CSV.fetchJSON("hoshizora_result/index.csv");
const spots = [];
for (const item of list) {
  const list2 = await CSV.fetchJSON("hoshizora_result/" + item.file);
  for (const spot0 of list2) {
    const spot = normalizeSpot(spot0);
    if (!spot.都道府県 || !spot.撮影日時) continue;
    const year = parseInt(item.file.substring(7, 7 + 4));
    const ndt = normalizeDateTime(spot["撮影日時"], year);
    if (!ndt) continue; // 日付不正
    spot["撮影日時"] = ndt;
    spots.push(spot);
  }
}
await Deno.writeTextFile("hoshizora_result/result_all.csv", CSV.stringify(spots));
