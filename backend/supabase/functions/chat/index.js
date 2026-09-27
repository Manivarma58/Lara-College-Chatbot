import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

const COLLEGE_SYSTEM_PROMPT = `You are a helpful college enquiry chatbot for Vignan's Lara Institute of Technology and Sciences, Guntur, Andhra Pradesh.

You answer questions about:
- Admissions and courses (CSE, ECE, ME, CE, etc.)
- Campus facilities (labs, library, hostel, sports)
- Placements and internships
- Fee structure (guide them to contact the admissions office for exact figures)
- College events and clubs
- Faculty and departments

Be friendly, concise, and helpful. If you don't know something specific, suggest contacting the college office.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
        { role: "system", content: COLLEGE_SYSTEM_PROMPT },
        { role: "user", content: message }],

        max_tokens: 500
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I'm not sure how to answer that. Please contact the college office.";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ reply: "Sorry, something went wrong. Please try again." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});