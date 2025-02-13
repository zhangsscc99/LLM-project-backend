class Validate {
    // 校验undefined
    async undefinedCheck(val, par){
        if(val === undefined){
            throw{ msg: '${par}字段必填', code: 400 };
        }
    }
    // 空值和字符串校验

    async nullCheck(val, tips, par){
        await this.undefinedCheck(val, par);
        if(val.trim() === ""){
            throw{msg:tips, code:422 }
        }
        if(typeof val !== 'string'){
            throw{msg:'${par}字段必须是字符串类型', code:400}

        }

    }
}