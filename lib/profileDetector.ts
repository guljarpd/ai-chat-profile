const TRIGGERS = [
    "who am i",
    "tell me about myself",
    "what do you know about me",
    "describe me",
  ];
  
export const isProfileRequest = (msg: string) => TRIGGERS.some(t => msg.toLowerCase().includes(t));
  