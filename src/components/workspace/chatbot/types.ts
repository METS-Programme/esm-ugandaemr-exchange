// types.ts
export type MessageDirection = "incoming" | "outgoing" | 0 | 1;

export interface MessageModel {
  message?: string;
  sentTime?: string;
  sender?: string;
  direction: MessageDirection;
  position: "single" | "first" | "normal" | "last" | 0 | 1 | 2 | 3;
}
