import { ChatUserstate } from "tmi.js";
import { addToList } from "../list";
import { listeners } from "../listen";

const participarCommand = (context: ChatUserstate) => {
  const userData = {
    userId: context["user-id"],
    displayName: context["display-name"],
    mod: context.mod,
    sub: context.subscriber,
  };
  const list = addToList(JSON.stringify(userData));
  const data = `data: ${JSON.stringify(list)}\n\n`;

  Object.values(listeners).forEach((res) => {
    res.write(data);
  });
};

export default participarCommand;
