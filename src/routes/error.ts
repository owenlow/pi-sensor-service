import { Response } from "express";

export const handleError = (response: Response, error: any) => {
    console.error(`Error handler reached, reason: ${error}`);
    response.sendStatus(500).send({ error: true });
};
