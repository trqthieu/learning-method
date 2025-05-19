export function extractJson(text: string): string {
  return text.replace(/```json|```/g, '').trim();
}
