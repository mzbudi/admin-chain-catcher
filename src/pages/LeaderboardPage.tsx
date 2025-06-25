import { useState, useEffect } from "react";
import { useLinera } from "../Provider/LineraWebClientProvider";
import { OWNER_CHAIN_ID } from "../constants";

export default function LeaderboardModal() {
  const [leaderboard, setLeaderboard] = useState<
    { chainId: string; name: string; score: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const { client, application } = useLinera();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(leaderboard.length / itemsPerPage);
  const paginatedLeaderboard = leaderboard.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const medals = ["🥇", "🥈", "🥉"];

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      if (application && client) {
        try {
          // Sync Leaderboard to own chain
          const syncLeaderboard = await application.query(
            JSON.stringify({
              query: `
                mutation OperationMutationRoot($centralChainId: ChainId!) {
                    requestLeaderboard(centralChainId: $centralChainId)
                }`,
              variables: {
                centralChainId: OWNER_CHAIN_ID,
              },
            })
          );

          console.log("Leaderboard sync response:", syncLeaderboard);

          // wait 3 seconds for sync to complete
          await new Promise((resolve) => setTimeout(resolve, 3000));

          const response = await application.query(
            JSON.stringify({
              query: `
                query QueryRoot {
                    getLeaderboard {
                    chainId
                    name
                    score
                    }
                }`,
            })
          );

          console.log("Scores retrieved successfully:", response);
          const result = JSON.parse(response);
          setLeaderboard(result.data.getLeaderboard || []);
        } catch (error) {
          console.error("Error retrieving scores:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchLeaderboard();
  }, [application, client]);
  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-4">Leaderboard</h2>
      <ol className="space-y-2 max-h-64 overflow-y-auto pr-2 divide-y divide-gray-100">
        {loading ? (
          <div className="flex items-center justify-center space-x-4">
            <span className="text-lg font-semibold">Loading...</span>
            <svg
              className="animate-spin h-5 w-5 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                fill="none"
                strokeWidth="4"
                stroke="currentColor"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          </div>
        ) : paginatedLeaderboard.length > 0 ? (
          paginatedLeaderboard.map((entry, index) => {
            const rankColors = [
              "text-yellow-500",
              "text-gray-400",
              "text-orange-500",
            ];
            const rankColor = rankColors[index] || "text-gray-700";

            return (
              <li key={entry.name} className="flex justify-between pt-2">
                <span className={rankColor}>
                  {medals[index] || (
                    <span className="font-bold">{index + 1}</span>
                  )}{" "}
                  {entry.name}
                </span>
                <span className="text-gray-600">{entry.score}</span>
              </li>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No data yet.</p>
        )}
      </ol>
      {paginatedLeaderboard.length > 0 && (
        <div className="mt-4 flex justify-center space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 py-1">
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
