// import { useEffect } from "react";
// import useDrivePicker from "react-google-drive-picker";

// function Drive() {
//     const [openPicker, authResponse] = useDrivePicker();
//     // const customViewsArray = [new google.picker.DocsView()]; // custom view
//     const handleOpenPicker = () => {
//         openPicker({
//             clientId:
//                 "658325649624-qlbqeobh18f1cr39ddrggm3qd03pfv21.apps.googleusercontent.com",
//             developerKey: "AIzaSyAhNO862chA-yP1fJU3LKBwxA9QbWIPi8g",
//             viewId: "DOCS",
//             // token: token, // pass oauth token in case you already have one
//             showUploadView: true,
//             showUploadFolders: true,
//             supportDrives: true,
//             multiselect: true,
//             // customViews: customViewsArray, // custom view
//             callbackFunction: (data) => {
//                 if (data.action === "cancel") {
//                     console.log("User clicked cancel/close button");
//                 }
//                 console.log(data);
//             },
//         });
//     };

//     return (
//         <div>
//             <button onClick={() => handleOpenPicker()}>google drive</button>
//         </div>
//     );
// }

// export default Drive;

import { useEffect } from "react";
import useDrivePicker from "react-google-drive-picker";

function Drive() {
    const [openPicker, authResponse] = useDrivePicker();

    const handleOpenPicker = () => {
        openPicker({
            clientId:
                "658325649624-ne1b2u0g6asqvc3dhl3p881u9nbig6k2.apps.googleusercontent.com",
            developerKey: "AIzaSyC7Hyx6A_6Qg0fFsJA_ae0co5kXM4YbKzA",
            viewId: "DOCS",
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: true,
            callbackFunction: (data) => {
                if (data.action === "picked") {
                    const files = data.docs;
                    console.log(files);
                    // Perform upload logic or any other operations with the selected files
                } else if (data.action === "cancel") {
                    console.log("User clicked cancel/close button");
                }
            },
        });
    };

    return (
        <div>
            <button onClick={handleOpenPicker}>Google Drive</button>
        </div>
    );
}

export default Drive;
