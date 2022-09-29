import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// 요청하는 대상이 무엇을 요청했는지 알 수 있는 미들웨어
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP')

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish',() =>{
      this.logger.log(
        `${req.ip} ${req.method} ${res.statusCode}`,
        req.originalUrl
      )
    })
    next();
  }
}
