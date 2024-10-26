function showEmailtab()
{
    changeMainTab("emailcontent");

    let selectBox=createDropDown(["goku","akshay","vegeta","goku","akshay","vegeta","goku","akshay","vegeta"]
                                    ,"emailSelectBox")
      

    let emailcontent = document.getElementById('emailcontent');
    emailcontent.style.display="block";
    emailcontent.innerHTML=  `
            <div class="title-mail">Email</div> 
            <div class="mail-container">
            <div class="mail-fields">
            `+ selectBox+`
                <input type="text" class="mail-input" placeholder="Enter Subject" />

                
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
                    <form action="/file-upload" class="dropzone" id="fileDropzone"></form>
                    <label class="dropfilestxt">Drop files here</label>
                    <div class="preview-div utilDiv"> Preview</div>
                    <div class="ai-div utilDiv"> Complete with AI</div>
                </div>

                <button class="send-btn">Send</button>
            </div>
        </div>
    `
    MultiselectDropdown(window.MultiselectDropdownOptions);
    // Initialize Quill rich text editor
    var quill = new Quill('#editor', {
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],
                [ 'emoji','image', 'video', 'formula'],
              
                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction
              
                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],
              
                ['clean']                                         // remove formatting button
              ],
            'emoji-toolbar': true,
        },
        placeholder: 'Compose your email...',
        theme: 'snow'
    });

    Dropzone.autoDiscover = false;
    var dropzone = new Dropzone("#fileDropzone", {
        url: "/file-upload",
        maxFilesize: 2, 
        addRemoveLinks: true,
        acceptedFiles: "image/*,application/pdf"
    });


}