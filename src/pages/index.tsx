import { GetServerSideProps } from "next";
import { DiscordUser } from "../utils/types";
import { parseUser } from "../utils/parse-user";
import { useRouter } from 'next/router'

interface Props {
  user: DiscordUser;
}

export default function Index(props: Props) {
  const router = useRouter()
  return (
    <h1>
      Hey, {props.user.username}#{props.user.discriminator}
      <h2>
        ID: {props.user.id}
        <h3>
          <button onClick={() => router.push('/api/logout')}>
            log out
          </button>
        </h3>
      </h2>
    </h1>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async function (ctx) {
  const user = parseUser(ctx);

  if (!user) {
    return {
      redirect: {
        destination: "/api/oauth",
        permanent: false,
      },
    };
  }

  return { props: { user } };
};
