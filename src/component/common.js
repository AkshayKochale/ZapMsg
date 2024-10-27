
const urlPrefixAuthetication = "http://localhost:8080";
const urlPrefixServices = "http://localhost:8181";

async function zapAPICaller(type, url, input,sleepTime) {
    const fullUrl = url; 
    let responseData;

    try {
        switch (type.toUpperCase()) {
            case 'GET':
                responseData = await axios.get(fullUrl);
                break;
            case 'POST':
                responseData = await axios.post(fullUrl, input);
                break;
            case 'PUT':
                responseData = await axios.put(fullUrl, input);
                break;
            case 'DELETE':
                responseData = await axios.delete(fullUrl, { data: input });
                break;
            default:
                throw new Error("Invalid request type");
        }

        if(sleepTime && sleepTime!=0)
        sleep(sleepTime)
    
        return responseData.data; 
    } catch (error) {
        console.error("API call error:", error.message);
        
        return {
            status: "failed",
            msg: "Unable to call service. Please try again later.",
            error: error.message || "Unknown error"
        };
    }
}


function sleep(milliseconds) {
    const start = Date.now();
    while (Date.now() - start < milliseconds) {
        // Loop until the specified time has passed
    }
}

function showToastMsg(title, details, status) {
 
    const successStyle = {
        background: "#D4EDDA",  // light green background
        color: "#155724",       // dark green text
        border: "1px solid #C3E6CB",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        fontSize: "12px",
        textAlign: "center",
        width: "250px"
    };
    
    const failureStyle = {
        background: "#F8D7DA",  // light red background
        color: "#721C24",       // dark red text
        border: "1px solid #F5C6CB",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        fontSize: "12px",
        textAlign: "center",
        width: "250px"
    };

    // Choose the style based on the status
    const chosenStyle = status === "success" ? successStyle : failureStyle;

    // Construct HTML with main title and details
    const toastContent = `
        <strong style="display: block; font-size: 15px; margin-bottom: 5px;">${title}</strong>
        <span style="font-size: 12px;">${details}</span>
    `;

    // Create the toast
    Toastify({
        text: toastContent,
        duration: 5000,
        close: false,
        gravity: "top",
        position: "right",
        style: chosenStyle,
        escapeMarkup: false
    }).showToast();
}

function startLoader()
{
   let mainloaderClass= document.getElementById("mainloaderClass");
   mainloaderClass.style.display="flex";
}

function stopLoader()
{
   let mainloaderClass= document.getElementById("mainloaderClass");
   mainloaderClass.style.display="none";
}

