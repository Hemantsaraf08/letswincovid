const {CronJob}=require("cron");

const WebScrapper = require("./web-scraper");

console.log("Scheduler Started: every 5 mins");
const fetchRemote= new CronJob("*/5 * * * *", async () => {
  console.log("Fetching data...");
  await WebScrapper.run();
});
//You need to explicity start the cronjob 
fetchRemote.start();