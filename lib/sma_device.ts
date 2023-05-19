import {ModbusDatatype} from "./modbus_typings";
import {ModbusConnection} from "./modbus_util";
import {DeviceTypes} from "./sma_constants";

interface SMADevice {
    readModbusHR(register: number, datatype: ModbusDatatype): Promise<any>;

    readModbusIR(register: number, datatype: ModbusDatatype): Promise<any>;

    getIpAddress(): string;
}

export abstract class BasicSMADevice implements SMADevice{
    private connection: ModbusConnection;
    private ipAddress: string;
    private unitId: number;

    constructor(ipAddress: string, modbusPort = 502, unitId: number ) {
        this.unitId = unitId;
        this.connection = new ModbusConnection(ipAddress, modbusPort, unitId);
        this.ipAddress = ipAddress;
    }

    getIpAddress(): string {
        return this.ipAddress;
    }

    async readModbusHR(register: number, datatype: ModbusDatatype, length?: number): Promise<any> {
        return this.connection.readModbusHR(register, datatype, length);
    }

    async readModbusIR(register: number, datatype: ModbusDatatype, length?: number): Promise<any> {
        return this.connection.readModbusHR(register, datatype, length);
    }

    close(){
        this.connection.close();
    }
}