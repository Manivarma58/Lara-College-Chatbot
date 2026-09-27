import { KNOWLEDGE_BASE } from "../data/collegeKnowledgeBase.js";

const COLLEGE_SYSTEM_PROMPT = `You are Lara, the expert AI College Assistant for Vignan's Lara Institute of Technology & Sciences (VLITS), Vadlamudi, Guntur, Andhra Pradesh.
Institutional Background:
- Counseling Code: LARA (for AP EAPCET / ICET / ECET)
- Established: 2007 by Vignan Group (Founder: Dr. Lavu Rathaiah, Principal: Dr. K. Phaneendra Kumar).
- Status: Autonomous institution, affiliated to JNTUK Kakinada, approved by AICTE, accredited by NAAC with 'A+' Grade, and NBA-accredited branches.
- B.Tech Programs & Intake: CSE (480), CSE-AI&ML (360), CSE-AI (300), ECE (420), CSE-Data Science (120), IT (120), EEE (120), Mechanical (120), Civil (60).
- PG Programs: MCA (180 seats), M.Tech (CSE, Power Electronics, Embedded Systems, Thermal Sciences).
- Placements: Highest package 44 LPA (Amazon/Product MNCs), 1200+ offers, average package 4.5 - 5.5 LPA. Top recruiters: Amazon, Cisco, Deloitte, Darwinbox, Zithara, ApXor, TCS, Infosys, Wipro, Cognizant, DXC, Accenture, Capgemini, HCL.
- Fees & Financial Aid: Convener Category A (₹70,000/year, eligible for full Jagananna Vidya Deevena JVD fee reimbursement). Management Category B (₹1.5L - ₹2.5L/year).
- Hostels & Amenities: Separate on-campus hostels for boys & girls, 2/3/4 sharing, hygienic dining hall, 24/7 power & Wi-Fi, medical clinic, 40,000+ volume central library, 50+ college buses covering Guntur, Tenali, Vijayawada, Mangalagiri, Repalle.
- Admissions: 70% Convener (AP EAPCET ranks), 30% Management Quota.

Guidelines:
- Provide accurate, warm, friendly, and structured responses in rich GitHub Markdown.
- Use bullet points, bold text, and clean formatting for easy reading.
- Always encourage students to explore further or contact the VLITS Admissions Office (0863-2381200).`;

/**
 * Searches the local college knowledge base for keywords.
 */
export function getKnowledgeBaseReply(message) {
  if (!message || typeof message !== "string") {
    return "I'm not sure how to answer that. Please contact the college office.";
  }

  const normalized = message.toLowerCase().trim();

  const hasKeyword = (text, keyword) => {
    const escaped = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`\\b${escaped}\\b`, "i");
    return regex.test(text);
  };

  for (const item of KNOWLEDGE_BASE) {
    if (item.keywords.some((keyword) => hasKeyword(normalized, keyword))) {
      return item.reply;
    }
  }

  // Fallback response with helpful categories
  return `I'm not sure I understand that question completely. 🤔

You can ask me about:
* **Courses** & departments offered
* **Placements** & recruiting companies
* **Hostel** & dining facilities
* **Fee** structure info
* Campus **Location** & bus routes
* **Facilities** (library, labs, sports grounds)
* **Events** & student fests

*For specific administrative inquiries, please contact the college admissions office directly.*`;
}

/**
 * Process a user message using AI if configured, otherwise using the knowledge base.
 */
export async function generateChatReply(message, conversationHistory = []) {
  const geminiApiKey = process.env.GEMINI_API_KEY || process.env.LOVABLE_API_KEY;

  if (geminiApiKey) {
    try {
      // Support Gemini REST API directly if key is configured
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;
      
      const contents = [
        {
          role: "user",
          parts: [{ text: `${COLLEGE_SYSTEM_PROMPT}\n\nUser Question: ${message}` }]
        }
      ];

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents })
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          return { reply, source: "ai" };
        }
      }
    } catch (err) {
      console.warn("AI generation encountered an error, falling back to knowledge base:", err.message);
    }
  }

  // Fast & reliable local knowledge base response
  const reply = getKnowledgeBaseReply(message);
  return { reply, source: "knowledge-base" };
}
