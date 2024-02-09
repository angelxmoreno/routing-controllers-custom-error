import 'reflect-metadata';

import {
    createExpressServer,
    ExpressErrorMiddlewareInterface,
    Get,
    JsonController,
    Middleware,
} from "routing-controllers";

@Middleware({type: "after"})
class ErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: any, request: any, response: any, next: (err: any) => any) {
        console.log("custom error handler");
        response.status(error.status || 500);
        response.json(error);

        return response
    }
}

@JsonController()
class IndexController {
    @Get("/")
    index() {
        return {
            message: "Hello, world!",
        };
    }
}

const api = createExpressServer({
    defaultErrorHandler: false,
    middlewares: [ErrorHandler],
});


api.listen(process.env.PORT || 3000, () => console.log("running"));