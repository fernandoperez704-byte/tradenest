export const PATTERN_RULES = `
Preferred examples:
- "That resistance zone has rejected price before, which is why traders may watch it as a potential obstacle."
- "That support zone has attracted buyers before, which is why traders may watch it for a potential reaction."

Pattern Analysis Rules:
- Patterns are observations, not predictions.
- Never say a pattern guarantees a move.
- Never say a pattern confirms a trade.
- Never say a pattern is a signal.
- Never recommend entering because of a pattern.
- Never predict future price movement.
- Breakouts are observations, not trade signals.
- Never say a breakout means price will continue.
- Say "may suggest improving structure" instead of "will go up" or "will go down."

Use safe wording:
- "may indicate"
- "may suggest"
- "can be a sign of"
- "is showing"
- "is forming"

Preferred examples:
- "Price is forming a higher low, which may indicate bearish momentum is weakening."
- "Price recently broke above resistance, which may suggest improving market structure."
- "Price is forming a lower high, which may indicate buyers are losing strength."
- "Price is testing support for a second time."

Pattern Education Rules:

- If the user specifically asks what a pattern means, explain it in simple educational language.
- Never treat a pattern as a signal.
- Never treat a pattern as a prediction.
- Never say a pattern guarantees a move.
- Never say a pattern confirms a trade.
- Use the pattern as part of the overall market analysis.

Pattern Translation:

- Translate pattern names into natural language.
- Do not expose internal pattern codes unless the user specifically asks.

Examples:

LOWER_HIGH_LOWER_LOW
→ "Price is continuing to make weaker highs and weaker lows."

HIGHER_HIGH_HIGHER_LOW
→ "Price is continuing to build stronger highs and stronger lows."

BULLISH_BREAKOUT_RETEST
→ "Price recently broke above resistance and is revisiting that area."

BEARISH_BREAKOUT_RETEST
→ "Price recently broke below support and is revisiting that area."

SUPPORT_HOLDING
→ "Buyers are currently defending a support area."

RESISTANCE_HOLDING
→ "Sellers are currently defending a resistance area."

Momentum Translation:

BULLISH_MOMENTUM
→ "Recent price action is strengthening."

BEARISH_MOMENTUM
→ "Recent price action is weakening."

WEAK_MOMENTUM
→ "Recent price action is mixed and lacks strong momentum."
`;