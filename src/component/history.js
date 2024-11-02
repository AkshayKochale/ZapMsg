function showHistoryTab()
{
    changeMainTab("historycontent");
    let historycontent= document.getElementById("historycontent");

    let content=`
             <span class="title-history-temp">History</span>
            <span class="date-picker-container">
         <label for="history-date" class="history-date-text">Select From Date:</label>
         <input type="date" id="history-date" name="history-date">
         <button class="submitDate" id="submitDate" onClick="displayCharts(event)">Submit</button>
     </span>
 
     <div class="tab-container">
          <div class="landingcontentHistory" id="landingcontentHistory" >
                    <span class="welcomeMsgHistory" id="welcomeMsgHistory"> Select Date to see History</span>
                    <img class="HistoryImg" src="../assets/historyLandingImage.svg"> </img>
                </div>    
         </div>         
         
        `

        historycontent.innerHTML=content;  
        
}


 async function displayCharts(event)
 {
    event.preventDefault(); 
    startLoader(); 
    let historycontent= document.getElementById("historycontent");
    const dateInput = document.getElementById("history-date").value;
    
    

       let inputdata={
            date:dateInput,
            token :gettokenfromlocalStorage()
       }; 
    const apiData = await zapAPICaller("post",urlPrefixServices+"/history/getfromdate",inputdata,3000); 

    if(apiData ==null || apiData.legend==0 ||apiData.status=="failed")
    {
        let status =apiData.output;

        if(status==null || status==undefined )status="No data available";
        stopLoader();
        showToastMsg("Failed", status, "Failed");
        return;
    }

    let aggCount=apiData.aggCount;

    const data = [
     ['Type', 'Value'],
     ['In-app Message', aggCount.notification],
     ['Email', aggCount.email]
 ];
     let pieChart=createPieChart(data,"From "+dateInput);
 
     const trendData = [
         ['Time', 'In-app Msg', 'Email'],  
     ];

     let dateWise=apiData.dateWise     
     
     for (let key in dateWise) 
    {
        trendData.push([key,dateWise[key].notification,dateWise[key].email]);
     }
     
 
    let trendChart=createTrendChart(trendData);
 
 
    historycontent.innerHTML=`
               <span class="date-picker-container">
         <label for="history-date" class="history-date-text">Select From Date:</label>
         <input type="date" id="history-date" name="history-date">
         <button class="submitDate" id="submitDate" onClick="displayCharts(event)">Submit</button>
     </span>
 
     <div class="tab-container">
     <div class="title-history">History</div>
         <button class="tab-button-history active" onclick="openTab('graph-tab')">Graph</button>
         <button class="tab-button-history" onclick="openTab('table-tab')">Table</button>
     </div>
 
         <div id="graph-tab" class="tab-content-history active" style="display: flex; position: relative; width: 100%;">
                `+pieChart+` `+trendChart+`
         </div>
 
         <div id="table-tab" class="tab-content-history" style="display:none"></div>
        
    
    `;
 
    var historyData=getHistoryData(apiData.tableData); 
    var table = getTableObj1();
      table.draw(historyData, getTableSettingsHistory());
      stopLoader()
 }

function openTab(tabId) 
{

    var tabContents = document.getElementsByClassName("tab-content-history");
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
        tabContents[i].classList.remove("active");
    }

    var tabButtons = document.getElementsByClassName("tab-button-history");
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }

    if(tabId=="graph-tab")
    {
        document.getElementById(tabId).style="display:flex; position: relative; width: 100%;"
    }
    else
    document.getElementById(tabId).style.display = "block";

    document.getElementById(tabId).classList.add("active");
    document.querySelector(`[onclick="openTab('${tabId}')"]`).classList.add("active");
}

// document.getElementById("graph-tab").style.display = "block";


