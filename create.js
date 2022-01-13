require('dotenv').config();

const csv = require('csvtojson');
const slugid = require('slugid');
const { createCustomer } = require('../util/api');

//Keep note of rate limits: https://developer.gladly.com/rest/#section/Default-Rate-Limit
const queue = require('queue');
let q = new queue({
  concurrency: 2
});

//Load CSV file
csv().fromFile(`${__dirname}/sample-excersize.csv`)
.then((rows) => {
  for(let rowIdx in rows) {
    let row = rows[rowIdx];

    let customerObject = {
      id: slugid.nice(), //generate a valid ID for this customer profile
      email: [],
      title: [],
      body: {}
    };

    q.push((cb) => {
      createCustomer(customerObject)
      .then(() => {
        console.log(`SUCCESS - ROW ${rowIdx}: Created customer with ID ${customerObject.id} and payload ${JSON.stringify(customerObject)}`);

        cb();
      })
      .catch((e) => {
        console.log(`ERROR - ROW ${rowIdx}: Could not create customer with payload ${JSON.stringify(customerObject)} due to ${JSON.stringify(e.response.data)} and HTTP status code ${e.response.status}`);

        cb();
      })
    });
  }

  console.log(`Starting API calls\n\n`);
  q.start(() => {
    console.log(`\n\nFinished processing file`)
  });
})
.catch((e) => {
  //Something went wrong opening the CSV file
  console.log(`Could not open CSV file to create new customers due to ${JSON.stringify(e)}`);
});
