export default function NewsCard({
  title,
  summary,
  link,
  createdAt,
}) {
  const formatDate = (date) => {
    const d = new Date(date);

    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();

    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");

    return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
  };

  return (
    <div className="border rounded-xl p-4 mb-4">

      <h2 className="text-xl font-bold">
        {title}
      </h2>

      {/* DATE */}
      <p className="text-sm text-gray-400 mt-1">
        🕒 {formatDate(createdAt)}
      </p>

      {/* SUMMARY */}
      <p className="mt-2 text-gray-600">
        {summary}
      </p>

      {/* LINK */}
      <a
        href={link}
        target="_blank"
        className="text-blue-500 mt-3 block"
      >
        Đọc bài gốc →
      </a>

    </div>
  );
}