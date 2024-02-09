import 'reflect-metadata';

import {createExpressServer, Get, HttpError, JsonController,} from "routing-controllers";
import {NextFunction, Request, Response} from "express";

@JsonController()
class IndexController {
    @Get("/")
    index() {
        return {
            message: "Hello, world!",
        };
    }


    @Get("/foo")
    foo() {
        throw new HttpError(405, 'tomatoes not allowed');
        return {
            message: "Hello, world!",
        };
    }
}

const api = createExpressServer({
    development: false,
    defaultErrorHandler: true,
    controllers: [IndexController]
});
api.use(function (req: Request, res: Response, next: NextFunction) {
    if (!res.writableEnded) {
        res.status(404).json(
            {
                status: 404,
                message: `Cannot ${req.method} ${req.url}`,
            }
        );
    }
    res.end();
});
api.listen(process.env.PORT || 3000, () => console.log("running"));