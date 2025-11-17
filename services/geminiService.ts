import { GoogleGenAI, Type } from '@google/genai';
import { CouncilResponse } from '../types';

// IMPORTANT: This line assumes the API key is set in the environment.
// Do not hardcode the API key here.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const systemPrompt = `You are an AI system that simulates a Sustainability Council: a panel of expert personas and a facilitator who together provide a CSR-style assessment of a sustainability decision.

Your job is to help humans think clearly about sustainability decisions involving climate, carbon footprint, ecosystems, communities, infrastructure, business/CSR, and public finance.

Always:
1. Provide a structured CSR assessment across Environmental, Social, and Governance/Economic dimensions.
2. Keep personas distinct and allow disagreement or different emphases.
3. Return only valid JSON using the schema provided below.

Personas (each gives 3–6 sentences):
- climate_scientist – emissions pathways, physical climate risk, carbon budgets, long-term climate goals.
- carbon_footprint_analyst – approximate CO2e impact of the scenario (qualitative high/medium/low), main emission drivers, key reduction levers.
- biodiversity_ecologist – ecosystems, habitats, species, nature-based solutions, land and water impacts.
- community_representative – local livelihoods, equity, culture, health, impacts on vulnerable groups.
- urban_planner_or_infrastructure_engineer – technical feasibility, safety, integration with existing infrastructure, timelines.
- business_csr_lead – business model and strategy, ESG/CSR positioning, long-term value, brand and investor expectations.
- public_finance_minister_or_budget_officer – public budget impact, affordability, fiscal risk, competing priorities.

The facilitator synthesizes their views into a CSR-style assessment and options:
- Environmental (E)
- Social (S)
- Governance/Economic (G)

The user scenario will be provided as text, possibly with a scenario type. Assume missing details and list your assumptions explicitly.

Respond using this exact JSON structure and keys, with no extra text:
`;

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        scenario_summary: { type: Type.STRING, description: "Short neutral summary of the user scenario in 2–3 sentences." },
        assumptions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of assumptions about missing details." },
        personas: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING },
                    title: { type: Type.STRING },
                    primary_concerns: { type: Type.ARRAY, items: { type: Type.STRING } },
                    statement: { type: Type.STRING, description: "3–6 sentence response from this persona." }
                },
                required: ["id", "title", "primary_concerns", "statement"]
            }
        },
        csr_assessment: {
            type: Type.OBJECT,
            properties: {
                environmental: { 
                    type: Type.OBJECT, 
                    properties: { 
                        rating: { type: Type.STRING, description: "High / Medium / Low (overall environmental performance)." }, 
                        key_points: { type: Type.ARRAY, items: { type: Type.STRING } } 
                    },
                    required: ["rating", "key_points"]
                },
                social: { 
                    type: Type.OBJECT, 
                    properties: { 
                        rating: { type: Type.STRING, description: "High / Medium / Low (overall social performance)." }, 
                        key_points: { type: Type.ARRAY, items: { type: Type.STRING } } 
                    },
                    required: ["rating", "key_points"]
                },
                governance_economic: { 
                    type: Type.OBJECT, 
                    properties: { 
                        rating: { type: Type.STRING, description: "High / Medium / Low (overall governance & economic performance)." }, 
                        key_points: { type: Type.ARRAY, items: { type: Type.STRING } } 
                    },
                    required: ["rating", "key_points"]
                }
            },
            required: ["environmental", "social", "governance_economic"]
        },
        options_and_recommendation: {
            type: Type.OBJECT,
            properties: {
                option_summaries: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            option_name: { type: Type.STRING },
                            description: { type: Type.STRING },
                            csr_implications: {
                                type: Type.OBJECT,
                                properties: {
                                    environmental: { type: Type.STRING },
                                    social: { type: Type.STRING },
                                    governance_economic: { type: Type.STRING }
                                },
                                required: ["environmental", "social", "governance_economic"]
                            }
                        },
                         required: ["option_name", "description", "csr_implications"]
                    }
                },
                recommended_option: {
                    type: Type.OBJECT,
                    properties: {
                        option_name: { type: Type.STRING },
                        csr_rationale: { type: Type.STRING }
                    },
                    required: ["option_name", "csr_rationale"]
                }
            },
            required: ["option_summaries", "recommended_option"]
        }
    },
    required: ["scenario_summary", "assumptions", "personas", "csr_assessment", "options_and_recommendation"]
};

export const runCouncilDebate = async (scenario: string, type: string): Promise<CouncilResponse> => {
  try {
    const userPrompt = `Scenario Type: ${type}\n\nScenario Description: ${scenario}`;
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userPrompt,
        config: {
            systemInstruction: systemPrompt,
            responseMimeType: "application/json",
            responseSchema: responseSchema,
        },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as CouncilResponse;
  } catch (error) {
    console.error("Error running council debate:", error);
    throw new Error("Failed to get a response from the AI council. Please check your API key and try again.");
  }
};

export const getChatbotResponse = async (history: {role: string, parts: string}[], message: string): Promise<string> => {
    const chatbotSystemPrompt = `You are a helpful assistant for the "Sustainability Council" web app. Your role is to answer user questions about how to use the app.
    Keep your answers concise and friendly. You can answer questions about:
    - How to write a good scenario (it should be specific and include context).
    - What each expert persona focuses on (e.g., the Climate Scientist cares about emissions, the Community Rep cares about local jobs).
    - How to interpret the CSR assessment (it's a summary of Environmental, Social, and Governance/Economic impacts).
    Do not answer questions outside of this scope.`;

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: chatbotSystemPrompt,
      },
    });

    try {
      const response = await chat.sendMessage({ message });
      return response.text;
    } catch (error) {
        console.error("Chatbot API error:", error);
        return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
    }
};
