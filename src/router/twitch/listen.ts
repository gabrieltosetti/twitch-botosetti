import { Request, Response } from "express";
import { participants } from "./list";
import { v4 } from "uuid";

export const listeners: Record<string, Response> = {};

function listenController(req: Request, res: Response) {
  res.set({
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  });
  res.flushHeaders();
  res.write("retry: 5000\n\n");

  const data = `data: ${JSON.stringify(participants)}\n\n`;

  const listenerId = v4();

  res.write(data);
  listeners[listenerId] = res;

  req.on("close", () => {
    console.log(`Connection closed`);
    delete listeners[listenerId];
  });
}

export default listenController;
