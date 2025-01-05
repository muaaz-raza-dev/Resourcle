import { FastifyReply } from "fastify";


interface ErrorResponse {
  status: 'error';
  message: string;
  error?: string;
}

export const SuccessResponse = (
  res: FastifyReply,
  { payload, message }: { payload?: any; message?: string }
): FastifyReply => {
  return res.status(200).send({
    success: true,
    message: message || 'Request successful', // Default message if not provided
    payload: payload || null, // Default to null if no payload is provided
  });
};

export const ErrorResponse = (
  res: FastifyReply,
  { error, message, status = 500 }: { error?: any; message: string; status?: number }
): FastifyReply => {
  // Ensure status is a valid number, and use a fallback message
  return res.status(status).send({
    status: 'error',
    message: message || 'An error occurred', // Default message if not provided
    error: error?.message || error || 'Unknown error', // Default error message if no error is provided
  });
};
