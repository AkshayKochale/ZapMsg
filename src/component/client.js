function  showClient()
{
    changeMainTab("clientcontent");
    let content=document.getElementById("clientcontent");
  content.innerHTML=`<div class="searchDiv">
    <div class="title-client">Clients</div>
    <input class="searchText" type="text" placeholder="search"
    oninput="filterTable(event)"/>
    <Button class="addBtn" title="Add Client" onclick="showAddContent(event)"> +  </Button></div><div id="table_div"></div>` ;

var data=getData(); 
var table = getTableObj();

table.draw(data, getTableSettings());

}



const rowsPerPage = 10; 
let currentPage = 10;


function getData()
{
    var data = new google.visualization.DataTable();
        
    data.addColumn('string', 'Username');
    data.addColumn('string', 'Email');
    data.addColumn('string', 'Phone');
    data.addColumn({ type: 'string', label: 'Status', p: { html: true } });
    data.addColumn('string', 'Client Type');

   
    data.addRows([
        ['Akshay Kochale', 'akshaykochale78@gmail.com', '1291929129129', '<button class="status-active" onclick="changeStatus()">Active</button>', 'Bot'],
        ['Ramon Dino', 'ramonDino@gmail.com', '1234467890', '<button class="status-inactive" onclick="changeStatus()">Inactive</button>', 'Bot'],
        ['Suzi lexus', 'suzi@yahoo.com', '1234467890', '<button class="status-active" onclick="changeStatus()">Active</button>', 'Real'],
        ['Akshay Kochale', 'akshaykochale78@gmail.com', '1291929129129', '<button class="status-active" onclick="changeStatus()">Active</button>', 'Bot'],
        ['Ramon Dino', 'ramonDino@gmail.com', '1234467890', '<button class="status-inactive" onclick="changeStatus()">Inactive</button>', 'Bot'],
        ['Suzi lexus', 'suzi@yahoo.com', '1234467890', '<button class="status-active" onclick="changeStatus()">Active</button>', 'Real'],
        ['Akshay Kochale', 'akshaykochale78@gmail.com', '1291929129129', '<button class="status-active" onclick="changeStatus()">Active</button>', 'Bot'],
        ['Ramon Dino', 'ramonDino@gmail.com', '1234467890', '<button class="status-inactive" onclick="changeStatus()">Inactive</button>', 'Bot'],
        ['Suzi lexus', 'suzi@yahoo.com', '1234467890', '<button class="status-active" onclick="changeStatus()">Active</button>', 'Real'],
        ['Akshay Kochale', 'akshaykochale78@gmail.com', '1291929129129', '<button class="status-active" onclick="changeStatus()">Active</button>', 'Bot'],
        ['Ramon Dino', 'ramonDino@gmail.com', '1234467890', '<button class="status-inactive" onclick="changeStatus()">Inactive</button>', 'Bot'],
        ['Suzi lexus', 'suzi@yahoo.com', '1234467890', '<button class="status-active" onclick="changeStatus()">Active</button>', 'Real'],
        ['Akshay Kochale', 'akshaykochale78@gmail.com', '1291929129129', '<button class="status-active" onclick="changeStatus()">Active</button>', 'Bot'],
        ['Ramon Dino', 'ramonDino@gmail.com', '1234467890', '<button class="status-inactive" onclick="changeStatus()">Inactive</button>', 'Bot'],
        ['Suzi lexus', 'suzi@yahoo.com', '1234467890', '<button class="status-active" onclick="changeStatus()">Active</button>', 'Real'],
        ['Akshay Kochale', 'akshaykochale78@gmail.com', '1291929129129', '<button class="status-active" onclick="changeStatus()">Active</button>', 'Bot'],
        ['Ramon Dino', 'ramonDino@gmail.com', '1234467890', '<button class="status-inactive" onclick="changeStatus()">Inactive</button>', 'Bot'],
        ['Suzi lexus', 'suzi@yahoo.com', '1234467890', '<button class="status-active" onclick="changeStatus()">Active</button>', 'Real'],
        ['Akshay Kochale', 'akshaykochale78@gmail.com', '1291929129129', '<button class="status-active" onclick="changeStatus()">Active</button>', 'Bot'],
        ['Ramon Dino', 'ramonDino@gmail.com', '1234467890', '<button class="status-inactive" onclick="changeStatus()">Inactive</button>', 'Bot'],
        ['Suzi lexus', 'suzi@yahoo.com', '1234467890', '<button class="status-active" onclick="changeStatus()">Active</button>', 'Real']
      ]);
      

      return data;
}

