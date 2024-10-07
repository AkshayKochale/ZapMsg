function loadHeader() {
  const headerPlaceholder = document.getElementById('header-placeholder');
  
  
      headerPlaceholder.innerHTML =  `
              <div class="header">
                <div class="title-logo">
                  <img  class="zap-logo" src="../assets/icons8-thunder-96.png" alt=""/>
                  ZapMsg
                  </div>
                  <button class="btn logout-btn" id="logout">Logout</button>
              </div>
              `; 
  
}

window.onload = loadHeader;