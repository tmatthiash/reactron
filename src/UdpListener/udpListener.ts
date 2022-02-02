import dgram from "dgram";
import { formatBufferToEightBinaryArrays, formatPacketToJSON } from "./formatters/BufferFormatter";
import { store } from "../main/main"
// import { ipcMain } from "electron";

export const server = dgram.createSocket({ type: "udp4", reuseAddr: true });

// const decodeBody = (buff: Buffer) => {
//   const bitArray = [...buff.toString()]
//     .map((number) => ("00000000" + number.toString(2)).slice(-8)) // '00000111'
//     .join("")
//     .split("");
//     console.log("There are ", bitArray.length, "bits")

//   return sliceIntoNSizeChunks(bitArray, 1440).map((chunk) => sliceIntoNSizeChunks(chunk, 32));
// };
// // return sliceIntoNChunks(bitArray).map((chunk) => sliceIntoNSizeChunks(chunk));


// const decode = (buf: Buffer) => {
//   var len = buf.readUInt16BE(4);
//   return {
//     sourcePort: buf.readUInt16BE(0),
//     destinationPort: buf.readUInt16BE(2),
//     length: len,
//     checksum: buf.readUInt16BE(6),
//     // data: decodeBody(buf.slice(8, len)),
//     data: decodeBody(buf)
//   };
// };

server.on("message", (msg, _rinfo) => {

  const binaryPackets = formatBufferToEightBinaryArrays(msg);

  const dispatchAction = () => {
    return {
      type: 'SET_MESSAGE_BLOCK',
      msgBlock: [["1","2"], ["3","4"]] //binaryPackets
    }
  }

  try {
    // ipcMain.send('electron-store-set', 'msgBloc', "hello");
    store.set("msgBlock", binaryPackets[0])

  
  }
  catch(e) {
    console.log("error ", e)
    server.close();
  }

  console.log("rinfo ", _rinfo)
  console.log("packets ", binaryPackets[0]);
  // const firstPacketFormattedToJSON = formatPacketToJSON(binaryPackets[0])
  // console.log(firstPacketFormattedToJSON);

  // const report = `server got: ${util.inspect(
  //   decode(msg),{
  //     depth: null
  //   }
  // )} from ${rinfo.address}:${rinfo.port}`;
  // console.log(report);

  // fs.writeFileSync(
  //   path.resolve(__dirname, "./buffer.json"),
  //   JSON.stringify(msg)
  // );

  // fs.writeFileSync(
  //   path.resolve(__dirname, "./report.json"),
  //   JSON.stringify(decode(msg))
  // );
  server.close();
});

server.on("error", (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on("listening", () => {
  // ipcMain.emit('electron-store-set', 'msgBloc', 'hello')
  store.set("msgBlock", ["test", "message"])

  // ipcMain.send('electron-store-set', 'msgBloc', "hello");
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(60084);

