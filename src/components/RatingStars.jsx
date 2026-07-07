export default function RatingStars({ rating, onRate }) {
  return (
    <div className="flex gap-1.5 text-2xl">
      {[1, 2, 3, 4, 5].map((v) => (
        <button
          key={v}
          onClick={() => onRate(v)}
          className={`transition hover:scale-110 ${
            v <= (rating || 0)
              ? "text-orange-500"
              : "text-neutral-300 dark:text-neutral-700"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
