function showHistoryTab()
{
    changeMainTab("historycontent");
   let historycontent= document.getElementById("historycontent");

   const data = [
    ['Type', 'Value'],
    ['In-app Message', 45],
    ['Email', 26]
];
    let pieChart=createPieChart(data,"From 26 Oct");

    const trendData = [
        ['Time', 'In-app Msg', 'Email'],  // Header row with labels for both lines
        ['Jan', 30, 20],
        ['Feb', 40, 25],
        ['Mar', 45, 35],
        ['Apr', 35, 30],
        ['May', 50, 45],
        ['Jun', 55, 55]
    ];
    

   let trendChart=createTrendChart(trendData);


   historycontent.innerHTML=`
              <span class="date-picker-container">
        <label for="history-date" class="history-date-text">Select From Date:</label>
        <input type="date" id="history-date" name="history-date">
    </span>

    <div class="tab-container">
    <div class="title-history">History</div>
        <button class="tab-button-history active" onclick="openTab('graph-tab')">Graph</button>
        <button class="tab-button-history" onclick="openTab('table-tab')">Table</button>
    </div>

        <div id="graph-tab" class="tab-content-history active" style="display: flex; position: relative; width: 100%;">
               `+pieChart+` `+trendChart+`
        </div>

        <div id="table-tab" class="tab-content-history" style="display:none">
           
        </div>
   
   `;

   var historyData=getHistoryData(); 
   var table = getTableObj1();
     table.draw(historyData, getTableSettingsHistory());
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


function getHistoryData() {
    var data = new google.visualization.DataTable();

    data.addColumn('string', 'Username');
    data.addColumn('string', 'Date'); 
    data.addColumn('string', 'Message Type'); 

    data.addRows([
        ['Akshay Kochale', '2024-10-01', 'Info'],
        ['Ramon Dino', '2024-10-02', 'Warning'],
        ['Suzi Lexus', '2024-10-03', 'Error'],
        ['John Doe', '2024-10-04', 'Success'],
        ['Jane Smith', '2024-10-05', 'Info'],
        ['Alice Johnson', '2024-10-06', 'Warning'],
        ['Bob Brown', '2024-10-07', 'Error'],
        ['Charlie Davis', '2024-10-08', 'Success'],
        ['Diana Prince', '2024-10-09', 'Info'],
        ['Edward Elric', '2024-10-10', 'Warning'],
        ['Fiona Green', '2024-10-11', 'Error'],
        ['George White', '2024-10-12', 'Success'],
        ['Hannah Blue', '2024-10-13', 'Info'],
        ['Ian Gray', '2024-10-14', 'Warning'],
        ['Jack Black', '2024-10-15', 'Error'],
        ['Kylie Pink', '2024-10-16', 'Success'],
        ['Leo Yellow', '2024-10-17', 'Info'],
        ['Maya Purple', '2024-10-18', 'Warning'],
        ['Nina Orange', '2024-10-19', 'Error'],
        ['Owen Red', '2024-10-20', 'Success']
    ]);

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
            headerRow: 'google-chart-header',    // Header row class
            tableRow: 'google-chart-data',       // Data row class
            oddTableRow: 'odd-row',              // Optional styling for odd rows
            hoverTableRow: 'table-hover'         // Optional styling for hover effect
        }
    };

    return setting;
}
