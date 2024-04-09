export default function Message({ username, message }: { username: string; message: string }) {
  return (
    <>
      <span className="text-zinc-500">{username}</span>: <span>{message}</span>
    </>
  );
}
