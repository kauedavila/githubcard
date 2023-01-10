import { useEffect, useState } from "react";
export default function Card() {
  const logo = "/assets/logo.png";
  const [data, setData] = useState({});
  const [user, setUser] = useState("kauedavila");
  const [text, setText] = useState("");

  async function getInfos() {
    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getInfos().then((response) => setData(response));
  }, [user]);

  return (
    <div className="flex flex-col gap-4 py-4 items-center">
      <h1 className="text-white">Github User Data</h1>
      <div className="flex">
        <form>
          <input
            className="focus:outline-none p-1"
            type="text"
            placeholder="Digite o nome de usuário"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            value={text}
            className="bg-white border-2"
            onClick={(e) => {
              e.preventDefault();
              setUser(e.target.value);
            }}
          >
            Enviar
          </button>
        </form>
      </div>

      <div className="flex flex-col justify-between py-10 pl-4 bg-[#0E1218] border-black border-x-[1vw] border-y-[3vh] w-[30vw] h-[80vh] rounded-[50px] overflow-hidden">
        <span className="text-white text-3xl">{data.name}</span>

        <div className="grid grid-cols-1">
          <div className="flex justify-end row-start-1 row-end-3 col-[1] ">
            <img
              src={data.avatar_url}
              alt="Profile"
              className="relative left-10 rounded-full border-8 border-white"
            />
          </div>

          <div className="relative grid grid-cols-2 row-[2] col-[1]">
            <Infos data={data} />
          </div>
        </div>
        <div className="flex justify-end items-center gap-2 mr-4">
          <img src={logo} alt="Logo" className="aspect-square w-[3vw]" />
          <span className="text-white text-3xl">GitHub Card</span>
        </div>
      </div>
    </div>
  );
}

function Logo() {
  const logo = "/assets/logo.png";
  return (
    <div className="border-2 rounded-full aspect-square w-[5vw] flex justify-center items-center">
      <img src={logo} alt="Logo" className="aspect-square w-[3vw]" />
    </div>
  );
}

function Infos({ data }: any) {
  const infos = [
    { data: data?.followers, text: "Seguidores", icon: "followers.svg" },
    { data: data?.following, text: "Seguindo", icon: "following.svg" },
    { data: data?.public_repos, text: "Repositórios", icon: "repository.svg" },
  ];

  return (
    <div className="flex justify-center items-center rounded-3xl bg-black bg-opacity-80 py-5">
      <ul className="text-sm text-white">
        {infos.map((info, index) => (
          <li key={index} className="flex items-center gap-2">
            <img
              src={`/assets/${info.icon}`}
              alt={info.text}
              className="aspect-square w-[2vw]"
            />
            <span>{info.data}</span>
            <span>{info.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
