export const SOCKET_EVENTS = {
  // chat
  MESSAGE_SEND: "message:send",
  MESSAGE_RECEIVE: "message:receive",
  MESSAGE_READ: "message:read",
  TYPING_START: "typing:start",
  TYPING_STOP: "typing:stop",

  // call
  CALL_INITIATE: "call:initiate",
  CALL_ACCEPT: "call:accept",
  CALL_REJECT: "call:reject",
  CALL_END: "call:end",
  CALL_ICE_CANDIDATE: "call:ice-candidate",
  CALL_OFFER: "call:offer",
  CALL_ANSWER: "call:answer",

  // user
  USER_ONLINE: "user:online",
  USER_OFFLINE: "user:offline",
} as const;