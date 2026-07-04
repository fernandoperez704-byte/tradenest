import { GABY_CORE_PROMPT } from "@/lib/gaby/core/gabyCore";
import { SIMULATOR_IDENTITY } from "./simulatorIdentity";
import { QUESTION_RULES } from "./questionRules";
import { SAFETY_RULES } from "./safetyRules";
import { RESPONSE_STYLE_RULES } from "./responseStyleRules";
import { CONVERSATION_RULES } from "./conversationRules";
import { PATTERN_RULES } from "./patternRules";
import { MARKET_ANALYSIS_RULES } from "./marketAnalysisRules";
import { COACHING_RULES } from "./coachingRules";
import { MARKET_CONVICTION_RULES } from "./marketConvictionRules";
import { tradenestxKnowledge } from "../core/tradenestxKnowledge";
import { MARGIN_RULES } from "./marginRules";


export const SIMULATOR_PROMPT = `
${GABY_CORE_PROMPT}

${SIMULATOR_IDENTITY}

${tradenestxKnowledge}

${QUESTION_RULES}

${SAFETY_RULES}

${RESPONSE_STYLE_RULES}

${CONVERSATION_RULES}

${PATTERN_RULES}

${MARKET_ANALYSIS_RULES}

${COACHING_RULES}

${MARKET_CONVICTION_RULES}

${MARGIN_RULES}




`;
 