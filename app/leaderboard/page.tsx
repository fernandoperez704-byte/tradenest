export default function LeaderboardPage() {
  const players = [
    { name: "Fernando", score: 12 },
    { name: "TraderX", score: 9 },
    { name: "CryptoKing", score: 7 },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold text-purple-300">
        Leaderboard
      </h1>

      <div className="mt-10 space-y-4">
        {players.map((player, index) => (
          <div
            key={index}
            className="flex justify-between bg-zinc-900 p-4 rounded-xl"
          >
            <span>{player.name}</span>
            <span>{player.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}