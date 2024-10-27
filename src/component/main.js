function login(type) 
{
  window.location.href = `${urlPrefixAuthetication}/oauth2/authorization/${type}`;
}
function handleOAuthCallback() 
{
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  if (token) {
    localStorage.setItem('zaptoken', token);
    window.location.href ="/src/html/dashboard.html";

  } 
}

window.addEventListener('load', handleOAuthCallback);


async function dbLogin(event)
{
    console.log("db login called...")
      event.preventDefault(); 
      const username = event.target.username.value;
      const password = event.target.password.value;

      startLoader(); 
            const loginData = {
              username: username,
              password: password
            };

       const data = await zapAPICaller("post",urlPrefixAuthetication+"/login",loginData,2000);
       stopLoader();
       if(data.status=='success')
        {
           localStorage.setItem('zaptoken',data.token);
          window.location.href ="http://localhost:5173/src/html/dashboard.html";
         
        }
        else  showToastMsg("Failed", data.msg, "failure");
             

}



function changeHeaderOnScroll() {
  const priTitle = document.querySelector('.priTitle');
  const header = document.querySelector('.header');

 
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        
        header.style.backgroundColor = '#723aff';  // Example CSS change
        header.style.boxShadow = '0 4px 2px -2px gray';  // Example change
      } else {
        
        header.style.backgroundColor = '#edf0f7';  // Reset CSS
        header.style.boxShadow = 'none';  // Reset CSS
      }
    });
  });

  
  observer.observe(priTitle);
}

// Call the function on page load
window.onload = changeHeaderOnScroll1;



async function validateUserName()
{
  let usernameText=document.getElementById("username");
    console.log("validation called....")
    let checkUsername=usernameText.value;
    let validClass=document.getElementById("validClass");
    let invalidClass=document.getElementById("invalidClass");
    if(checkUsername.length>=4)
    {
     
      const data = await zapAPICaller("get",urlPrefixServices+"/registration/validate_username/"+checkUsername,null,0);
        if(data.validate=="")
        {
          validClass.style.display="inline";
          invalidClass.style.display="none";
        }
        else 
        {
          validClass.style.display="none";
          invalidClass.style.display="inline";
          invalidClass.innerHTML=data.validate==undefined?"Invalid Username":data.validate;

        }
        
    }
    else
    {
      validClass.style.display="none";
      invalidClass.style.display="none";
    }

}

async function checkPassword()
{
    let passwordEle= document.getElementById("password");
    let password=passwordEle.value;

    let passwordMsg=document.getElementById("passwordMsg");

    if(password.length>=4)
      {
         const data = await zapAPICaller("get",urlPrefixServices+"/registration/validate_password_strength/"+password,null,0);
        
          if(data.validate && data.validate.includes("Strong"))
          {
              passwordMsg.innerHTML= `<span class="strongPass">`+data.validate+`</span>`
          }
          else
          {
            passwordMsg.innerHTML= `<span class="weakPass">`+data.validate+`</span>`
          }
      }
      else
      {
            passwordMsg.innerHTML= `<span class="weakPass">Weak Password</span>`
      }

}

function comparePassword()
{
  let passwordEle= document.getElementById("password");
  let password=passwordEle.value;

  let confirmPasswordEle= document.getElementById("confirm-password");
  let confirmPassword=confirmPasswordEle.value;

  let confirmPasswordMsg=document.getElementById("confirmPassMsg");

  if(password!="" && password!=" ")
    {
      if(password==confirmPassword)
        {
          confirmPasswordMsg.innerHTML=`<span class="strongPass">Password Matched</span>`
        }
        else
        {
          confirmPasswordMsg.innerHTML=`<span class="weakPass">Password Missmatched</span>`
        }
    }
    else
    {
      confirmPasswordMsg.innerHTML=`<span class="weakPass"> First add Password </span>`
    }
  


}

async function submitRegistration(event)
{
       event.preventDefault(); 
       startLoader();

    const form = document.getElementById("registerForm");
    const formData = new FormData(form);
    const jsonData = {};

    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

       const data = await zapAPICaller("post",urlPrefixServices+"/registration/register",jsonData,3000);
        
       stopLoader();
          if(data.output && data.output=="Sucessfully Registered")
          {

                // TODO: save in local storage to display after login page load
                setTimeout(() => {
                showToastMsg("Sucessfully registered","","success");
              }, 2000);

            window.location.href="/src/html/login.html";
          }
          else
          {
            showToastMsg("Failed ",data.output,"failed");
          }

}

