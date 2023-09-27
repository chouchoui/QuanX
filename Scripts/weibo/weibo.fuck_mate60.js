let body = JSON.parse($response.body);

/*
{
  "categories": [
    {
      "group_type": 5,
      "pageDatas": [
        {
          "ad_scene": 1,
          "gid": "232843_KA-4762",
          "navigation_info": {
            "max_width": 90,
            "title": "Mate60"
          },
          "navigation_title": "Mate60",
          "pageDataType": "feedStream",
          "params": {
            "adid": "KA-4762"
          },
          "type": 40,
          "uid": "2007383705697"
        }
      ]
    }
  ],
  "pageDataTitle": "Mate60",
  "pageDataType": "homeExtend",
  "pageId": "homeExtend"
}
*/

if (body.pageDatas && body.pageDatas.length > 0) {
  body.pageDatas = body.pageDatas.filter((p) => {
    let result = true;
    if (p.categories && p.categories.length > 0) {
      for (const c of p.categories) {
        if (c.pageDatas && c.pageDatas.length > 0) {
          return !c.pageDatas.some((a) => a.params && a.params.adid);
        }
      }
    }
    return result;
  });
}

if (body.cached_ad && body.cached_ad.ads && body.cached_ad.ads.length > 0) {
  body.cached_ad.ads.forEach((element) => {
    element.start_date = 3786912000;
    element.end_date = 3786912001;
  });
}

$done({ body: JSON.stringify(body) });
