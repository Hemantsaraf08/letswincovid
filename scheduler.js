// const {CronJob}=require("cron");

// const WebScrapper = require("./web-scraper");

// console.log("Scheduler Started: every 5 mins");
// const fetchRemote= new CronJob("*/5 * * * *", async () => {
//   console.log("Fetching data...");
//   await WebScrapper.run();
// });
// //You need to explicity start the cronjob 
// fetchRemote.start();

const {mailIsNotSent}=require("./webscrapper/puppetAutomation");

module.exports.schedule = async function (cbfn, param, crontime) {
    console.log("scheduler is running");
  try {
    console.log("mail is not sent=", mailIsNotSent());
    while()
    setTimeout(() => cbfn(param), crontime);
    console.log("mail is not sent=",mailIsNotSent())
    // while (true) {
    //   if (condition) {
    //   } else {
    //     break;
    //   }
    // }
    console.log("scheduler stoped");
  }catch(e){
    console.log(e);
  } 
}