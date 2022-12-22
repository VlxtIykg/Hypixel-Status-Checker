/* Respond to multiple fetch statements */
// Async
acct2.forEach(async (item) => {
  const response = await item.json();
  acct1.push(response);
});

// Sync
acct2.forEach((item) => {
  item
    .json()
    .then((data) => {
      acct1.push(data);
    })
    .then(() => {
      console.log(acct1);
    });
});

// for of async
async () => {
  const jsonRes = async (array) => {
    const acct1 = [];

    for (const eachRes of array) {
      const response = await eachRes.json();
      acct1.push(response);
    }

    return acct1;
  };

  const json = await jsonRes(acct2);
  return json;
};

/* Api throttle key check, kinda scuffed */
// check if online
users.forEach((counter, index) => {
  console.log(users[index].interval);
  setInterval(async () => {
    // TODO: Make statusRes into its own function to be ran after key throttle
    let statusRes = await fetch(
      `https://api.hypixel.net/status?key=${api[key].key}&uuid=${uuid[index]}`
    );
    apiUses++;
    let status = await statusRes.json(); // TODO: Combine .json() to statusRes function

    if (
      apiUses > 139 ||
      (status.success === false && status.cause === "Key throttle")
    ) {
      // FIXME: Proper guard clause, proper key checking, proper throttles
      key++;
      // Guard clause 1
      if (key >= api.length) {
        key = 0;
      } // TODO: Add a check that checks if every key is throttled with its own inkling
      apiUses = 0;
      console.log("Key throttled!!");
      // FIXME: Better if else statements
      statusRes = await fetch(
        `https://api.hypixel.net/status?key=${api[key].key}&uuid=${uuid[index]}`
      );
      status = await statusRes.json();
      console.log({ api, key });
      // TODO: Sends a message every interval, make minimal interval of bot to be max 1 request per minute 60000ms
    }
    console.table(status);
    console.log(`${api[key].key}: ${apiUses}`);
    console.log(key);
  }, users[index].interval);
});
