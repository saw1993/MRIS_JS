class ResponseHandler {
    static success(res, data = null, message = 'Request was successful') {
      return res.status(200).json({
        status: 'success',
        data: data,
        message: message,
        errors: null
      });
    }
  
    static fail(res, message = 'Request failed', errors = null, statusCode = 400) {
      return res.status(statusCode).json({
        status: 'fail',
        data: null,
        message: message,
        errors: errors
      });
    }
  
    static error(res, message = 'Internal server error', errors = null, statusCode = 500) {
      return res.status(statusCode).json({
        status: 'error',
        data: null,
        message: message,
        errors: errors
      });
    }
  }
  
  module.exports = ResponseHandler;