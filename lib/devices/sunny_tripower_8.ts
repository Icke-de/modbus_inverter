/*SMA Sunny Tripower 8.0 / STP8.0-3AV-40 683 */
import {BasicSMADevice} from "../sma_device";
import {ModbusDatatype} from "../modbus_typings";

export class SunnyTripower8 extends BasicSMADevice {
    constructor(ipAddress: string, modbusPort: number, unitId: number) {
        super(ipAddress, modbusPort, unitId);
    }

    /**
     * Serialnumber
     * @returns Serialnumber from Device
     */
    async getSerialNumber(): Promise<string> {
        return await super.readModbusIR(30005, ModbusDatatype.uint32, 2);
    }

    /**
     * get Device Class
     * @returns Device Class
     */
    async getDeviceClass(): Promise<string> {
        let deviceClass: number = await super.readModbusIR(30051, ModbusDatatype.uint32, 2);
        switch (deviceClass) {
            case 8001:
                return "Solar-Wechselrichter";
                break;
            case 8002:
                return "Wind-Wechselrichter";
                break;
            case 8007:
                return "Batterie-Wechselrichter";
                break;
            case 8033:
                return "Verbraucher";
                break;
            case 8064:
                return "Sensorik allgemein";
                break;
            case 8065:
                return "Stromzähler";
                break;
            case 8128:
                return "Kommunikationsprodukte";
                break;   
            default:
                return "Alle Geräte";
                break;
        }
    }

    /**
     * Total energy
     * @param unit like "Wh" or "kWh" (default: Wh)
     * @returns Total energy fed in on all outer conductors, in Wh or kWh
     */
    async getTotalPower(unit?: string): Promise<string>{
        let register: number = 30513;
        switch (unit) {
            case "Wh":
                return await super.readModbusIR(register, ModbusDatatype.uint64, 4);
                break;
            
            case "kWh":
                let value: number = await super.readModbusIR(register, ModbusDatatype.uint64, 4)*0.001;
                return await value.toFixed(3);
                break;
            
            default:                
                return await super.readModbusIR(register, ModbusDatatype.uint64, 4);
                break;
        }
    }

    /**
     * Dayly energy
     * @param unit like "Wh" or "kWh" (default: Wh)
     * @returns Energy fed in for the current day, on all phases, in Wh or kWh
     */
    async getDaylyPower(unit?: string): Promise<string>{
        let register: number = 30517;
        switch (unit) {
            case "Wh":
                return await super.readModbusIR(register, ModbusDatatype.uint64, 4);
                break;
            
            case "kWh":
                let value: number = await super.readModbusIR(register, ModbusDatatype.uint64, 4)*0.001;
                return await value.toFixed(3);
                break;
            
            default:                
                return await super.readModbusIR(register, ModbusDatatype.uint64, 4);
                break;
        }
    }

    /**
     * Current Power
     * @param unit like "W" or "kW" (default: W)
     * @returns Current active PV feed-in power over all phase conductors, in W
     */
    async getCurrentPower(unit?: string): Promise<string>{
        let register: number = 30775;
        let value: number = await super.readModbusIR(register, ModbusDatatype.int32, 2);
        if (value <= 0) {
            return await "0";
        }else{
            switch (unit) {
                case "W":
                    return await super.readModbusIR(register, ModbusDatatype.int32, 2);
                    break;
    
                case "kW":
                    value = await super.readModbusIR(register, ModbusDatatype.int32, 2)*0.001;
                    return await value.toFixed(3);
                    break;
            
                default:
                    return await super.readModbusIR(register, ModbusDatatype.int32, 2);
                    break;
            }
        }
    }
}