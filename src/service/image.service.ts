import axios from "axios";
import fs from "fs";
import Jimp from "jimp";
import wrap from "word-wrap";
import { JSDOM } from "jsdom";

const fetchBg = async (name: string) => {
  // url = "https://source.unsplash.com/collection/" + collection_id + "/1080x1080"
  const url = "https://source.unsplash.com/1080x1080/?nature,mountain";
  // url = "https://source.unsplash.com/1080x1080/daily?featured"
  // url = "https://source.unsplash.com/collection/881815/1080x1080"
  // url = "https://source.unsplash.com/collection/482366/1080x1080"
  // url = "https://images.unsplash.com/photo-1433086994863-5f3136c18a58?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&h=1080&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=8a754b293c59d35bf4309cd87d8fc601"
  const writer = fs.createWriteStream(`src/images/${name}.jpg`);
  const resp = await axios({
    method: "get",
    url,
    responseType: "stream",
  });
  if (resp.status !== 200) {
    throw new Error("Fetch bg error.");
  }
  resp.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
};

const getQuote = async (): Promise<{ quote: string; author: string }> => {
  let finalQuote = { quote: "", author: "" };
  while (finalQuote.quote === "" || finalQuote.author === "") {
    const i = Math.floor(Math.random() * 99) + 1;
    const url =
      "https://www.passiton.com/inspirational-quotes?page=" + i.toString();
    const resp = await axios({ method: "get", url });
    if (resp.status !== 200) {
      throw new Error("Get quote error.");
    }
    const dom = new JSDOM(resp.data);
    const allQuotes =
      dom.window.document.querySelector("div#all_quotes")?.children || [];
    const j = Math.floor(Math.random() * allQuotes.length);
    const quoteDiv = allQuotes[j].querySelector("div.box.clickable");
    if (quoteDiv) {
      const quote = quoteDiv?.children[0]?.textContent;
      const author = quoteDiv?.children[1]?.textContent;
      if (quote && author) {
        finalQuote = {
          quote: formatQuote(quote),
          author: formatAuthor(author),
        };
      }
    } else {
      const link =
        "https://www.passiton.com" +
        allQuotes[j].querySelector("a")?.getAttribute("href");
      const resp = await axios({ method: "get", url: link });
      const dom = new JSDOM(resp.data);
      const quote = dom.window.document.querySelector(".quotation")
        ?.parentElement?.children[1].textContent;
      const author = dom.window.document
        .querySelector(".quotation")
        ?.parentElement?.children[2].innerHTML.split("<small>")[0]
        .trim();
      if (quote && author) {
        finalQuote = {
          quote: formatQuote(quote),
          author: formatAuthor(author),
        };
      }
    }
  }
  return finalQuote;
};

const filterImage = async (name: string) => {
  const image = await Jimp.read(`src/images/${name}.jpg`);
  await image
    .color([{ apply: "shade", params: [25] }])
    .writeAsync(`src/images/${name}.jpg`);
};

const writeQuote = async (
  fileName: string,
  data: { quote: string; author: string }
) => {
  let { quote, author } = data;
  const quoteFont = await Jimp.loadFont("src/fonts/kaushan/kaushan.ttf.fnt");

  let count = 1;
  let q_width = Jimp.measureText(quoteFont, quote); // width of text
  let lines: any = "";
  while (true) {
    while (q_width > 960) {
      count += 1;
      lines = wrap(quote, {
        indent: "",
        trim: true,
        width: Math.round(quote.length / count),
      });
      lines = lines.split(`\n`);
      q_width = Jimp.measureText(quoteFont, lines[0]);
    }
    if (count < 6) {
      break;
    } else {
      data = await getQuote();
      quote = data.quote;
      author = data.author;
      count = 1;
      q_width = Jimp.measureText(quoteFont, quote); // width of text
      lines = "";
    }
  }
  const imageHeight = 1080;
  const quoteHeight = 100 * lines.length;
  let y = (imageHeight - quoteHeight) / 2 - 100;
  for (const quotePart of lines) {
    const image = await Jimp.read(`src/images/${fileName}.jpg`);
    await image
      .print(
        quoteFont,
        20,
        y,
        { text: quotePart, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER },
        1000
      )
      .writeAsync(`src/images/${fileName}.jpg`);
    y += 100;
  }
  y += 50;
  const authorFont = await Jimp.loadFont("src/fonts/pacifico/pacifico.ttf.fnt");
  const image = await Jimp.read(`src/images/${fileName}.jpg`);
  await image
    .print(
      authorFont,
      0,
      y,
      { text: `- ${author}`, alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT },
      1000
    )
    .writeAsync(`src/images/${fileName}.jpg`);
};

const formatAuthor = (author: string) => {
  return author;
};

const formatQuote = (quote: string) => {
  return quote.substring(1, quote.length - 1);
};

export const prepareImage = async (name: string) => {
  await fetchBg(name);
  const [filter, { quote, author }] = await Promise.all([filterImage(name), getQuote()])
  await writeQuote(name, { quote, author });
};
