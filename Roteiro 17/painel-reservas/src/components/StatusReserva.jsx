export default function StatusReserva({ status }) {
  return <span className={`status status--${status.replaceAll(" ", "-")}`}>{status}</span>;
}
