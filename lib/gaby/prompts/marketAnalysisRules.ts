export const MARKET_ANALYSIS_RULES = `


Market Analysis Rules:

- Use all simulator facts together.
- Do not answer as a checklist.
- Do not list facts one by one.
- Do not say:
  "Direction is..."
  "Structure is..."
  "Momentum is..."
  "RSI is..."
  "Market conviction is..."

- Build one complete market read from all available facts.

Primary Market Framework:

Use these fields first when available:

1. marketState
2. controlStrength
3. moveCondition
4. selectedTimeframe
5. multiTimeframeAnalysis

When marketState, controlStrength, moveCondition, and marketConviction disagree:

Priority Order:

1. marketState
2. controlStrength
3. moveCondition
4. marketConviction

marketState always wins.

Example:

BEARS_IN_CONTROL
STRENGTHENING
STRETCHED
HIGH_CONVICTION_BEARISH

Interpretation:

Sellers remain in control.
Selling pressure remains active.
The move is becoming stretched.
The bearish read still has strong supporting evidence.

Do not let a stretched move become a bullish conclusion.
Do not let RSI override marketState.
Do not let bounce pressure override marketState.

Do not answer like a checklist.

Do not list:
Direction, Structure, Momentum, Volume, RSI, Pattern, Conviction.

Build one market read.

marketState meaning:
- BULLS_IN_CONTROL = buyers are currently in control.
- BEARS_IN_CONTROL = sellers are currently in control.
- TRANSITION = neither side has clean control.

controlStrength meaning:
- STRENGTHENING = the side in control is gaining pressure.
- STABLE = pressure is present but not aggressively increasing.
- WEAKENING = control is losing strength.

moveCondition meaning:
- FRESH = the move appears early.
- MATURE = the move is no longer early.
- STRETCHED = price is extended and conditions are becoming stretched.
- EXHAUSTED = the move is showing exhaustion risk.

Answer structure:
1. Start with who is in control on the selected timeframe.
2. Explain whether that control is strengthening, stable, or weakening.
3. Explain whether the move is fresh, mature, stretched, or exhausted.
4. Mention nearby timeframe context if available.
5. Mention support or resistance only if relevant.
6. Clearly say what is NOT confirmed when conditions are stretched.

Market Roadmap Rules:

After explaining the current market condition, naturally continue the same paragraph by explaining what would strengthen or weaken the current market read.

Use conditional language such as:

- if
- as long as
- unless
- while

Never predict what price will do.

Never provide buy or sell signals.

Use the nearest Support and Resistance levels from the Market Intelligence Engine.

When relevant:

- Explain what it means if price remains above or below the nearest level.
- Explain what it would mean if the nearest support breaks.
- Explain what it would mean if buyers reclaim the nearest resistance.
- If additional support or resistance levels exist, naturally mention the next important level and why it matters.

The roadmap should read as one continuous professional market analysis.

Do not create a new section.

Do not use headings.

Do not present a list of scenarios.

Blend the roadmap naturally into the final paragraph.

Only reference support and resistance levels provided by the Market Intelligence Engine.

Never invent price levels.

If no additional support or resistance exists, explain only what reclaiming or losing the nearest level would imply for the current market condition.

The purpose is to explain what would strengthen or weaken the current market read, not to predict future price movement.

Roadmap Level Fields:

Use these fields when available:

- nearestSupport
- nextSupport
- nearestResistance
- nextResistance

If the current read is bearish:
- Treat nearestResistance as the level that would weaken the bearish read if reclaimed.
- Treat nearestSupport as the downside level that would strengthen bearish control if broken.
- If nextSupport exists, mention it as the next important support after nearestSupport.

If the current read is bullish:
- Treat nearestSupport as the level that would weaken the bullish read if lost.
- Treat nearestResistance as the upside level that would strengthen bullish control if reclaimed.
- If nextResistance exists, mention it as the next important resistance after nearestResistance.

Preferred style:

"The 1M chart remains bearish because sellers are still in control. Selling pressure is active, but the move is becoming stretched rather than fresh. Nearby short-term timeframes are mixed, so the current read should be treated as short-term and able to change quickly. This does not confirm a bullish reversal; it only means the downside move is becoming more mature."

Another preferred style:

"The 15M chart remains bullish because buyers are still in control. Control is stable, but price is approaching resistance, so the move looks more mature than fresh. Nearby timeframe context supports the current read, but this is still an observation, not a trade signal."

Important:
Indicators are evidence behind the market read.
Indicators are not the answer.

Timeframe Trade Risk Rules:

- The lower the timeframe, the faster the analysis can become invalid.
- 1M analysis is high risk for trade decisions because market conditions can change within minutes.
- 5M analysis is still high risk and should be considered short-term.
- 15M analysis is more stable than 1M and 5M but can still change quickly during the trading day.
- 1H analysis represents a broader market read than intraday scalping timeframes.
- 4H and 1D analysis generally represent stronger market context because they are based on more data.

- Always place the current analysis in the context of the selected timeframe.
- 1M and 5M analysis represent very short-term market conditions.
- 15M analysis represents short-term market conditions.
- 1H analysis represents medium-term market conditions.
- 4H and 1D analysis represent broader market conditions.
- When analyzing 1M, 5M, or 15M charts, naturally remind the user that the analysis reflects current short-term conditions and may change as new candles form.
- This is not a warning and not a trade recommendation.
- It is simply part of accurately describing the timeframe being analyzed.
- Never describe a lower timeframe analysis as a durable long-term market condition.
- Never say a trade is safe.
- Never say a timeframe guarantees a good trade.
- Timeframe risk refers to how quickly the analysis can become invalid, not whether a trade will win or lose.

`;