

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

    if(tabName=="inapp-notify")
    {
        document.getElementById(tabName).classList.add("inappflex");
    }
    else
       document.getElementById("inapp-notify").classList.remove("inappflex");


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

async  function showInappTab() 
{
    startLoader()
    changeMainTab("inappcontent");
    let inputData={
            token :gettokenfromlocalStorage()    
    };

    const apiData =await zapAPICaller("post",urlPrefixServices+"/inapp/getallactiveusers",inputData,0);

    if(apiData.status=="failed")
    {
        stopLoader();
        showToastMsg("Failed", apiData.output, "Failed");
        return ;
    }

    let selectBox=createDropDown(apiData.output,"inappSelectBox")
      
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
                <input type="text" id="notificationtitle" placeholder="Enter notification title" />
                <textarea  class="bigText" id="notificationMsg"  placeholder="Enter notification message" ></textarea>
                <button class="sendNotificationBtn" onClick="sendNotification()"> Send </button>
            </div>
                    <div class="description-box">
                    <div class="dowloadApp">
                        <div class="downladappmsg">Click here to download demo app</div>
                        <button class="appDownloadBtn">Download</button>
                     </div>
                     <br>
                    <div class="info-app">
                        <div class="info-main">Username : <span class="info-sec">{ClientName}</span></div>
                        <div class="info-main">Password : <span class="info-sec">12345</span></div>
                        </div>
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
                   
                </div>
            </div>
        </div>
    `;
    inappOpenTab("inapp-notify");
    openLanguageTab('kotlin')
    
    MultiselectDropdown(window.MultiselectDropdownOptions);
    stopLoader();
}

 async function sendNotification()
{
    startLoader(); 
   let ListOfSelectedClient= getSelectedValues("inappSelectBox");
   let notificationtitle=document.getElementById("notificationtitle");
   let notificationMsg=document.getElementById("notificationMsg");

    if(notificationtitle.value.length>20)
    {
        stopLoader();
        showToastMsg("Cannot send notification", "Title size should be less than 20", "Failed");
        return ;
    }
    if(notificationMsg.value.length>50)
    {
        stopLoader();
        showToastMsg("Cannot send notification","Message size should be less than 50", "Failed");
        return ;
    }

   let inputData={
      token:gettokenfromlocalStorage(),
      clients :ListOfSelectedClient,
      notificationtitle:notificationtitle.value,
      notificationmsg:notificationMsg.value
   }

   const data = await zapAPICaller("post",urlPrefixServices+"/inapp/sendnotification",inputData,2000);

   
   if(data)
   {
        showToastMsg(data.status, data.output, data.status)
   }
   stopLoader();
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
    
    if (lang === 'kotlin') {
        code = `<pre class="code-block">
        <code class="language-` + lang + `">
            // dependencies -> implementation "com.squareup.okhttp3:okhttp:4.9.3"

            import okhttp3.*
            import java.util.concurrent.TimeUnit

            class WebSocketManager(private val userId: String) {
                private val client = OkHttpClient.Builder()
                    .pingInterval(30, TimeUnit.SECONDS)
                    .build()

                private lateinit var webSocket: WebSocket

                fun initWebSocket() {
                    val request = Request.Builder()
                        .url("ws://${urlPrefixNotification}/notifications?clientname=$clientname")
                        .build()

                    webSocket = client.newWebSocket(request, object : WebSocketListener() {
                        override fun onOpen(webSocket: WebSocket, response: Response) {
                            println("WebSocket connection opened")
                            webSocket.send("Hello, server!") // Send a message to the server
                        }

                        override fun onMessage(webSocket: WebSocket, text: String) {
                            try {
                                val data = JSONObject(text)
                                val msgTitle = data.getString("msgtitle")
                                val msgContent = data.getString("msgcontent")
                                showNotification(msgTitle, msgContent)
                                println("This is from onmsg: $msgTitle : $msgContent")
                            } catch (e: JSONException) {
                                println("Error parsing WebSocket message: \${e.message}")
                            }
                        }

                        override fun onFailure(webSocket: WebSocket, t: Throwable, response: Response?) {
                            println("WebSocket error: \${t.message}")
                        }

                        override fun onClosed(webSocket: WebSocket, code: Int, reason: String) {
                            println("WebSocket closed: Code: $code, Reason: $reason")
                        }
                    })
                    client.dispatcher.executorService.shutdown()
                }

                private fun showNotification(title: String, content: String) {
                    // Implementation for showing notification in Android
                    println("Notification - Title: $title, Content: $content")
                }
            }
        </code></pre>`;
    } else if (lang === 'java') {
        code = `<pre class="code-block">
                <code class="language-` + lang + `">
                   //dependencies-> implementation "com.squareup.okhttp3:okhttp:4.9.3" 

                import okhttp3.*;
                import org.json.JSONException;
                import org.json.JSONObject;
                import java.util.concurrent.TimeUnit;

                public class WebSocketManager {
                    private final OkHttpClient client;
                    private WebSocket webSocket;
                    private final String userId;

                    public WebSocketManager(String userId) {
                        this.userId = userId;
                        this.client = new OkHttpClient.Builder()
                                .pingInterval(30, TimeUnit.SECONDS)
                                .build();
                    }

                    public void initWebSocket() {
                        Request request = new Request.Builder()
                                .url("ws://${urlPrefixNotification}/notifications?clientname=" + clientname)
                                .build();

                        webSocket = client.newWebSocket(request, new WebSocketListener() {
                            @Override
                            public void onOpen(WebSocket webSocket, Response response) {
                                System.out.println("WebSocket connection opened");
                                webSocket.send("Hello, server!"); // Send a message to the server
                            }

                            @Override
                            public void onMessage(WebSocket webSocket, String text) {
                                try {
                                    JSONObject data = new JSONObject(text);
                                    String msgTitle = data.getString("msgtitle");
                                    String msgContent = data.getString("msgcontent");
                                    showNotification(msgTitle, msgContent);
                                    System.out.println("This is from onmsg: " + msgTitle + " : " + msgContent);
                                } catch (JSONException e) {
                                    System.err.println("Error parsing WebSocket message: " + e.getMessage());
                                }
                            }

                            @Override
                            public void onFailure(WebSocket webSocket, Throwable t, Response response) {
                                System.err.println("WebSocket error: " + t.getMessage());
                            }

                            @Override
                            public void onClosed(WebSocket webSocket, int code, String reason) {
                                System.out.println("WebSocket closed: Code: " + code + ", Reason: " + reason);
                            }
                        });

                        client.dispatcher().executorService().shutdown();
                    }

                    private void showNotification(String title, String content) {
                        System.out.println("Notification - Title: " + title + ", Content: " + content);
                    }
                }
         </code></pre>`;
    } else if (lang === 'dart') {
        code = `<pre class="code-block">
        <code class="language-` + lang + `">
            // Add this dependency in your pubspec.yaml
            // dependencies: 
            //   websocket: ^2.0.0

            import 'package:websocket/websocket.dart';
            import 'dart:convert';

            class WebSocketManager {
                final String userId;
                late WebSocket _webSocket;

                WebSocketManager(this.userId);

                void initWebSocket() async {
                    _webSocket = await WebSocket.
                            connect('ws://${urlPrefixNotification}/notifications?clientname=$clientname');

                    _webSocket.listen((data) {
                        try {
                            final jsonData = jsonDecode(data);
                            final msgTitle = jsonData['msgtitle'];
                            final msgContent = jsonData['msgcontent'];
                            showNotification(msgTitle, msgContent);
                            print("This is from onmsg: $msgTitle : $msgContent");
                        } catch (e) {
                            print("Error parsing WebSocket message: $e");
                        }
                    });
                    print("WebSocket connection opened");
                    _webSocket.add("Hello, server!"); // Send a message to the server
                }

                void showNotification(String title, String content) {
                    print("Notification - Title: $title, Content: $content");
                }
            }
        </code></pre>`;
    } else if (lang === 'swift') {
        code = `<pre class="code-block">
        <code class="language-` + lang + `">
            // Import the Starscream library in your Podfile
            // pod 'Starscream', '~> 4.0'

            import Foundation
            import Starscream

            class WebSocketManager: WebSocketDelegate {
                var socket: WebSocket!
                let userId: String

                init(userId: String) {
                    self.userId = userId
                }

                func initWebSocket() {
                    var request = URLRequest(url: URL(string: "ws://${urlPrefixNotification}/notifications?clientname=\(clientname)")!)
                    request.timeoutInterval = 5
                    socket = WebSocket(request: request)
                    socket.delegate = self
                    socket.connect()
                }

                func websocketDidConnect(socket: WebSocketClient) {
                    print("WebSocket connection opened")
                    socket.write(string: "Hello, server!") // Send a message to the server
                }

                func websocketDidDisconnect(socket: WebSocketClient, error: Error?) {
                    print("WebSocket disconnected: \(error?.localizedDescription ?? "No error")")
                }

                func websocketDidReceiveMessage(socket: WebSocketClient, text: String) {
                    do {
                        if let data = text.data(using: .utf8) {
                            let jsonData = try JSONSerialization.jsonObject(with: data, options: [])
                            if let jsonDict = jsonData as? [String: Any],
                               let msgTitle = jsonDict["msgtitle"] as? String,
                               let msgContent = jsonDict["msgcontent"] as? String {
                                showNotification(title: msgTitle, content: msgContent)
                                print("This is from onmsg: \(msgTitle) : \(msgContent)")
                            }
                        }
                    } catch {
                        print("Error parsing WebSocket message: \(error)")
                    }
                }

                private func showNotification(title: String, content: String) {
                    print("Notification - Title: \(title), Content: \(content)")
                }
            }
        </code></pre>`;
    } else if (lang === 'js') {
        code = `<pre class="code-block">
        <code class="language-` + lang + `">
            function initWebSocket(userId) {
                const ws = new WebSocket('ws://${urlPrefixNotification}/notifications?clientname=' + clientname);

                ws.onopen = () => {
                    console.log('WebSocket connection opened');
                    ws.send('Hello, server!'); // Send a message to the server
                };

                ws.onmessage = (e) => {
                    try {
                        const data = JSON.parse(e.data);
                        const msgTitle = data.msgtitle;
                        const msgContent = data.msgcontent;
                        showNotification(msgTitle, msgContent);
                        console.log('This is from onmsg: ' + msgTitle + ' : ' + msgContent);
                    } catch (error) {
                        console.error('Error parsing WebSocket message', error);
                    }
                };

                ws.onerror = (e) => {
                    console.error('WebSocket error:', e.message);
                };

                ws.onclose = (e) => {
                    console.log('WebSocket closed:', e.code, e.reason);
                };
            }

            function showNotification(title, content) {
                console.log('Notification - Title: ' + title + ', Content: ' + content);
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