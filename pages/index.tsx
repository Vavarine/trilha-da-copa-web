import { GetServerSideProps } from "next";
import { useAuth } from "../contexts/AuthContext";
import { parseCookies } from "nookies";
import { getSpotifyApi } from "../services/getSpotifyApi";
import { User } from "../global";

interface indexProps {
  user: User
}

export default function Index({user}: indexProps) {
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

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['guarapagym.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const { ["trilha.spotify_token"]: userStr } = parseCookies(ctx);
  const spotifyApi = getSpotifyApi(ctx)
  const user = await spotifyApi.get("me");

  return {
    props: {
      user: user,
    },
  };
};