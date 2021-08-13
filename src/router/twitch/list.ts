export const participants: string[] = [];

export function addToList(participant: string) {
  if (!participants.includes(participant)) {
    participants.push(participant);
  }
  return participants;
}
