const Attribute = require("./attribute");

class AttributeList{
    constructor(str,dex,con,int,wis,cha){
        this.str = new Attribute(str,[])
        this.dex = new Attribute(dex,[])
        this.con = new Attribute(con,[])
        this.int = new Attribute(int,[])
        this.wis = new Attribute(wis,[])
        this.cha = new Attribute(cha,[])
    }
}
module.exports = AttributeList