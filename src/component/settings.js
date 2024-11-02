async  function showSettingsTab()
{
    startLoader()
    changeMainTab("settingscontent");

    let inputData={
        token :gettokenfromlocalStorage()    
        };

    const apiData =await zapAPICaller("post",urlPrefixServices+"/userservice/getuserdata",inputData,0);

       if(apiData==null || apiData=='' || apiData==undefined || apiData.status=="failed") 
       {
        stopLoader();
        showToastMsg("Failed", apiData.output, "Failed");
        return ;
       }

    let settingscontent= document.getElementById("settingscontent");
     settingscontent.innerHTML=`
           
            <div class="setting-container">
             <span class="title-setting">Settings</span>
             <div id="submitted-data" class="submitted-data hidden">
                <p><strong>First Name:</strong> <span id="display-firstname">${apiData.firstname}</span></p>
                <p><strong>Last Name:</strong> <span id="display-lastname">${apiData.lastname}</span></p>
                <p><strong>Username:</strong> <span id="display-username">${apiData.username}</span></p>
                <p><strong>Email:</strong> <span id="display-email">${apiData.email}</span></p>
                <p><strong>Contact Number:</strong> <span id="display-phone">${apiData.phoneno}</span></p>
                <p><strong>Total Clients:</strong> ${apiData.clientcount}</p>
                <p><strong>Notification Credit:</strong> ${apiData.notificationsent}/${apiData.notificationsent>10?"unlimited":"10"}</p>
                <p><strong>Email Credit:</strong>${apiData.emailsent}/${apiData.emailsent>10?"unlimited":"10"}</p>
                <p><strong>Create Token</strong><button class="supportBtn" onclick="createToken()">Create</button> </p>
                <p><strong>Previous Token</strong> <label id="currentToken"> XXXX-XXXX-XXXX-XXXX</label>
                     <button class="showHideBtn"
                        style="display: ${apiData.accountToken!=null?"inline":"none"} "
                        onclick="tokenShowHide('${apiData.accountToken}')"><img src="../assets/eye.svg"/></button>   
                     <button class="supportBtn" 
                        style="display: ${apiData.accountToken!=null?"inline":"none"} "
                     id="copyBtnSetting" onclick="copyToken('${apiData.accountToken}')">copy</button></p>
                <button class="editBtn" onclick="gotToEdit()">Edit</button > </p>   
            </div>
            </div>`
     ;

     stopLoader();
}

function copyToken(token)
{
    navigator.clipboard.writeText(token);
    let copyBtn=document.getElementById("copyBtnSetting") ;
    copyBtn.innerText='Copied!'

    setTimeout(()=>
        {
            copyBtn.innerText='Copy'
        },2000);
}

let flag=false;

function tokenShowHide(token)
{
    let tokenelement = document.getElementById("currentToken"); 
    if(flag)
        tokenelement.innerText=token;
    else
        tokenelement.innerText=" XXXX-XXXX-XXXX-XXXX";

      flag=!flag;  
}

async function createToken()
{
    
    let inputData={
        token :gettokenfromlocalStorage()    
        };

    const apiData =await zapAPICaller("post",urlPrefixServices+"/userservice/createusertoken",inputData,0);

       
        showToastMsg(apiData.status, apiData.output, apiData.status);
       
       showSettingsTab();  

}

function gotToEdit()
{
    window.location.href="/src/html/edit.html";
}