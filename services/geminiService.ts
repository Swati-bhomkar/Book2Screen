import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the intelligent assistant for "Book2Screen", a website dedicated to exploring book-to-movie adaptations.
Your name is "ScreenReader".
Your capabilities:
1. Recommend books or movies based on the user's mood, genre preference, or past favorites.
2. Provide details about specific adaptations (differences between book and movie).
3. Help users find book sales or literary events using the Google Maps tool if they ask about locations.
4. Keep answers concise, engaging, and relevant to literature and cinema.
5. If asked about the website features, explain: We have a Famous Novels section, Author exploration, a Book Sales map, User Reviews, and an Admin panel.

Tone: Knowledgeable, sophisticated, yet accessible. Like a librarian who loves cinema.
`;

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ googleMaps: {} }], 
    },
  });
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    
    // Check for grounding (maps) first
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    let text = response.text || "I couldn't generate a text response, but here is what I found.";

    if (groundingChunks) {
      const mapLinks = groundingChunks
        .map((chunk: any) => {
           if (chunk.web?.uri) return `[${chunk.web.title}](${chunk.web.uri})`;
           if (chunk.maps?.uri) return `[${chunk.maps.title}](${chunk.maps.uri})`;
           return null;
        })
        .filter(Boolean)
        .join('\n');
      
      if (mapLinks) {
        text += `\n\nSources/Maps:\n${mapLinks}`;
      }
    }

    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the literary archives (API Error). Please try again later.";
  }
};