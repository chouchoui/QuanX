const mobileWebRegex = /^https:\/\/m\.ithome\.com\/api\/news\/newslistpageget/;
const appRegex = /^https:\/\/api\.ithome\.com\/json\/(listpage|newslist)\/news/;
const appSlideRegex = /^https:\/\/api\.ithome\.com\/json\/slide\/index/;
const newAppFeed = /^https:\/\/napi\.ithome\.com\/api\/(news|topmenu)\/(getfeeds|index)/;

let body = JSON.parse($response.body);

if (mobileWebRegex.test($request.url)) {
  body.Result = body.Result.filter((r) => r.NewsTips.every((t) => t.TipName !== "广告"));
} else if (appRegex.test($request.url)) {
  body.newslist = body.newslist.filter((n) => !n.aid);
} else if (appSlideRegex.test($request.url)) {
  const newList = body.filter((i) => !i.isad);
  body.splice(0, body.length);
  body.push(...newList);
} else if (newAppFeed.test($request.url)) {
  let list = body.data.list;
  const newList = [];
  for (const item of list) {
    if (item.feedContent.smallTags && item.feedContent.smallTags.some((s) => s.text === "广告")) {
      continue;
    }
    if (item.feedContent.focusNewsData) {
      const newNewsData = item.feedContent.focusNewsData.filter((n) => !n.isAd);
      item.feedContent.focusNewsData = newNewsData;
    }
    newList.push(item);
  }
  body.data.list = newList;
}

body = JSON.stringify(body);
$done({ body });
