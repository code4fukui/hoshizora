import { fetchOrLoad } from "https://js.sabae.cc/fetchOrLoad.js";
import { HTMLParser } from "https://js.sabae.cc/HTMLParser.js";
import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";
import { fetchSave } from "https://js.sabae.cc/fetchSave.js";

const url = "https://www.env.go.jp/air/life/hoshizorakansatsu/observe-4.html";
const baseurl = "https://www.env.go.jp/air/life/hoshizorakansatsu/";

const html = await fetchOrLoad(url);
const dom = HTMLParser.parse(html);
//console.log(html);

const links = ArrayUtil.toUnique(
  dom.querySelectorAll("a.ico-download")
    .map(i => i.getAttribute("href"))
    .filter(i => i.indexOf("_S") >= 0 || i.indexOf("_W") >= 0)
);
//console.log(links);

for (const link of links) {
  const url = baseurl + link;
  console.log(url);
  await fetchSave(url, "hoshizora_result/");
}
links.sort();
await Deno.writeTextFile("hoshizora_result/index.csv", CSV.stringify(links.map(i => ({ file: i.substring(4) }))));
