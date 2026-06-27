import { Request, Response } from 'express';

/**
 * Handles checking server status.
 */
export const getHealth = (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    message: 'AlgoBlocks API is running successfully' 
  });
};
