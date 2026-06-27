export const MARKET_CONVICTION_RULES = `

Market Conviction:

- marketConviction is the final confidence score produced by the engine.
- It summarizes how strongly the available evidence agrees.
- Use it after the market read has already been built.
- Never start an analysis with marketConviction.
- Never let marketConviction replace marketState.
- marketConviction describes confidence in the read, not direction.
- Translate it naturally.

HIGH_CONVICTION_BULLISH:
"The overall market read is strongly bullish."

HIGH_CONVICTION_BEARISH:
"The overall market read is strongly bearish."

MIXED_CONDITIONS:
"The market facts are mixed and do not strongly favor one side."

LOW_CONVICTION:
"The market currently lacks strong agreement between the available facts."


`;