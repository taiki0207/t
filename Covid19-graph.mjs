import Chart from "https://code4sabae.github.io/kafumon/lib/Chart.mjs";
import util from "https://taisukef.github.io/util/util.mjs";
import { Day } from "https://code4fukui.github.io/day-es/Day.js";


const main = async (parent) => {
  const url = "./data01.csv";
  const json1 = await util.fetchCSVtoJSON(url);
  console.log(json1);
  const json = json1.map(d => {
    return {
      "日付": new Day(d.Date).toString(),
      "陽性者数": d["陽性者数"],
      "陽性者数（累計）": d["(TOTAL)陽性者数"],
    }
  });
  console.log(json);

  const url2 = "./data2.csv";
  const json2 = await util.fetchCSVtoJSON(url2);
  console.log(json2);

  const date = [];
  const data_c = [];
　const data_b = [];
　const data_co = [];
const data_de = [];
const data_om = [];

  const names = ["日付","陽性者数","陽性者数（累計）"];
  const datas = [date, data_c,data_b];
  for (const d of json) {
    for (let i = 0; i < names.length; i++) {
      datas[i].push(d[names[i]]);
    }

   　　data_co.push(json2.find(e => new Day(d.日付).includes(new Day(e.開始日), new Day(e.終了日)))?.コロナ検索動向);
    data_de.push(json2.find(e => new Day(d.日付).includes(new Day(e.開始日), new Day(e.終了日)))?.デルタ検索動向);
	data_om.push(json2.find(e => new Day(d.日付).includes(new Day(e.開始日), new Day(e.終了日)))?.オミクロン検索動向);
  }
	
  const config = {
    data: {
      labels: date,
      datasets: [
         { type: "line", label: "陽性者数", data: data_c, borderColor: 'rgb(80, 80, 205)', fill: false, lineTension: 0, yAxisID: "yr" },
		 { type: "bar", label: "陽性者数（累計）", hidden: false, data: data_b, backgroundColor: 'rgb(255,100,0)', borderWidth: 1, borderColor: "#777", fill: false, lineTension: 0, yAxisID: "yl" },
		 { type: "bar", label: "コロナ検索動向", hidden: true, data: data_co, backgroundColor: 'rgb(99, 255, 132)', borderWidth: 1, borderColor: "#777", fill: false, lineTension: 0, yAxisID: "yl" },
		 {type: "bar", label: "デルタ検索動向", hidden: true, data: data_de, backgroundColor: 'rgb(10, 10, 12)', borderWidth: 1, borderColor: "#777", fill: false, lineTension: 0, yAxisID: "yl" },
		 {type: "bar", label: "オミクロン検索動向", hidden: true, data: data_om, backgroundColor: 'rgb(255, 99, 132)', borderWidth: 1, borderColor: "#777", fill: false, lineTension: 0, yAxisID: "yl" },
	]
    },
    options: {
      title: { display: true, text: "東京都の新型コロナウイルス発症日別による陽性者数と新型コロナウイルスに関わるキーワードの検索動向との関係" },
      scales: {
        xAxes: [{ scaleLabel: { display: false, labelString: "日付" } }],
        yAxes: [{ id: "yr", position: "right", scaleLabel: { display: true, labelString: "陽性者数" }, ticks: { beginAtZero: true } },
		{ id: "yl", position: "left", scaleLabel: { display: true, labelString: "陽性者数（累計）・検索動向" }, ticks: { beginAtZero: true } },
		],
      },
      legend: { display: true }
    }
  };

  parent.style.display = "block";
  parent.style.marginBottom = ".5em";

  const chart = document.createElement("canvas");
  chart.width = 600;
  chart.height = 250;
  new Chart.Chart(chart, config);
  parent.appendChild(chart);

  const atts = {};
  for (const a of parent.attributes) {
    atts[a.nodeName] = a.value;
  }
  if (atts["view-src"] && atts["view-src"]) {
    const div = document.createElement("div");
    div.style.textAlign = "center";
    div.style.fontSize = "80%";
    div.innerHTML = `データ出典：<a href=https://stopcovid19.metro.tokyo.lg.jp/data/130001_tokyo_covid19_positive_cases_by_day_of_symptom_onset.csv>オープンデータ｜東京都</a>、<a href=https://trends.google.co.jp/trends/>Google trend</a>`;
    parent.appendChild(div);
  }
};

class MHLWGraph extends HTMLElement {
  constructor () {
    super();
    main(this);
  }
}

customElements.define('mhlw-graph', MHLWGraph);