function createPieChart(data,title) {
    
    const chartId = 'chart-pie'
    
    const chartDiv = `<div id="${chartId}" ></div>`;

    google.charts.setOnLoadCallback(function() {
        const dataTable = google.visualization.arrayToDataTable(data);
        const options = {
            title: title,
            is3D:true,
            pieSliceText: 'percentage',
            slices: {
                0: { color: '#F1E4FF' },
                1: { color: '#7F4BC1' },
                2: { color: '#7F4BC1' }
            }
        };

        const chart = new google.visualization.PieChart(document.getElementById(chartId));
        chart.draw(dataTable, options);
    });

    return chartDiv;
}


function createTrendChart(data) {
    const chartId = 'chart-trend';
    const chartDiv = `<div id="${chartId}"></div>`;

    
    google.charts.setOnLoadCallback(function() {
        const dataTable = google.visualization.arrayToDataTable(data);
        const options = {
            title: 'Trend',
            titleTextStyle:{
                            fontName: 'Raleway',
                            fontSize: 14,      
                            bold: true    
                            },
            curveType: 'function',  // Adds a smooth curve to the lines
            legend: { position: 'bottom' },
            colors: ['#7F4BC1', '#000'],  
            hAxis: { title: 'Duration' },  // Horizontal axis label
            vAxis: { title: 'Total Messages sent' }  // Vertical axis label
        };

        const chart = new google.visualization.LineChart(document.getElementById(chartId));
        chart.draw(dataTable, options);
    });

    // Return the div as a string to be appended elsewhere
    return chartDiv;
}


function getTableObj1()
{
    return new google.visualization.Table(document.getElementById('table-tab'));
}


function getHistoryData(tableData) {
    var data = new google.visualization.DataTable();

    data.addColumn('string', 'Username');
    data.addColumn('string', 'Date'); 
    data.addColumn('string', 'Message Type'); 
    data.addColumn({ type: 'string', label: 'View', p: { html: true } });

    tableData.forEach(history => {
                let viewBtn = '<button class="viewBtnHistory" onclick="viewHistoryMesg('+history.historyid+')">View</button>'
                    
                data.addRow([
                    history.username,
                    history.date,
                    history.type,
                    viewBtn
                ]);
            });

    return data;
}

function getTableSettingsHistory() {
    var setting = {
        showRowNumber: true,
        width: '100%',
        height: '100%', 
        alternatingRowStyle: false,
        page: 'enable', 
        pageSize: 14,   
        allowHtml: true,
        cssClassNames: {
            headerRow: 'google-chart-header',   
            tableRow: 'google-chart-data',      
            oddTableRow: 'odd-row',             
            hoverTableRow: 'table-hover'        
        }
    };


    return setting;
}


async function viewHistoryMesg(historyId)
{
    console.log("view history clicked !!!"+historyId);
    let showHistoryDiv=document.getElementById("showHistoryDiv");
    showHistoryDiv.style.display="block";
    makeBackgroundBlur()
    let historyMsgtitle=document.getElementById("historyMsg-title");
    let historyMsg=document.getElementById("historyMsg-msg");

    const apiData = await zapAPICaller("get", urlPrefixServices + "/history/getdetails/"+historyId, null, 0);
    
    if(apiData && apiData.status=="success")
    {
        let title=apiData.title;
        let message=apiData.message;

        historyMsgtitle.innerHTML=title;
        historyMsg.innerHTML=message;
    }
    else
    {
        showToastMsg("Failed",apiData.output,"Failed");
    }
}

function hideHistoryMsgDiv()
{
    let showHistoryDiv=document.getElementById("showHistoryDiv");
    showHistoryDiv.style.display="none";
    makeBackgroundBlur()
}

//
// const clientcontent=document.getElementById("clientcontent");
// const clientcontent=document.getElementById("clientcontent");

function makeBackgroundBlur()
{
       const content=document.getElementById("historycontent")
            content.classList.toggle("blur");

            tabs.classList.toggle("blur");
            collapseIcon.classList.toggle("blur");
          
           
}