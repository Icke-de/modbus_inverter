import {BasicSMADevice} from "../sma_device";
import {ModbusDatatype} from "../modbus_typings";

export class SunnyIsland extends BasicSMADevice {
    constructor(ipAddress: string, modbusPort: number, unitId: number) {
        super(ipAddress, modbusPort, unitId);
    }

    async getBatteryPercentage(): Promise<number> {
        return await super.readModbusHR(40378, ModbusDatatype.uint16);
    }

}