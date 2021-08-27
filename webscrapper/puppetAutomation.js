// const userArr=require('../userData');
// const obj=userArr.pop();


// const obj={
//     name: "Hemant",
//     age: 27,
//     Email: "hemantsaraf08@gmail.com",
//     pincode: 110010
//     // no vaccine is available at 530068
// }

const puppeteer = require('puppeteer');
const {tableObjMaker, htmltablebuilder}=require('./driver.js');
const {mailsender}=require('./email.js');
let tablestr=""
let mailNotSent=true;
async function run(obj) {
    console.log("puppeteer running")
    console.log("mail not sent is:",mailNotSent);

    try {
        
        let browser = await puppeteer.launch({
            defaultViewport: null,
            headless: true,
            args: ["--start-maximized"]
        })
        let tab = await browser.newPage();
        await tab.goto("https://www.cowin.gov.in/");
        await tab.waitForTimeout(1000);
        console.log("puppeteer running", obj.pincode)
        await tab.type("#mat-input-0", String(obj.pincode), { delay: 100 });
        await tab.keyboard.press("Enter");

        await tab.waitForSelector(".agefilterblock");
        
        await tab.waitForSelector("div.mobile-hide");

        //check if slot is available
        const numAvailable=await tab.$$eval("a.totalslts", atags=>atags.length);
        
        if(numAvailable){
            //slots are available==> send mails stop cron job
            
            await tab.waitForSelector("li.availability-date");
            //to send mail 
            // first scrap the data into obj;
            let selectors=["li.availability-date", "div.row-disp", "ul.slot-available-wrap", "a.totalslts"]
            let tableObj=await tableObjMaker(tab, ...selectors);

            // next use node mailer and build html string with obj data
            tablestr=htmltablebuilder(tableObj);
            let htmlstr=`
            <h2>Dear ${obj.name},</h2>
            <h4>Below are the details of Vaccine dose available based on your pincode: ${obj.pincode}</h4>
            ${tablestr}
            <h4>Thanks for using LetsWin Covid</h4>
            `
            await mailsender(obj.email, htmlstr);
            mailNotSent=false;
            // console.log(htmlstr)          
        }
        await tab.waitForTimeout(500);
        await browser.close();
    } catch (err) {
        console.log(err);
    }
};

const getTablestr=()=>tablestr

module.exports.run=run;
module.exports.getTablestr=getTablestr;
module.exports.mailIsNotSent=()=>mailNotSent;