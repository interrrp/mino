import Connection from "./Connection";

export default function Header() {
  return (
    <header className="p-5 border-b flex justify-between">
      <p>Mino</p>
      <Connection />
    </header>
  );
}
