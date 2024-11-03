async function showEmailtab() {
    startLoader();
    changeMainTab("emailcontent");

    let inputData = {
        token: gettokenfromlocalStorage()
    };

    const apiData = await zapAPICaller("post", urlPrefixServices + "/emailservice/getallactiveusers", inputData, 0);

    if (apiData.status === "failed") {
        stopLoader();
        showToastMsg("Failed", apiData.output, "Failed");
        return;
    }

    let selectBox = createDropDown(apiData.output, "emailSelectBox");

    let emailcontent = document.getElementById('emailcontent');
    emailcontent.style.display = "block";
    emailcontent.innerHTML = `
        <div class="title-mail">Email</div> 
        <div class="mail-container">
            <div class="mail-fields">
                ${selectBox}
                <input type="text" class="mail-input" placeholder="Enter Subject"  id="emailsubject"/>
                <div id="editor-container">
                    <div id="toolbar">
                        <button class="ql-bold"></button>
                        <button class="ql-italic"></button>
                        <button class="ql-underline"></button>
                        <button class="ql-link"></button>
                        <button class="ql-emoji"></button>
                    </div>
                    <div id="editor"></div>
                </div>
                <div class="dropzone-container">
                    <div id="fileDropzone1" class="utilDiv">
                        <div id="fileSelectBox" class="filemsg">Select file</div>
                        <input type="file" id="fileInput" style="display: none;" accept="image/*,application/pdf" />
                        <ul id="fileList" class="file-list"></ul>
                    </div>
                    <div class="preview-div utilDiv" id="preview-div">Email Preview</div>
                    <div class="ai-div utilDiv" id="ai-div">Complete with AI (Beta)</div>
                </div>
                <button class="send-btn" onClick="collectEmailData()">Send</button>
            </div>
        </div>
    `;

    MultiselectDropdown(window.MultiselectDropdownOptions);

    // Initialize Quill rich text editor
    var quill = new Quill('#editor', {
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                ['emoji', 'image', 'video', 'formula'],
                [{ 'header': 1 }, { 'header': 2 }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'font': [] }],
                [{ 'align': [] }],
                ['clean']
            ],
            'emoji-toolbar': true,
        },
        placeholder: 'Compose your email...',
        theme: 'snow'
    });

    stopLoader();
    addClickEventToDiv("preview-div",previewData);
    addClickEventToDiv("ai-div",aiAutoComplete);

    // File selection logic
    const fileSelectBox = document.getElementById("fileSelectBox");
    const fileInput = document.getElementById("fileInput");
    const fileList = document.getElementById("fileList");

    fileSelectBox.addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener("change", () => {
        // Clear the existing file list
        fileList.innerHTML = "";
        const selectedFiles = Array.from(fileInput.files);

        if (selectedFiles.length > 1) {
            showToastMsg("Cannot select file", "Max 1 file", "Failed");
            fileInput.value = ""; // Reset the file input
            return;
        }

        // If one file is selected, display it
        if (selectedFiles.length === 1) {
            const file = selectedFiles[0];
            const listItem = document.createElement("li");
            listItem.classList.add("file-item");
            listItem.innerHTML = `
                ${file.name}
                <button class="remove-file">Remove</button>
            `;
            fileList.appendChild(listItem);

            // Add remove functionality for the selected file
            listItem.querySelector(".remove-file").addEventListener("click", () => {
                fileInput.value = ""; // Reset the file input
                fileList.innerHTML = ""; // Clear the displayed file list
            });
        }
    });
}

async function collectEmailData() {
    startLoader();
    const emailSelectBox = document.getElementById('emailSelectBox');
    const selectedUser = getSelectedValues('emailSelectBox');

    const subjectInput = document.querySelector('.mail-input');
    const subject = subjectInput ? subjectInput.value : '';

    const quill = Quill.find(document.getElementById('editor'));
    const emailContent = quill ? quill.root.innerHTML : '';

    // Get the selected file
    const fileInput = document.getElementById("fileInput");
    const selectedFile = fileInput.files[0]; // Get the single selected file if any

    const formData = new FormData();
    formData.append("data", new Blob([JSON.stringify({
        token: gettokenfromlocalStorage(),
        clients: selectedUser,
        emailsubject: subject,
        emailContent: emailContent
    })], { type: "application/json" }));

    if (selectedFile) {
        formData.append(`attachments`, selectedFile, selectedFile.name);
    }

    const apiData = await zapAPICaller('POST', urlPrefixServices + "/emailservice/sendemail", formData, 0);
    console.log(apiData);

    stopLoader();
}

