import { useAuth } from "../contexts/AuthContext";

export default function Index() {
  const { user } = useAuth();
  return (
    <div>
      {user ? (
        <div>
          <h1>Olá {user.display_name}</h1>
          {/* <Image src={user.images[0].url} width={200} height={200} /> */}
        </div>
      ) : (
        <h1>Olá, faça login com o spotify</h1>
      )}
      <h1>Home</h1>
    </div>
  );
}
