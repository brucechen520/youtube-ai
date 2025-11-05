class ApiError extends Error {
  // 讓父類別接受 details 參數，並將其設為選填
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR', details = null) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends ApiError {
  // 注意：這裡仍然將 details 放在最後，但它會傳遞給 super()
  constructor(message = 'Invalid request parameters or format', details = null) {
    // 呼叫父類別，將 details 傳遞上去
    super(message, 400, 'BAD_REQUEST', details);

    // ⚠️ 注意：這裡不再需要 this.details = details;
    // 因為 ApiError 已經處理了
  }
}

class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized access', details = null) {
    super(message, 401, 'UNAUTHORIZED', details);
  }
}

class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden', details = null) {
    super(message, 403, 'FORBIDDEN', details);
  }
}

class NotFoundError extends ApiError {
  constructor(message = 'Resource not found', details = null) {
    super(message, 404, 'NOT_FOUND', details);
  }
}

class ConflictError extends ApiError {
  constructor(message = 'Resource conflict', details = null) {
    super(message, 409, 'CONFLICT', details);
  }
}

class ContentTooLargeError extends ApiError {
  constructor(message = 'Content too large', details = null) {
    super(message, 413, 'CONTENT_TOO_LARGE', details);
  }
}

class UnprocessableEntityError extends ApiError {
  constructor(message = 'Unprocessable Entity', details = null) {
    super(message, 422, 'UNPROCESSABLE_ENTITY', details);
  }
}

class LockedError extends ApiError {
  constructor(message = 'Resource locked', details = null) {
    super(message, 423, 'LOCKED', details);
  }
}

class TooManyRequestsError extends ApiError {
  constructor(message = 'Too many requests', details = null) {
    super(message, 429, 'TOO_MANY_REQUESTS', details);
  }
}

class InternalError extends ApiError {
    constructor(message = 'Internal server error', details = null) {
        super(message, 500, 'INTERNAL_ERROR', details);
    }
}

class ExternalServiceError extends ApiError {
  constructor(message = 'External service failed or timed out', details = null) {
    // 503 Service Unavailable
    super(message, 503, 'EXTERNAL_SERVICE_ERROR', details);
  }
}

export {
    ApiError,
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
    InternalError,
    ContentTooLargeError,
    ConflictError,
    UnprocessableEntityError,
    ForbiddenError,
    LockedError,
    TooManyRequestsError,
    ExternalServiceError,
};
