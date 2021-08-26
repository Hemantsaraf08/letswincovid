
async function tableObjMaker(tab, datesSelector, centerNameSelector, vaccineRowsSelector, vaccineQtySelector) {
    let tableObj = {}
    
    let headerArr = await tab.evaluate(getHeaderArr, datesSelector);
    headerArr.unshift("Vaccine Center Details")
    tableObj.header = headerArr;
    
    let cDetails = await tab.evaluate(getCenterArr, centerNameSelector);
    tableObj.centerNames=cDetails;
    
    let vaccinesDetails=await tab.evaluate(getVaccineDetails, vaccineRowsSelector, vaccineQtySelector);
    tableObj.vaccinesDetails=vaccinesDetails;
    
    
    return tableObj;
}

function getHeaderArr(datesSelector) {
    let dates = [];
    let a = document.querySelectorAll(datesSelector);
    for (let i = 0; i < 7; i++) {
        date = a[i].innerText;
        dates.push(date);
    }
    return dates;
}

function getCenterArr(centerNameSelector) {
    let c = document.querySelectorAll(centerNameSelector);
    let res = Array.from(c)
    let required = res.filter(div => div.classList.length === 1)
    let cDetails=[];
    for (let i = 0; i < required.length; i++) {
        let name= required[i].innerText.split("\n\n").join(" ");
        cDetails.push(name)
    }
    return cDetails;
}

async function getVaccineDetails(vaccineRowsSelector, vaccineQtySelector){
    let vaccines=[];
    var ulTags=document.querySelectorAll(vaccineRowsSelector);
    for(let i=0;i<ulTags.length;i++){
        let day=[];
        for(let j=0;j<7;j++){
            let str="";
            let node=ulTags[i].children[j];
            console.log(node);
            let temp=node?.querySelectorAll(vaccineQtySelector);
            console.log(temp);
            if(temp?.length!==0){
                for(let k=0;k<temp?.length;k++){
                    str+=temp[k].parentElement.previousElementSibling.innerText;
                    str+="-"+ temp[k].innerText+"; "
                }
            }
            day[j]=str;
        }
        vaccines.push(day);
    }
    return vaccines;
}

function htmltablebuilder(tableObj){
    const headertext=headertxt(tableObj.header);
    const bodytext=bodytxt(tableObj);
    let htmlstr=`<table>
    <thead>
    ${headertext}
    </thead>
    <hr>
    <tbody>
    ${bodytext}
    </tbody>
    <hr>
    <tfoot>
    </tfoot>
    </table>
    `
    
    return htmlstr;
}

function headertxt(headerArr){
    let str=""
    for(let i=0;i<headerArr.length;i++){
        let text=`<th>${headerArr[i]}</th>`
        str+=text;        
    }
    return `<tr>${str}</tr>`
}

function bodytxt(tableObj){
    const {centerNames, vaccinesDetails, header}=tableObj;
    // vaccinesDetails is array of array, centerNames is array of strings
    let allrows="";
    for(let i=0;i<centerNames.length;i++){
        let tmeprow="";
        let currRow=vaccinesDetails[i];
        for(let j=0;j<header.length;j++){
            if(j==0){
                let text=`<td>${centerNames[i]}</td>`
                tmeprow+=text;
            }else{
                let temp=`<td>${currRow[j-1]}</td>`
                tmeprow+=temp;
            }
        }
        allrows+=`<tr>${tmeprow}</tr>`
    }
    return allrows;
}

module.exports={tableObjMaker, htmltablebuilder};