type Props = {
  onCreate: (tournament: { name: string; startDate: string }) => void;
};

export default function CreateTournamentForm({ onCreate }: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const name = (form.elements.namedItem("name") as HTMLInputElement)
          .value;
        onCreate({
          name,
          startDate: new Date().toLocaleString(),
        });
        form.reset();
      }}
      className="bg-white p-6 rounded shadow space-y-4"
    >
      <h2 className="text-xl font-semibold">Create New Tournament</h2>
      <input
        type="text"
        name="name"
        placeholder="Nama Turnamen"
        className="w-full border rounded p-2"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Tournament
      </button>
    </form>
  );
}
