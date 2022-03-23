import { GetServerSideProps } from "next";
import { DiscordUser } from "../../utils/types";
import { parseUser } from "../../utils/parse-user";
import axios from 'axios';

const logoutRoute = './api/logout';

const logoutRequest = () => axios.get(logoutRoute);

async function handleLogoutClick() {
  return await logoutRequest();
}

interface Props {
  user: DiscordUser;
}

export default function Index(props: Props) {
  return (
    <h1>
        Hey, {props.user.username}#{props.user.discriminator} 
        <h2>
            ID:{props.user.id}
            <button onClick={logoutRequest}>
              {('logout')}
            </button>
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