function getTableObj()
{
    return new google.visualization.Table(document.getElementById('table_div'));
}

function getTableSettings()
{
   var setting= {
        showRowNumber: true,
        width: '100%',    
        height: 'auto',
        alternatingRowStyle: false, 
        page: 'enable', 
        pageSize: 10,       
        allowHtml: true,   
        cssClassNames: {
          headerRow: 'table-header', 
          tableRow: 'table-row',     
          hoverTableRow: 'table-hover', 
          oddTableRow: 'odd-row',    
          selectedTableRow: 'table-selected'
        }
      }

     return setting;
}



function filterTable(event) 
{
    searchTerm= event.target.value.toLowerCase();
    const filteredData = new google.visualization.DataTable();
    filteredData.addColumn('string', 'Client Name');
    filteredData.addColumn('string', 'Email');
    filteredData.addColumn('string', 'Phone');
    filteredData.addColumn({ type: 'string', label: 'Status', p: { html: true } });
    filteredData.addColumn('string', 'Client Type');
    
    var data=getData();
    for (var i = 0; i < data.getNumberOfRows(); i++) 
    {
        const name = data.getValue(i, 0).toLowerCase();
        const email = data.getValue(i, 1).toLowerCase();
        const phone = data.getValue(i, 2).toLowerCase();
        
        
        if (name.includes(searchTerm) || email.includes(searchTerm) || phone.includes(searchTerm)) {
            filteredData.addRow([data.getValue(i, 0), data.getValue(i, 1),
                 data.getValue(i, 2),   data.getValue(i, 3),data.getValue(i, 4)]);
        }
    }

    var table =getTableObj();
    table.draw(filteredData,getTableSettings());
}

function showAddContent()
{
    var addClient= document.getElementById("clientDiv");
    addClient.style.display="block";
    openTab('manual');

    content.classList.add("blur");
    tabs.classList.add("blur");
    collapseIcon.classList.add("blur");
}

function openTab(tabName) 
 {
        var i, tabcontent, tabbuttons;
        
        tabcontent = document.getElementsByClassName("tab-content1");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        
        tabbuttons = document.getElementsByClassName("tab-btn1");

        for (i = 0; i < tabbuttons.length; i++) {
            tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
        }
        
        var currentActive=document.getElementById(tabName);
        currentActive .style.display = "block";
        

        // add selectd to buttons

       var manualBtn= document.getElementById("manualBtn");
       var uploadBtn= document.getElementById("uploadBtn"); 

       if(tabName!="manual")
       {
          uploadBtn.classList.remove("active");
          manualBtn.classList.add("active");
       }
       else
       {
        uploadBtn.classList.add("active");
        manualBtn.classList.remove("active");
       }
    }
    
    

    function  openFileSystem()
    {
        document.getElementById('fileInput').click();

        // show name on label
        fileInput.addEventListener('change', function() {
            const fileLabel = document.querySelector('.fileSelectedLabel');
            if (fileInput.files.length > 0) {
                fileLabel.textContent = `${fileInput.files[0].name}`;
            } else {
                fileLabel.textContent = 'No file selected.';
            }
        });
    }

    function clearAddClient()
    {
        document.getElementById('clientname').value = '';
    document.getElementById('clientemail').value = '';
    document.getElementById('clientphone').value = '';

        const fileInput = document.getElementById('fileInput');
        fileInput.value = '';

        document.getElementById("fileSelectedLabel").innerText="";  

     document.getElementById("clientDiv").style.display='none';
     content.classList.remove("blur");
     tabs.classList.remove("blur");
     collapseIcon.classList.remove("blur");
    }


    function loadDashboard()
    {
        clearAddClient();
        displayEmailTab();
    }
