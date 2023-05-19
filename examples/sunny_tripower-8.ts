import { exit } from "process";
import {SunnyTripower8} from "../index"

let device = new SunnyTripower8("192.168.178.123", 502, 3);
let seriennummer: string;
let deviceClass: string;

function exitProcess(code: number){
    console.log("Programm beendet!");
    //process.exit(code);
}


setInterval(async () => {

    if (!seriennummer) {
        console.log("Seriennummer wird ausgelesen!");
        seriennummer = await device.getSerialNumber();
        console.log(seriennummer);
    }

    if (!deviceClass) {
        console.log("DeviceClass wird ausgelesen!");
        deviceClass = await device.getDeviceClass();
        console.log(deviceClass);        
    }
    await device.getTotalPower("kWh").then(console.log);
    await device.getDaylyPower("kWh").then(console.log),
    await device.getCurrentPower().then(console.log);
    await device.getCurrentPower("kW").then(console.log);
    

}, 2000);