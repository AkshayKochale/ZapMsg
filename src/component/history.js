function showHistoryTab()
{
    changeMainTab("historycontent");
   let historycontent= document.getElementById("historycontent");
   historycontent.innerHTML=`
              <div class="date-picker-container">
        <label for="history-date">Select Date:</label>
        <input type="date" id="history-date" name="history-date">
    </div>

    <!-- Tabs for Graph and Table -->
    <div class="tab-container">
        <button class="tab-button-history active" onclick="openTab('graph-tab')">Graph</button>
        <button class="tab-button-history" onclick="openTab('table-tab')">Table</button>
    </div>

    <!-- Content for Graph and Table -->
        <div id="graph-tab" class="tab-content active">
            <h3>Graph View</h3>
            <!-- Graph content can go here (e.g., a chart) -->
            <img  class="testImg" src='https://wcs.smartdraw.com/chart/img/basic-bar-graph.png?bn=15100111938'/>
        </div>

        <div id="table-tab" class="tab-content">
            <h3>Table View</h3>
            <!-- Table content can go here -->
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Data</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Sample Data 1</td>
                        <td>2024-10-17</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Sample Data 2</td>
                        <td>2024-10-17</td>
                    </tr>
                </tbody>
            </table>
        </div>
   
   `;
}


function openTab(tabId) {
    // Get all tab content divs and hide them
    var tabContents = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
        tabContents[i].classList.remove("active");
    }

    // Get all tab buttons and remove the active class
    var tabButtons = document.getElementsByClassName("tab-button");
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }

    document.getElementById(tabId).style.display = "block";
    document.getElementById(tabId).classList.add("active");
    document.querySelector(`[onclick="openTab('${tabId}')"]`).classList.add("active");
}

document.getElementById("graph-tab").style.display = "block";

