
const WAKE_WORD = /\b(?:gaby|gabby|gabi|gabbi)\b/i;

export type GabyVoiceResult =
  | { type: "WAKE" }
  | { type: "COMMAND"; command: string }
  | { type: "IGNORE" };

export class GabyVoiceProcessor {
  private waitingForCommandUntil = 0;

  process(text: string): GabyVoiceResult {
    const transcript = text.trim();

    if (!transcript) {
      return { type: "IGNORE" };
    }

    const wakeMatch = transcript.match(WAKE_WORD);

    if (wakeMatch) {
      const command = transcript
        .slice((wakeMatch.index ?? 0) + wakeMatch[0].length)
        .replace(/^[,\s.!?-]+/, "")
        .trim();

      if (command) {
        this.waitingForCommandUntil = 0;

        return {
          type: "COMMAND",
          command,
        };
      }

      // Allow 10 seconds for a follow-up command.
      this.waitingForCommandUntil = Date.now() + 10000;

      return { type: "WAKE" };
    }

    if (Date.now() < this.waitingForCommandUntil) {
      this.waitingForCommandUntil = 0;

      return {
        type: "COMMAND",
        command: transcript,
      };
    }

    return { type: "IGNORE" };
  }

  reset() {
    this.waitingForCommandUntil = 0;
  }
}
