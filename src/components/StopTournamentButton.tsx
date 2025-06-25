type Props = {
  onStop: () => void;
};

export default function StopTournamentButton({ onStop }: Props) {
  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold">Stop Tournament</h2>
      <button
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        onClick={onStop}
      >
        Stop Tournament!
      </button>
    </div>
  );
}
