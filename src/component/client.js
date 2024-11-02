        function  showClient()
        {
            changeMainTab("clientcontent");
            let content=document.getElementById("clientcontent");
             content.innerHTML=`<div class="searchDiv">
            <div class="title-client">Clients</div>
            <input class="searchText" type="text" placeholder="search"
            oninput="filterTable(event)"/>
            <Button class="addBtn" title="Add Client" onclick="showAddContent(event)" >
            <span class="plus">+</span> Add</Button></div><div id="table_div"></div>` ;

            displayClientDataTable(); 
        }



        const rowsPerPage = 10; 
        let currentPage = 10;
        let cachedData;

        async function displayClientDataTable() 
        {
            startLoader();
            let zaptoken = gettokenfromlocalStorage();
            let inputData = {
                "token": zaptoken
            };
        
            
            const apiData = await zapAPICaller("post", urlPrefixServices + "/clientService/getallclient", inputData, 500);
            
            if (!Array.isArray(apiData)) {
                console.error("Error: apiData is not in the expected format.");
                return new google.visualization.DataTable();
            }
        
            
            
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Username');
            data.addColumn('string', 'Email');
            data.addColumn('string', 'Phone');
            data.addColumn({ type: 'string', label: 'Status', p: { html: true } });
            data.addColumn('string', 'Client Type');
        
            
            apiData.forEach(client => {
                let status = client.isactive 
                    ? '<button class="status-active" onclick="changeStatus('+client.zapclientid+')">Active</button>'
                    : '<button class="status-inactive" onclick="changeStatus('+client.zapclientid+')">Inactive</button>';
        
                data.addRow([
                    client.clientname,
                    client.clientemail,
                    client.clientphone,
                    status,
                    client.clienttype
                ]);
            });
        
            
            const table = getTableObj();
            table.draw(data,getTableSettings(apiData.length));
            cachedData=data;
             stopLoader();   
        }
        

        function getTableObj()
        {
            return new google.visualization.Table(document.getElementById('table_div'));
        }

        function getTableSettings(rowCount)
        {

            var tableHeight = rowCount <= 3 ? (rowCount * 100) + 'px' : '100%';
            console.log;("table height :"+tableHeight)

        var setting= {
                showRowNumber: true,
                width: '100%',    
                height: tableHeight,
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

        function filterTable(event) {
            const searchTerm = event.target.value.toLowerCase();
            const filteredData = new google.visualization.DataTable();
        
            filteredData.addColumn('string', 'Client Name');
            filteredData.addColumn('string', 'Email');
            filteredData.addColumn('string', 'Phone');
            filteredData.addColumn({ type: 'string', label: 'Status', p: { html: true } });
            filteredData.addColumn('string', 'Client Type');
        
            let rowsAdded = false;
        
            for (let i = 0; i < cachedData.getNumberOfRows(); i++) {
                const name = cachedData.getValue(i, 0).toLowerCase();
                const email = cachedData.getValue(i, 1).toLowerCase();
                const phone = cachedData.getValue(i, 2).toLowerCase();
        
                if (name.includes(searchTerm) || email.includes(searchTerm) || phone.includes(searchTerm)) {
                    filteredData.addRow([
                        cachedData.getValue(i, 0),
                        cachedData.getValue(i, 1),
                        cachedData.getValue(i, 2),
                        cachedData.getValue(i, 3),
                        cachedData.getValue(i, 4)
                    ]);
                    rowsAdded = true; 
                }
            }
        
            if (!rowsAdded) {
                filteredData.addRow(["", "", "", "", ""]);
            }
        
            const table = getTableObj();
            table.draw(filteredData, getTableSettings(filteredData.getNumberOfRows()));
        }

        const clientcontent=document.getElementById("clientcontent");

        function showAddContent()
        {
            var addClient= document.getElementById("clientDiv");
            addClient.style.display="block";
            openAddClientTab('manual');

            content.classList.add("blur");
            tabs.classList.add("blur");
            collapseIcon.classList.add("blur");
            clientcontent.classList.add("blur");
        }

        function openAddClientTab(tabName) 
        {
               
            var manualTab=document.getElementById("manual");
            var uploadTab=document.getElementById("upload");
            var manualBtn= document.getElementById("addmanualBtn");
            var uploadBtn= document.getElementById("adduploadBtn"); 

            if(tabName=="manual")
            {
                manualBtn.classList.add("addClientTabactive");
                uploadBtn.classList.remove("addClientTabactive");
                manualTab.style.display="block";
                uploadTab.style.display="none";
            }
            else
            {
                uploadBtn.classList.add("addClientTabactive");
                manualBtn.classList.remove("addClientTabactive");
                manualTab.style.display="none";
                uploadTab.style.display="block";
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

            


            function loadDashboard()
            {

                showClient();
                clearAddClientData();
                
            }

            async function addClient ()
            {   

               startLoader(); 
               let inputData= getAddClientFormData();

               const apiData = await zapAPICaller("post", urlPrefixServices + "/clientService/addclient", inputData, 1000);
                
               if(apiData && apiData.status=='success')
               {
                    stopLoader()
                    showToastMsg("Success", apiData.output +" "+inputData.clientname, "success");
                    loadDashboard()
               }
               else
               {
                stopLoader()
                showToastMsg("Failed", apiData.output, "Failed");
               }
            }    


            function getAddClientFormData() {
                const clientData = {
                    token:gettokenfromlocalStorage(),
                    created: new Date(), 
                    clientname: document.getElementById("clientname").value,
                    clientemail: document.getElementById("clientemail").value,
                    clientphone: document.getElementById("clientphone").value,
                    isactive: true, 
                   
                    clienttype: document.querySelector('input[name="clienttype"]:checked') 
                        ? document.querySelector('input[name="clienttype"]:checked').value 
                        : null 
                };
            
                return clientData;
            }
            
            function clearAddClientData() {
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
                    clientcontent.classList.remove("blur");
            }
            

            function downloadExcel() {
                let path = "../assets/demoExcel.xlsx";
                const link = document.createElement('a');
                link.href = path;
                link.download = 'demoExcel.xlsx';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            

            async function acceptExcel() 
            {
              let inputArray= await getJsonFromExcel();
                   
             if(inputArray==null || inputArray==undefined || inputArray.length==0) 
             {
                showToastMsg("Error parsing file.", "Hint : Redownload and upload", "failed");
                return;
             }
            inputArray.shift();
              let inputData=
              {
                    "token":gettokenfromlocalStorage(),
                     "clientpojo":convertJsonArray(inputArray)
              }

              const apiData = await zapAPICaller("post", urlPrefixServices + "/clientService/multiclientadd", inputData, 0);

              if(apiData && apiData.status=='success')
                {
                     stopLoader()
                     showToastMsg("Success", apiData.output, "success");
                     loadDashboard()
                }
                else
                {
                 stopLoader()
                 showToastMsg("Failed", apiData.output, "Failed");
                }
            }
            
            function getJsonFromExcel() {
                const fileInput = document.getElementById('fileInput');
                const file = fileInput.files[0];
            
                if (!file) {
                    showToastMsg("Failed", "No file selected", "failed");
                    return Promise.reject("No file selected");
                }
            
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
            
                    reader.readAsArrayBuffer(file);
            
                    reader.onload = function (event) {
                        try {
                            const data = new Uint8Array(event.target.result);
                            const workbook = XLSX.read(data, { type: 'array' });
                            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                            const jsonArray = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            
                            resolve(jsonArray);
                        } catch (error) {
                            showToastMsg("Error parsing file.", "Hint: Redownload and upload", "failed");
                            reject(error);
                        }
                    };
            
                    reader.onerror = function () {
                        showToastMsg("Error reading file.", "Hint: Try a different file", "failed");
                        reject("File read error");
                    };
                });
            }
            
            function convertJsonArray(jsonArray) {
                return jsonArray.map(item => ({
                    clientname: item[0],
                    clientemail: item[1],
                    clientphone: item[2],
                    isactive: true,
                    clienttype: item[3] === "Bot" || item[3] === "Real" ? item[3] : "Bot" // Default to "Unknown" if not "Bot" or "Real"
                }));
            }
            

            async function changeStatus(clientId)
            {
               startLoader()
                const apiData = await zapAPICaller("get", urlPrefixServices + "/clientService/toggleactive/"+clientId, null,0);
  
                if(apiData && apiData.status=='success')
                  {
                       stopLoader()
                       showToastMsg("Success", apiData.output, "success");
                       sleep(3000)
                       showClient();
                  }
                  else
                  {
                   stopLoader()
                   showToastMsg("Failed", apiData.output, "Failed");
                  }
            }