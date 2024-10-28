google.charts.load('current', { packages: ['table'] });


document.addEventListener("DOMContentLoaded",async function() {
    
   let zaptoken= gettokenfromlocalStorage();
    startLoader();

    if (zaptoken) 
    {
        let inputData={
                "token":zaptoken
        }

        const data =await zapAPICaller("post",urlPrefixServices+"/dashboard/data",inputData,0);

        let msgElement= document.getElementById("welcomeMsg");
         msgElement.textContent = ` Welcome back, ${data.username}!`;


         stopLoader();
        
    } else 
    {
        stopLoader();    
        window.location.href="/src/html/login.html";
    }


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


function changeMainTab(tabname)
{
    console.log("change main tab"+tabname);
    let content =document.getElementById("content");
    let clientcontent =document.getElementById("clientcontent");
    let inappcontent=document.getElementById("inappcontent");
    let emailcontent=document.getElementById("emailcontent");
    let whatappContent=document.getElementById("whatsappcontent");
    let historyContent=document.getElementById("historycontent");
    let settingscontent=document.getElementById("settingscontent");

    content.style.display="none";
    inappcontent.style.display="none";
    emailcontent.style.display="none";
    whatappContent.style.display="none";
    historyContent.style.display="none";
    settingscontent.style.display="none";
    clientcontent.style.display="none";

    document.getElementById(tabname).style.display="flex";
}


 function logout()
{
    localStorage.clear();
    window.location.href ="/";
}