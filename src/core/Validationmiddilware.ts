import {NextFunction, Request, Response,RequestHandler} from "express";
import {plainToInstance} from "class-transformer";
import {validate, ValidationError} from "class-validator";


export function Validationmiddlware <T extends object>  (DtoClass: new ()=> T):RequestHandler  {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dto = plainToInstance(DtoClass, req.body)
        const errors:ValidationError[] = await validate(dto,{
            whitelist: true,
        })
        if (errors.length > 0) {
            const messages = errors.map(error => Object.values(error.constraints || {}))
                .flat()
            return res.status(400).json(messages)

        }
        req.body = dto as typeof req.body;
        next()
    }

}