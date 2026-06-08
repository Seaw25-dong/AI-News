export default function NewsCard({
  title,
  summary,
  link,
  createdAt,
  index = 0,
}) {
 const formatDate = (date) => {
  if (!date) return "";

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date(date));
};

  const darkCard = Number(index) % 2 !== 0;

  const gradients = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
    "from-green-500 to-emerald-500",
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <div
      className={`group flex flex-col sm:flex-row gap-4 rounded-[22px] p-3 sm:p-4 shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl overflow-hidden w-full max-w-[650px] ${
        darkCard ? "bg-[#18181b] text-white" : "bg-white text-black"
      }`}
    >
      {/* IMAGE */}
      <div
        className={`w-full sm:min-w-[140px] sm:w-[140px] h-[120px] sm:h-[140px] rounded-[18px] bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-3xl sm:text-4xl font-bold`}
      >
        AI
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1">
        {/* TITLE */}
        <h2 className="text-lg sm:text-xl font-bold leading-snug line-clamp-2">
          {title}
        </h2>

        {/* SUMMARY */}
        <p
          className={`mt-3 text-sm leading-6 line-clamp-2 flex-1 ${
            darkCard ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {summary}
        </p>

        {/* FOOTER */}
        <div className="flex items-center justify-between mt-4 gap-3">
          {/* AUTHOR */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              {title?.charAt(0) || "A"}
            </div>

            <div className="min-w-0">
              <p className="font-semibold text-xs truncate">
                AI Daily News
              </p>

              <p
                className={`text-[11px] ${
                  darkCard ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {formatDate(createdAt)}
              </p>
            </div>
          </div>

          {/* BUTTON */}
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm hover:scale-110 transition-all duration-300 flex-shrink-0"
          >
            →
          </a>
        </div>
      </div>
    </div>
  );
}