import TournamentStatus from "../components/TournamentStatus";
import CreateTournamentForm from "../components/CreateTournamentForm";
import StopTournamentButton from "../components/StopTournamentButton";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function DashboardPage() {
  const [activeTournament, setActiveTournament] = useState<null | {
    name: string;
    startDate: string;
  }>(null);

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Admin</h1>

      <TournamentStatus tournament={activeTournament} />

      {activeTournament ? (
        <StopTournamentButton onStop={() => setActiveTournament(null)} />
      ) : (
        <CreateTournamentForm
          onCreate={(tournament) => setActiveTournament(tournament)}
        />
      )}

      <div>
        <Link
          to="/leaderboard"
          className="text-blue-600 hover:underline inline-block mt-4"
        >
          🏆 Lihat Leaderboard →
        </Link>
      </div>
    </div>
  );
}
