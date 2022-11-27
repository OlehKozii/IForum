import {Request, Response, NextFunction} from "express";


class CustomError extends Error{
    status:number
    constructor(status:number, message:string){
        super(message)
        this.status=status
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    static badRequest(message:string){
        return new CustomError(400, message)
    }

    static unauthorized(message:string){
        return new CustomError(401, message)
    }

    static forbidden(message:string){
        return new CustomError(403,message)
    }

    static notFound(message:string){
        return new CustomError(404,message)
    }

    static unsupportedMedia(message:string){
        return new CustomError(415,message)
    }

    static teapot(message:string){
        return new CustomError(418,message)
    }

    static internal(message:string){
        return new CustomError(500,message)
    }
}

const ErrorMiddleware = (err:any, req:Request, res:Response, next:NextFunction)=>{
    if(err instanceof CustomError){
        return res.status(err.status).json({message:err.message})
    }
    return res.status(400).json({message:"Unexpected error"})

}

export {ErrorMiddleware, CustomError}