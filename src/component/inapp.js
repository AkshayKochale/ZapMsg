

function inappOpenTab(tabName) 
{
    var i, tabContent, tabs;

    // Hide all tab content
    tabContent = document.getElementsByClassName("inapp-tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // Remove active class from all tabs
    tabs = document.getElementsByClassName("inapp-tab");
    for (i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("inapp-active");
    }

    // Show the selected tab content and set active class
    document.getElementById(tabName).style.display = "block";
    document.querySelector(`[onclick="inappOpenTab('${tabName}')"]`).classList.add("inapp-active");
}

function openLanguageTab(tabName) {
    var i, tabContent, tabs;

    // Hide all language tab content
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // Remove active class from all language tabs
    tabs = document.getElementsByClassName("language-tab");
    for (i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }

    document.getElementById(tabName).style.display = "block";
    document.querySelector(`[onclick="openLanguageTab('${tabName}')"]`).classList.add("active");
    printCode(tabName);
}

function showInappTab() 
{
    changeMainTab("inappcontent");
    
    let selectBox=createDropDown(["goku","akshay","vegeta","goku","akshay","vegeta","goku","akshay","vegeta"],"inappSelectBox")
      
    hljs.highlightAll();
    let contentDiv=document.getElementById("inappcontent");
    contentDiv.innerHTML = `
        <div class="inapp-tab-container">
            <div class="inapp-tabs">
                <div class="title-inapp">In-App Message</div>
                <button class="inapp-tab inapp-active" onclick="inappOpenTab('inapp-notify')">Notify</button>
                <button class="inapp-tab" onclick="inappOpenTab('inapp-configure')">API</button>
            </div>

            <div id="inapp-notify" class="inapp-tab-content">
               <div class="notification-form">
                `+selectBox+`
                <input type="text"  placeholder="Enter notification title" />
                <textarea  class="bigText" placeholder="Enter notification message" ></textarea>
                <button class="sendNotificationBtn"> Send </button>
            </div>
            </div>

            <div id="inapp-configure" class="inapp-tab-content" style="display: none;">
                <div class="language-tabs-container">
                    <div class="language-tabs">
                        <button class="copyBtn" id='copyBtn' onclick="copyCode()">Copy</button>
                        <button class="language-tab active" onclick="openLanguageTab('kotlin')">Kotlin</button>
                        <button class="language-tab" onclick="openLanguageTab('java')">Java</button>
                        <button class="language-tab" onclick="openLanguageTab('dart')">Dart</button>
                        <button class="language-tab" onclick="openLanguageTab('swift')">Swift</button>
                        <button class="language-tab" onclick="openLanguageTab('js')">JavaScript</button>
                        <button class="language-tab" onclick="openLanguageTab('api')">API</button>
                    </div>

                    <div id="kotlin" class="tab-content" style="display:none;">
                    </div>
                    <div id="java" class="tab-content" style="display:none;">
                       
                    </div>
                    <div id="dart" class="tab-content" style="display:none;">
                        
                    </div>
                    <div id="swift" class="tab-content" style="display:none;">
                       
                    </div>
                    <div id="js" class="tab-content" style="display:none;">
                       
                    </div>
                    <div id="api" class="tab-content" style="display:none;">
                       
                    </div>
                </div>
            </div>
        </div>
    `;
    inappOpenTab("inapp-notify");
    openLanguageTab('kotlin')
    
    MultiselectDropdown(window.MultiselectDropdownOptions);
}

function printCode(lang) 
{
    if(lang==undefined || lang==null)lang="kotlin";
    let div = document.getElementById(lang);
    div.innerHTML = getCodeForEachLanguage(lang);

    hljs.highlightElement(div.querySelector('code'));
}

function getCodeForEachLanguage(lang) {
    let code = "";
    if (true) {
        code = `<pre class="code-block"><code class="language-`+lang+`">
            class Animal(val name: String, val age: Int) {
                fun speak() {
                    println("$name is speaking.")
                }
            }

            fun printNumbers() {
                for (i in 1..5) {
                    println("Number: $i")
                }
            }

            fun getGreeting(name: String): String {
                return "Hello, $name!"
            }

            fun main() {
                val dog = Animal("Rex", 5)
                dog.speak()
                val greeting = getGreeting("Alice")
                println(greeting)
                printNumbers()
                val colors = listOf("Red", "Blue", "Green")
                for (color in colors) {
                    println("Color: $color")
                }

                var count = 0
                val numbers = (1..10).toList()
                val evenNumbers = numbers.filter { it % 2 == 0 }
                println("Even numbers: $evenNumbers")
            }
        </code></pre>`;
    }

    return code;
}


function copyCode()
{
    let tabs = document.getElementsByClassName("language-tab");
    let currentActiveTabName='';
    for (i = 0; i < tabs.length; i++) 
    {
        if(tabs[i].classList.contains("active"))
            currentActiveTabName=tabs[i].textContent;
    }    
    if(currentActiveTabName=='JavaScript')currentActiveTabName="js"

    let activeTab=document.getElementById(currentActiveTabName.toLowerCase());

    navigator.clipboard.writeText(activeTab.innerText);
        
    let copyBtn=document.getElementById("copyBtn") ;
    copyBtn.innerText='Copied!'

    setTimeout(()=>
        {
            copyBtn.innerText='Copy'
        },2000);
}