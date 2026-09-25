interface ChatboxMessage {
  id: string;
  nickname: string;
  message: string;
  createdAt: Date;
}

type ChatboxMessageInput = Pick<ChatboxMessage, "nickname" | "message">;

interface BlogPost {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}
