// const { ipcRenderer } = require('electron');
import { useEffect, useState } from "react"
// import { ipcRenderer } from "electron";


// export const MessageBlock = () => {
//     const [message, setMessage] = useState(window.electron.store.get('msgBlock'))

//     useEffect(() => {

        
//         // Listen for the event        
//         ipcRenderer.on('electron-store-set', (_event, arg) => {
//           setMessage(arg);
//         });
//         // Clean the listener after the component is dismounted
//         return () => {
//           ipcRenderer.removeAllListeners('electron-store-set');
//         };
//       }, []);

//     // window.electron.store.onDidChange('msgBlock', (newValue)=>{
//     //     setMessage(newValue)
//     // })

//     return (<div>{message}</div>)
// }



export const MessageBlock = () => {
    const [message, setMessage] = useState(window.electron.store.get('msgBlock'))

    useEffect(() => {
        setInterval(() => {
            setMessage(window.electron.store.get('msgBlock'))
        }, 1000)
    })

    return (<div className="message-block">{message.map((row: any) => {
        return (<div>{row}</div>)
    })}</div>)
}