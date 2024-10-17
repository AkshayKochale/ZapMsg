google.charts.load('current', { packages: ['table'] });


document.addEventListener("DOMContentLoaded", function() {
    const username = localStorage.getItem('username'); // Assuming username is stored in localStorage
    const userElement = document.getElementById('username');

    if (username) {
        userElement.textContent = `Welcome, ${username}`;
    } else {
        userElement.textContent = 'Welcome, Guest';
    }

    document.getElementById('logout').addEventListener('click', function() {
        localStorage.removeItem('jwt'); // Removing JWT from storage
        window.location.href = '/login'; // Redirecting to login page
    });
});


function changeContent(tabName) 
{
    const contentDiv = document.getElementById('content');

    if(tabName=='none')
    {
        contentDiv.innerHTML='';
    }
    else if(tabName=='Clients')
    {
        displayEmailTab();
    }
    else 
    {
        contentDiv.innerHTML = `You clicked on: ${tabName}`;
    }
}

let prevCondition=1;

function minimize()
{
    var buttons =document.getElementsByClassName("changeOnCollapse");
    console.log("mini clicked !!")


    // remove text from all buttons
    for(var i=0;i<buttons.length;i++)
    {
        var btn =buttons[i];
        if(prevCondition==1)
            btn.classList.add("isTextVisible");
        else
            btn.classList.remove("isTextVisible");

    }

    // reduce size of tabs
        var tabs=document.getElementById("tabs");
        var collapseIcon=document.getElementById("collapseIcon");

        if(prevCondition==1)     
        {    tabs.style.width="5%"
            collapseIcon.style.left="5%"    
            collapseIcon.style.transform="rotate(180deg)";
        }
        else
        {
            tabs.style.width="20%";
            collapseIcon.style.left="19.5%"
            collapseIcon.style.transform="none";
        }


    
    prevCondition=prevCondition==1?0:1;
}

let content =document.getElementById("content");
let tabs =document.getElementById("tabs");
let collapseIcon =document.getElementById("collapseIcon");



const rowsPerPage = 10; 
let currentPage = 10;


function getData()
{
    var data = new google.visualization.DataTable();
        
    data.addColumn('string', 'Client Name');
    data.addColumn('string', 'Email');
    data.addColumn('string', 'Phone');
    data.addColumn('boolean', 'Is Active');
    data.addColumn('string', 'Client Type');

    data.addRows([
        ['Akshay Kochale', 'akshaykochale78@gmail.com', '<a href="#">1291929129129</a>', true, 'Bot'],
        ['Ramon Dino', 'ramonDino@gmail.com', '1234467890', false, 'Bot'],
        ['Suzi lexus', 'suzi@yahoo.com', '1234467890', true, 'Real'],
        ['Akshay Kochale', 'akshaykochale78@gmail.com', '1291929129129', true, 'Bot'],
        ['Ramon Dino', 'ramonDino@gmail.com', '1234467890', false, 'Bot'],
        ['Suzi lexus', 'suzi@yahoo.com', '1234467890', true, 'Real'],
        ['Akshay Kochale', 'akshaykochale78@gmail.com', '1291929129129', true, 'Bot'],
        ['Ramon Dino', 'ramonDino@gmail.com', '1234467890', false, 'Bot'],
        ['Suzi lexus', 'suzi@yahoo.com', '1234467890', true, 'Real'],
        ['Akshay Kochale', 'akshaykochale78@gmail.com', '1291929129129', true, 'Bot'],
        ['Ramon Dino', 'ramonDino@gmail.com', '1234467890', false, 'Bot'],
        ['Suzi lexus', 'suzi@yahoo.com', '1234467890', true, 'Real'],
        ['Akshay Kochale', 'akshaykochale78@gmail.com', '1291929129129', true, 'Bot'],
        ['Ramon Dino', 'ramonDino@gmail.com', '1234467890', false, 'Bot'],
        ['Suzi lexus', 'suzi@yahoo.com', '1234467890', true, 'Real'],
        ['Akshay Kochale', 'akshaykochale78@gmail.com', '1291929129129', true, 'Bot'],
        ['Ramon Dino', 'ramonDino@gmail.com', '1234467890', false, 'Bot'],
        ['Suzi lexus', 'suzi@yahoo.com', '1234467890', true, 'Real'],
        ['Akshay Kochale', 'akshaykochale78@gmail.com', '1291929129129', true, 'Bot'],
        ['Ramon Dino', 'ramonDino@gmail.com', '1234467890', false, 'Bot'],
        ['Suzi lexus', 'suzi@yahoo.com', '1234467890', true, 'Real']
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

function  displayEmailTab()
{
    content.innerHTML=`<div class="searchDiv"><input class="searchText" type="text" placeholder="search"
                        oninput="filterTable(event)"/>
                   <Button class="addBtn" title="Add Client" onclick="showAddContent(event)"> +  </Button></div><div id="table_div"></div>` ;

    let emailcontent = document.getElementById('emailcontent');
    emailcontent.style.display="none";
                   
    var temp=
        [
            { "clientname":"Akshay Kochale","clientemail":"akshaykochale78@gmail.com","clientphone":"1291929129129","isactive":"true","clienttype":"Bot"},
            { "clientname":"Ramon Dino","clientemail":"ramonDino@gmail.com","clientphone":"1234467890","isactive":"false","clienttype":"Bot"},
            { "clientname":"Suzi lexus","clientemail":"suzi@yahoo.com","clientphone":"1234467890","isactive":"true","clienttype":"Real"}
        ];

      
          var data=getData(); 
          var table = getTableObj();

          table.draw(data, getTableSettings());

}

function filterTable(event) 
{
    searchTerm= event.target.value.toLowerCase();
    const filteredData = new google.visualization.DataTable();
    filteredData.addColumn('string', 'Client Name');
    filteredData.addColumn('string', 'Email');
    filteredData.addColumn('string', 'Phone');
    filteredData.addColumn('boolean', 'Is Active');
    filteredData.addColumn('string', 'Client Type');
    
    var data=getData();
    for (var i = 0; i < data.getNumberOfRows(); i++) 
    {
        const name = data.getValue(i, 0).toLowerCase();
        const email = data.getValue(i, 1).toLowerCase();
        const phone = data.getValue(i, 2).toLowerCase();
        
        
        if (name.includes(searchTerm) || email.includes(searchTerm) || phone.includes(searchTerm)) {
            filteredData.addRow([data.getValue(i, 0), data.getValue(i, 1),
                 data.getValue(i, 2),data.getValue(i, 3),data.getValue(i, 4)]);
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