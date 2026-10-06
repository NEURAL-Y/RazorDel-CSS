import {properties} from "./store.js";
class container{
    verify_value:string;
    verify_type:string;
    constructor(verify_value:string,verify_type:string){
        this.verify_value=verify_value;
        this.verify_type=verify_type;
    }
    width_height_verify(){
        this.verify_type=this.verify_type.toLowerCase();
        this
    }
}