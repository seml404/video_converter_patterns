import { IStreamLogger } from "./stream-logger.interface";

export class StreamHandler { 
    constructor(private outHandler: IStreamLogger){
        
    }
}