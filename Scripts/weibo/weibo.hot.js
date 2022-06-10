let body = JSON.parse($response.body);

body.cards[0].card_group = body.cards[0].card_group.filter(c=>!c.itemid.includes("t:51"));
body = JSON.stringify(body);

$done({ body });
