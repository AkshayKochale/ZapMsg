function showEmailtab()
{
    changeMainTab("emailcontent");

    let emailcontent = document.getElementById('emailcontent');
    emailcontent.style.display="block";
    emailcontent.innerHTML=  `
            <div class="mail-container">
            <div class="mail-fields">
                
                <select id="emailDropdown1" multiple class="email-select">
                    <option value="email1@example.com">email1@example.com</option>
                    <option value="email2@example.com">email2@example.com</option>
                    <option value="email3@example.com">email3@example.com</option>
                    <option value="email4@example.com">email4@example.com</option>
                </select>

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
                    <div class="preview-div"> Preview</div>
                     <div class="preview-div"> Complete with AI</div>
                </div>

                <button class="send-btn">Send</button>
            </div>
        </div>
    `
    const emailDropdown = new Choices('#emailDropdown1', {
        removeItemButton: true,
        searchEnabled: false,
        placeholder: true,
        placeholderValue: 'Select email IDs',
    });

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