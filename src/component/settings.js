function showSettingsTab()
{
    changeMainTab("settingscontent");

    let settingscontent= document.getElementById("settingscontent");
     settingscontent.innerHTML=`
            <div class="setting-container">
             <div id="submitted-data" class="submitted-data hidden">
    <h3>Settings</h3>
    <p><strong>First Name:</strong> <span id="display-firstname"></span></p>
    <p><strong>Last Name:</strong> <span id="display-lastname"></span></p>
    <p><strong>Username:</strong> <span id="display-username"></span></p>
    <p><strong>Email:</strong> <span id="display-email"></span></p>
    <p><strong>Country:</strong> <span id="display-country"></span></p>
    <p><strong>Contact Number:</strong> <span id="display-phone"></span></p>
    <p><strong>Remaining/Total Credit:</strong> 100/500</p>
    <p><strong>Create Token</strong><button>Create</button> </p>
    <p><strong>Previous Token</strong> <label> 670e4348-6fb8-8013-934b-a832cc6e3a81</label> <button>copy</button></p>
     <button>Edit</button> </p>   
    </div>
     </div>`
     ;
}