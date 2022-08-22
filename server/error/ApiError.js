class ApiError extends Error{
    constructor(status, message) {
        super()
        this.status = status
        this.message = message
    }

    static badRequest(message = 'Bad request') {
        return new ApiError(400, message) 
    }

    static internal(message = 'Internal error') {
        return new ApiError(500, message)
    }

    static forbidden(message = 'Forbidden') {
        return new ApiError(403, message)
    }

    static unauthorized(message = 'Unauthorized') {
        return new ApiError(401, message)
    }
}

export default ApiError