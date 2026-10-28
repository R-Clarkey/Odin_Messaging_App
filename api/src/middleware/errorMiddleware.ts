import { Request, Response, NextFunction } from 'express'

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	let statusCode = 500
	let message = "Internal Server Error"

	if (err.message === "No user found") {
		statusCode = 404
		message = err.message
	}

    if (err.message === "Error updating records") {
        statusCode = 404
        message = err.message
    }

	res.status(statusCode).json({
		success: false,
		message: message
	})
}
