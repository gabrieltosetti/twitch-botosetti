const gifCommand = (pesquisa: string) => {
  // let pesquisaGif = commandName.substring(5);
  // client.say(target, `Voce pediu o gif ${pesquisaGif}`);
  // console.log(`* Executed ${commandName} command`);
  // posicaoAtual = utils.getRandomGifPos(posicaoAtual, 1, 5);
  // pesquisaGif = encodeURI(pesquisaGif);
  // let url = `https://g.tenor.com/v1/search?key=${tenorKey}&locale=pt_BR&q=${pesquisaGif}&limit=1&pos=${posicaoAtual}&contentfilter=high`;
  // https
  //   .get(url, (getRes) => {
  //     getRes.setEncoding("utf8");
  //     let rawData = "";
  //     getRes.on("data", (chunk) => {
  //       rawData += chunk;
  //     });
  //     getRes.on("end", () => {
  //       try {
  //         const parsedData = JSON.parse(rawData);
  //         const gifUrl = parsedData.results[0].media[0].gif.url;
  //         console.log(gifUrl);
  //         utils.responseWrite(gifUrl);
  //       } catch (e) {
  //         console.error(e.message);
  //       }
  //     });
  //   })
  //   .on("error", (e) => {
  //     console.error(`Got error: ${e.message}`);
  //   });
};

export default gifCommand;
