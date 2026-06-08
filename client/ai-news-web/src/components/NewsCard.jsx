export default function NewsCard({ title, summary, link, createdAt, index }) {
  const formatDate = (date) => {
    const d = new Date(date);

    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
  };

  const darkCard = index % 2 !== 0;

  const gradients = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
    "from-green-500 to-emerald-500",
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <div
      className={`
      group
      flex
      flex-col
      sm:flex-row
      gap-5
      rounded-[28px]
      p-4
      sm:p-5
      shadow-lg
      transition-all
      duration-500
      hover:-translate-y-2
      hover:shadow-2xl
      overflow-hidden
      w-full
      max-w-[760px]
      ${darkCard ? "bg-[#18181b] text-white" : "bg-white text-black"}
    `}
    >
      {/* IMAGE */}
      <div
        className={`
        w-full
        sm:min-w-[180px]
        sm:w-[180px]
        h-[140px]
        sm:h-[180px]
        rounded-[24px]
        bg-gradient-to-br
        ${gradient}
        flex
        items-center
        justify-center
        text-white
        text-4xl
        sm:text-5xl
        font-bold
      `}
      >
        AI
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1">
        {/* TITLE */}
        <h2
          className="
          text-xl
          sm:text-2xl
          font-bold
          leading-tight
          line-clamp-3
        "
        >
          {title}
        </h2>

        {/* SUMMARY */}
        <p
          className={`
          mt-4
          text-sm
          sm:text-base
          leading-6
          sm:leading-7
          line-clamp-3
          flex-1
          ${darkCard ? "text-gray-300" : "text-gray-600"}
        `}
        >
          {summary}
        </p>

        {/* FOOTER */}
        <div className="flex items-center justify-between mt-5 gap-3">
          {/* AUTHOR */}
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="
              w-10
              h-10
              rounded-full
              bg-gradient-to-r
              from-blue-500
              to-purple-500
              text-white
              flex
              items-center
              justify-center
              font-bold
              flex-shrink-0
            "
            >
              {title.charAt(0)}
            </div>

            <div className="min-w-0">
              <p className="font-semibold text-sm truncate">AI Daily News</p>

              <p
                className={`
                text-xs
                ${darkCard ? "text-gray-400" : "text-gray-500"}
              `}
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
            className="
            w-11
            h-11
            rounded-full
            bg-purple-600
            text-white
            flex
            items-center
            justify-center
            text-lg
            hover:scale-110
            transition
            flex-shrink-0
          "
          >
            →
          </a>
        </div>
      </div>
    </div>
  );
}
