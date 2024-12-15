import { Response } from "express";

export const SuccessResponse = (res: Response, { payload, message }: { payload?: any, message?: string }): Response => {
  return res.status(200).json({ success: true, message, payload });
};

export const ErrorResponse = (res: Response,{error,message,status}:{ error?: any,status?:number, message: string }) => {
    return res.status(status || 500).json({status: 'error',message:message||"An error occured",error: error?.message || error,});
};