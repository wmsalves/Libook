import { useAuth } from "../hooks/useAuth";
import { useSetBookStatus } from "../services/books";
import { ReadingStatus } from "../types";

interface BookStatusSelectorProps {
  bookId: string;
}

export function BookStatusSelector({ bookId }: BookStatusSelectorProps) {
  const { userStatuses } = useAuth();
  const { mutate: setStatus, isPending } = useSetBookStatus();

  const currentStatus = userStatuses[bookId] || "NONE";

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = event.target.value as ReadingStatus;
    setStatus({ bookId, status: newStatus });
  }

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      disabled={isPending}
      className="w-full mt-2 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <option value="NONE" disabled>
        Adicionar à lista...
      </option>
      <option value={ReadingStatus.WANT_TO_READ}>Quero Ler</option>
      <option value={ReadingStatus.READING}>Lendo</option>
      <option value={ReadingStatus.READ}>Lido</option>
    </select>
  );
}
