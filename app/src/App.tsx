import axios from "axios";
import { useState } from "react";

const api_url = process.env.REACT_APP_URL;

interface Person {
  name: string;
  lastnameFather: string;
  lastnameMother: string;
  run: string;
  dv: string;
  career: string;
  graduationYear: string;
}

export const App = () => {

  const [data, setData] = useState({ message: "" });
  const [countData, setCount] = useState<{ count: number } | null>();
  const [newUserData, setNewUserData] = useState<Person>({
    name: "",
    lastnameFather: "",
    lastnameMother: "",
    run: "",
    dv: "",
    career: "",
    graduationYear: "0"
  });
  const [id, setId] = useState<string>("0");
  const [personId, setPersonId] = useState<string>();
  const [currentPerson, setCurrentPerson] = useState<Person>();

  const callHelloWorld = async () => {
    axios({
      method: "get",
      url: `${api_url}`,
      responseType: "json",
    }).then(function (response) {
      setData(response.data);
    });
  };

  const callPersonsCount = async () => {
    axios({
      method: "get",
      url: `${api_url}/persons/count`,
      responseType: "json",
    }).then(function (response) {
      setCount(response.data);
    });
  };

  const callAddPerson = async (
    { 
      name,
      lastnameFather,
      lastnameMother,
      run,
      dv,
      career,
      graduationYear
    } : Person) => {

    let url = `${api_url}/persons/add`;
    url += `?name=${name}`;
    url += `&lastnamefather=${lastnameFather}`;
    url += `&lastnamemother=${lastnameMother}`;
    url += `&run=${run}`;
    url += `&dv=${dv}`;
    url += `&career=${career}`;
    url += `&graduationYear=${graduationYear}`;

    axios({
      method: "get",
      url,
      responseType: "json",
    }).then(function (response) {
      if (!response.data.status) {
        alert (response.data.message);
      } else {
        setPersonId(response.data.person);
        callPersonsCount();
      }
    });
  };

  const callGetPerson = async (id: string) => {
    const url = `${api_url}/persons/get?id=${id}`;

    axios({
      method: "get",
      url,
      responseType: "json",
    }).then(function (response) {
      if(response.data.status) {
        setCurrentPerson(response.data);
      } else {
        alert(response.data.message);
      }

    });
  };

  return (
    <div>
      <div>
        <h2>Hello World Smart Contract</h2>
        {data && <h3>Respuesta: {data.message}</h3>}
        <button
          onClick={async (e) => {
            e.preventDefault();
            await callHelloWorld();
          }}
        >
          Call smart contract
        </button>
      </div>

      <hr />

      <div>
        <h2>Digital Identity Smart Contract</h2>
        {countData && countData.count && (
          <h3>Respuesta: {countData.count} persons</h3>
        )}
        <button
          onClick={async (e) => {
            e.preventDefault();
            await callPersonsCount();
          }}
        >
          Get persons count
        </button>

        <div
          style={{ border: "1px solid #000", marginTop: "1em", padding: "1em" }}
        >
          <h3>Create new person</h3>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) =>
              setNewUserData({ ...newUserData, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Lastname Father"
            onChange={(e) =>
              setNewUserData({ ...newUserData, lastnameFather: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Lastname Mother"
            onChange={(e) =>
              setNewUserData({ ...newUserData, lastnameMother: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="run"
            onChange={(e) =>
              setNewUserData({ ...newUserData, run: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="DV"
            onChange={(e) =>
              setNewUserData({ ...newUserData, dv: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="career"
            onChange={(e) =>
              setNewUserData({ ...newUserData, career: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Graduation Year"
            onChange={(e) =>
              setNewUserData({ ...newUserData, graduationYear: e.target.value })
            }
          />
          <button
            onClick={async (e) => {
              e.preventDefault();
              await callAddPerson(newUserData);
            }}
          >
            Add person
          </button>

          {personId && (
          <div>
            <p>
              <strong>UUID:</strong> {personId}
            </p>
          </div>
          )}
        </div>

        <hr />
        <div
          style={{ border: "1px solid #000", marginTop: "1em", padding: "1em" }}
        >
          <h3>Get person</h3>

          {currentPerson && (
            <div>
              <p>
                <strong>Name:</strong> {currentPerson.name}
              </p>
              <p>
                <strong>Lastname Father:</strong> {currentPerson.lastnameFather}
              </p>
              <p>
                <strong>Lastname Mother:</strong> {currentPerson.lastnameMother}
              </p>
              <p>
                <strong>Run:</strong> {currentPerson.run} - {currentPerson.dv}
              </p>
              <p>
                <strong>Career:</strong> {currentPerson.career}
              </p>
              <p>
                <strong>Graduation Year:</strong> {currentPerson.graduationYear}
              </p>
            </div>
          )}

          <input
            type="string"
            placeholder="ID"
            onChange={(e) => setId(e.target.value)}
          />
          <button
            onClick={async (e) => {
              e.preventDefault();
              await callGetPerson(id);
            }}
          >
            Get person
          </button>
        </div>
      </div>
    </div>
  );
};
