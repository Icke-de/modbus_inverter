import {BasicSMADevice} from "../sma_device";
import {ModbusDatatype} from "../modbus_typings";

export class SunnyBoy extends BasicSMADevice{
    constructor(ipAddress: string, modbusPort: number, unitId: number) {
        super(ipAddress, modbusPort, unitId);
    }

    async getLifetimeWh(): Promise<number> {
        return await super.readModbusHR(40303, ModbusDatatype.acc64) / 1000;
    }

}