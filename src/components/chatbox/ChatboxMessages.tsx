import type { API } from "@strapi/client";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useMemo } from "react";
import { strapiClient } from "@/utils/constants";
import DesktopLoader from "../desktop/DesktopLoader";
import dayjs from "dayjs";

export default function ChatboxMessages() {
  const {
    data: chatboxMsgs,
    isPending: areChatboxMsgsPending,
    error: chatboxMsgsError,
  } = useQuery({
    queryKey: ["chatboxMsgs"],
    queryFn: async () => {
      const messages = strapiClient.collection("chatbox-messages");
      const allMessages = await messages.find({
        sort: "createdAt",
      });

      return allMessages.data as Array<API.Document & ChatboxMessageInput>;
    },
  });

  const chatboxMsgRenderer = useMemo(() => {
    if (!chatboxMsgs?.length && !chatboxMsgsError && !areChatboxMsgsPending) {
      return <div>No messages</div>;
    } else if (chatboxMsgs?.length) {
      return (
        <>
          {chatboxMsgs.map((msg) => (
            <div
              key={msg.documentId}
              className={clsx(
                "chatbox-message-container",
                "flex flex-col",
                "mb-4",
              )}
            >
              <div
                className={clsx(
                  "chatbox-message-header",
                  "flex items-baseline gap-2",
                )}
              >
                <div
                  className={clsx(
                    "chatbox-message-nickname",
                    "text-primary-500",
                    "font-bold",
                  )}
                >
                  {msg.nickname}
                </div>
                <div
                  className={clsx(
                    "chatbox-message-date",
                    "text-base-400",
                    "text-xs",
                  )}
                >
                  {dayjs(msg.createdAt).format("MM/DD/YYYY")}
                </div>
              </div>
              <div className={clsx("chatbox-message")}>{msg.message}</div>
            </div>
          ))}
        </>
      );
    } else if (chatboxMsgsError) {
      return <div>{chatboxMsgsError.message}</div>;
    } else {
      return <DesktopLoader />;
    }
  }, [chatboxMsgs, chatboxMsgsError, areChatboxMsgsPending]);

  return (
    <div
      id="chatbox-messages"
      className={clsx("overflow-y-auto", "p-2", "border-t border-t-base-300")}
    >
      {chatboxMsgRenderer}
    </div>
  );
}
