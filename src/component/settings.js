function showSettingsTab()
{
    changeMainTab("settingscontent");

    let settingscontent= document.getElementById("settingscontent");
     settingscontent.innerHTML=`
           
            <div class="setting-container">
             <span class="title-setting">Settings</span>
             <div id="submitted-data" class="submitted-data hidden">
                <p><strong>First Name:</strong> <span id="display-firstname">akshay</span></p>
                <p><strong>Last Name:</strong> <span id="display-lastname">kochale</span></p>
                <p><strong>Username:</strong> <span id="display-username">Goku@7878</span></p>
                <p><strong>Email:</strong> <span id="display-email">akshaykochale78@gmail.com</span></p>
                <p><strong>Contact Number:</strong> <span id="display-phone">8652571211</span></p>
                <p><strong>Total Clients:</strong> 21</p>
                <p><strong>Notification Credit:</strong> 100/500</p>
                <p><strong>Email Credit:</strong> 100/500</p>
                <p><strong>Create Token</strong><button class="supportBtn" onclick="createToke()">Create</button> </p>
                <p><strong>Previous Token</strong> <label id="currentToken"> 670e4348-6fb8-8013-934b-a832cc6e3a81</label>
                     <button class="showHideBtn" onclick="tokenShowHide()"><img src="../assets/eye.svg"/></button>   
                     <button class="supportBtn" id="copyBtnSetting" onclick="copyToken()">copy</button></p>
                <button class="editBtn">Edit</button > </p>   
            </div>
            </div>`
     ;
}

function copyToken()
{
    let tokenelement = document.getElementById("currentToken"); 
    
    navigator.clipboard.writeText(tokenelement.innerText);
        
    let copyBtn=document.getElementById("copyBtnSetting") ;
    copyBtn.innerText='Copied!'

    setTimeout(()=>
        {
            copyBtn.innerText='Copy'
        },2000);
}

function tokenShowHide()
{
    let tokenelement = document.getElementById("currentToken"); 
    tokenelement.innerText="XXXX-XXXX-XXXXXX-XXXXXX-XX-XXXXXX"
}

function createToke()
{

}