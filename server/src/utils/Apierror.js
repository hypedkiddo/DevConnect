class Apierror extends Error{
    constructor(statuscode,message="Soemthing went wrong",error=[],stack=""){
        super(message);
        this.statuscode=statuscode;
        this.data=null;
        this.message=message;
        this.success=false;
        this.errors=this.errors
        if(stack){
            this.stack=stack
        }
        else{
            Error.captureStackTrace(this,this.constuctor)
        }
    }
}

export {Apierror}