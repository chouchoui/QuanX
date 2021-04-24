const url = $request.url;
const params = getUrlParams(url);
const resourceUrl = params.url;

(async () => {
  console.log(`解析资源：${params.url}`);
  let data = await getResouceData(params.url);
  data = filterOut(data);
  $done({ response: { body: data } });
})();

function filterOut(data) {
  if (params.out) {
    const out = params.out.replace(/\+/g, "|");
    console.log(`过滤关键词：${out}`);
    const regStr = `^((?!(hostname|#)).*)(${out})(.*)\n`;
    const regex = new RegExp(regStr, "gmi");
    const matchs = data.match(regex);
    if (matchs && matchs.length > 0) {
      for (const item of matchs) {
        console.log(item.replace(/\n/g, ""));
      }
    }
    return data.replace(regex, "");
  } else {
    return data;
  }
}

function getResouceData(url) {
  const promise = new Promise((resolve) => {
    $httpClient.get(url, (err, res, data) => {
      resolve(data);
    });
  });
  return promise;
}

function getUrlParams(url) {
  return Object.fromEntries(
    url
      .slice(url.indexOf("?") + 1)
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}
