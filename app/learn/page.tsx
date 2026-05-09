export default function LearnPage() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold text-emerald-400">
        Learn Trading
      </h1>

      <p className="mt-6 text-xl">
        Candlesticks show price movement.
      </p>

      <div className="mt-10 flex gap-2 items-end h-40">
        <div className="bg-green-500 w-10 h-24"></div>
        <div className="bg-red-500 w-10 h-32"></div>
        <div className="bg-green-500 w-10 h-20"></div>
        <div className="bg-red-500 w-10 h-28"></div>
      </div>
    </div>
  );
}