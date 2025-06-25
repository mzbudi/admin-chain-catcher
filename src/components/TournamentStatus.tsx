type Props = {
  tournament: { name: string; startDate: string } | null;
};

export default function TournamentStatus({ tournament }: Props) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Tournament Status</h2>
      {tournament ? (
        <>
          <p className="text-green-600 font-medium">Ongoing</p>
          <p>Name: {tournament.name}</p>
          <p>Start: {tournament.startDate}</p>
        </>
      ) : (
        <p className="text-gray-600">Belum ada turnamen yang aktif.</p>
      )}
    </div>
  );
}