function previewData() {
    let emailPop = document.getElementById("emailPop");
    emailPop.style.display = "block";
    
    let emailsubject = document.getElementById("emailsubject");
    let emailContent = document.getElementById('editor');

    let contentHtml=emailContent.innerHTML
                .replace('<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">','')
                .replace('<div class="ql-editor ql-blank" data-gramm="false" contenteditable="true" data-placeholder="Compose your email..."><p><br></p></div>','');

    // Create a styled HTML for the email preview
    let html = `
            <button class="cancel-btn-emailPop" id="cancel-btn-emailPop" onclick="clearEmailPop()">&#10005;</button> 
                <div class="preview-subject">${emailsubject.value}</div>
                <div id="preview-content" style="white-space: pre-wrap; color: #444; line-height: 1.5;">
                    ${contentHtml}
                </div>
    `;

    emailPop.innerHTML = html;
}


function aiAutoComplete()
{
    let emailPop = document.getElementById("emailPop");
    emailPop.style.display = "block";
    
    let emailsubject = document.getElementById("emailsubject");
    let emailContent = document.getElementById('editor');

    let contentHtml=emailContent.innerHTML
                .replace('<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">','')
                .replace('<div class="ql-editor ql-blank" data-gramm="false" contenteditable="true" data-placeholder="Compose your email..."><p><br></p></div>','');

    // Create a styled HTML for the email preview
    let html = `
            <button class="cancel-btn-emailPop" id="cancel-btn-emailPop" onclick="clearEmailPop()">&#10005;</button> 
            <div id="askdiv">
                <input type="text" id="prompt" placeholder ="Provide a prompt for your AI-generated email..."/> 
                    <button class="generateEmail" onClick="generateEmail()">Generate</button>
                 </div>
                 <button class="moveToEditor" id="copyAiEmail" style='display:none' onClick="copyAiEmail()">Copy</button>
             <div id="aiTypingDiv" class="typing-container"></div>
          
    `;

    emailPop.innerHTML = html;
    
}

function clearEmailPop()
{
    let emailPop=document.getElementById("emailPop");
    let cancel=document.getElementById("cancel-btn-emailPop");

    if(emailPop)
    emailPop.style.display="none";

    if(cancel)
    cancel.style.display="none";
}


async function generateEmail()
{
    console.log("email AI called...")
    let prompt=document.getElementById("prompt").value;
    const element = document.getElementById("aiTypingDiv");
    element.innerHTML='';

    let inputData = {
        token: gettokenfromlocalStorage(),
        "prompt":prompt
    };
    const apiData = await zapAPICaller("post", urlPrefixServices + "/emailservice/generateemail", inputData, 0);


    typeEffect("aiTypingDiv",apiData.output,10);

    document.getElementById("copyAiEmail").style.display="inline"

}

function addClickEventToDiv(divId, callback) {
    const divElement = document.getElementById(divId);
    
    if (divElement) {
        divElement.onclick = callback;
    } else {
        console.error(`Element with ID "${divId}" not found.`);
    }
}

function typeEffect(elementId, text, delay = 100) {
    const element = document.getElementById(elementId);
    let index = 0;

    // Clear previous content
    element.innerHTML = ""; 
    // Split the text by newlines
    const lines = text.split('\n'); 

    function type() {
        // Check if there are still lines to process
        if (index < lines.length) {
            // Get the current line
            const currentLine = lines[index];
            // Append each character of the current line
            for (let charIndex = 0; charIndex < currentLine.length; charIndex++) {
                setTimeout(() => {
                    element.innerHTML += currentLine[charIndex];
                }, delay * (charIndex + 1)); // Delay for each character
            }

            // After finishing the current line, move to the next one
            setTimeout(() => {
                element.innerHTML += '<br>'; // Add a line break
                index++; // Move to the next line
                type(); // Call the type function for the next line
            }, delay * (currentLine.length + 1)); // Delay before moving to the next line
        }
    }
    type(); // Start the typing effect
}


function copyAiEmail()
{
    let data=document.getElementById("aiTypingDiv").innerText ;
    navigator.clipboard.writeText(data);

    let copyBtn=document.getElementById("copyAiEmail") ;
    copyBtn.innerText='Copied!'

    setTimeout(()=>
        {
            copyBtn.innerText='Copy'
        },2000);
}
