import { GoogleGenAI, Type } from "@google/genai";
import { Hotel, AIRecommendation } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getHotelRecommendations = async (
  query: string,
  availableHotels: Hotel[]
): Promise<AIRecommendation[]> => {
  if (!process.env.API_KEY) {
    console.error("API Key is missing");
    return [];
  }

  // Create a simplified list of hotels to send to the model to save tokens and context
  const hotelContext = availableHotels.map(h => ({
    id: h.id,
    name: h.name,
    city: h.city,
    description: h.description,
    amenities: h.amenities,
    price: h.pricePerNight,
    type: h.type
  }));

  const prompt = `
    You are an expert AI Travel Concierge for LuxeStay.
    User Query: "${query}"
    
    Here is the list of available hotels in our database:
    ${JSON.stringify(hotelContext)}

    Task:
    1. Analyze the user's query to understand their intent (location, vibe, amenities, budget, etc.).
    2. Select up to 3 hotels that best match the query.
    3. If no exact match is found, infer the next best options based on the "vibe" (e.g., if they ask for "romantic" and no location is specified, suggest romantic hotels anywhere).
    4. Provide a persuasive reason for each recommendation.

    Output Rules:
    - Return strictly a JSON array of objects.
    - Each object must have "hotelId" (string) and "reason" (string).
    - Do not include markdown code blocks (like \`\`\`json).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              hotelId: { type: Type.STRING },
              reason: { type: Type.STRING, description: "A short, persuasive reason why this hotel fits the query." }
            },
            required: ["hotelId", "reason"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    
    return JSON.parse(text) as AIRecommendation[];
  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
};