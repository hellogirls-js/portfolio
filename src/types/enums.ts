export const ChatboxError = {
  NicknameNotProvided: "Please provide a nickname!",
  NicknameTooShort: "Nickname must be at least 3 characters long!",
  MessageNotProvided: "Please provide a message!",
  MessageTooLong: "Message is too long!",
  MessageTooShort: "Message is too short!",
} as const;

export type ChatboxError = (typeof ChatboxError)[keyof typeof ChatboxError];
