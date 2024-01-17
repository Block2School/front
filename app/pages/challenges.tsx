import axios from "axios";

import { serverURL } from "../utils/globals";
import React, { useEffect, useState, useContext, useRef } from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { useDisclosure, Text, Table, Td, Th, Tr, Box, Tooltip } from "@chakra-ui/react";
import CustomButton from "../components/button/button";
import { LanguageContext } from "../components/LanguageSwitcher/language";
import Link from "next/link";
import CustomButtonRef from "../components/button/buttonRef";

export default function Challenges() {
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [leaderboard, setLeaderboard] = useState<[
    {
      username: string,
      points?: number,
      rank?: number,
      user_uuid: string
    }
  ]>([{ username: '', points: undefined, rank: undefined, user_uuid: '' }]);
  const [userRank, setUserRank] = useState<
    {
      username: string,
      points?: number,
      rank?: number,
      user_uuid: string
    }
  >({ username: '', points: undefined, rank: undefined, user_uuid: '' });

  const { dictionary } = useContext(LanguageContext);

  const roomID = getRandomInt(100000, 999999);
  const [uuid, setUuid] = useState("");

  async function fetchProfile() {
    let res = await axios.get(`${serverURL}:8080/user/profile`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      })
      if (res.status === 200) {
        setUuid(res.data.uuid)
      }
  }

  function createRoom() {
    if (uuid != "") {
      axios.post(`${serverURL}:8080/challenges/createRoom/` + roomID + `/` + uuid, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }).then((res) => {
        });
    }
  }

  const checkConnection = () => {
    if (sessionStorage.getItem('token')) {
      createRoom();
      return true;
    } else {
      return false;
    }
  }

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
    fetchProfile()
  }, [])

  useEffect(() => {
    axios.get(`${serverURL}:8080/challenges/leaderboard`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(res => {
      let rawLeaderboard = res.data;
      let formatedLeaderboard: any = rawLeaderboard.map((user: { username: any; points: any; rank: any; user_uuid: any; }) => {
        return {
          username: user.username,
          points: user.points,
          rank: user.rank,
          user_uuid: user.user_uuid
        }
      });
      setLeaderboard(formatedLeaderboard);

      setTimeout(() => { setIsLoading(false);}, 500);
    })
  }, []);

  useEffect(() => {
    axios.get(`${serverURL}:8080/challenges/leaderboard/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    }).then(res => {
      let rawUserRank = res.data;
      let formatedUserRank = {
        username: rawUserRank?.username,
        points: rawUserRank?.points,
        rank: rawUserRank?.rank,
        user_uuid: rawUserRank?.user_uuid
      };
      setUserRank(formatedUserRank);

      setTimeout(() => { setIsLoading(false); }, 500);
    })
  }, [])

  return (
    <>
      <Navbar />
      <div style={{ minHeight: "80vh" }}>
        <div style={{ textAlign: "center", marginTop: "2%" }}>
          <Text
            fontSize="4xl"
            fontWeight="bold"
          >
            {dictionary.challenges_page.page_leaderboard_title}
          </Text>
        </div>
        <Box
          width="60%"
          height="43vh"
          maxHeight="50vh"
          maxH="30%"
          margin="auto"
          marginTop="2%"
          padding="10px"
          borderRadius="5px"
          boxShadow="0px 1px 5px 0px rgba(0,0,0,0.3)"
          overflowY="auto"
        >
          <Table>
            <thead>
              <Tr>
                <Th>{dictionary.challenges_page.leaderboard_rank}</Th>
                <Th>{dictionary.challenges_page.leaderboard_username}</Th>
                <Th>{dictionary.challenges_page.leaderboard_points}</Th>
              </Tr>
            </thead>
            <tbody>
              {leaderboard.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.rank}</Td>
                  <Td>{item.username}</Td>
                  <Td>{item.points}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Box>
        <div style={{ textAlign: "center", marginTop: "2%" }}>
          <Text
            fontSize={"xl"}
            fontWeight="bold"
          >
            {dictionary.challenges_page.leaderboard_your_rank} {(userRank.rank != -99) ? userRank.rank : dictionary.challenges_page.user_unranked}
          </Text>
        </div>
        <div style={{ textAlign: "center", marginTop: "2%" }}>
          <Tooltip
            label={dictionary.challenges_page.challenges_tooltip}
            isDisabled={isConnected}
            shouldWrapChildren
            placement="top"
            hasArrow
          >
            <Link href="/challenge"
              passHref
            >
              <CustomButtonRef
                name={dictionary.challenges_page.leaderboard_start_challenge_button}
                id="upload"
                size={"lg"}
                variant={"success"}
                borderRadius={"2%"}
                categoryGA={"Start Challenge"}
                labelGA={"Start Challenge Button"}
                key={"Start Challenge Button"}
                onClick={() => { checkConnection() }}
                disabled={!isConnected}
                gap={undefined}
                srcImg={undefined}
                alt={undefined}
                hImg={undefined}
                wImg={undefined}
              />
            </Link>
          </Tooltip>
        </div>
        <div style={{ textAlign: "center", marginTop: "2%", marginBottom: "2%" }}>
          <Tooltip
            label={dictionary.challenges_page.challenges_tooltip}
            isDisabled={isConnected}
            shouldWrapChildren
            placement="top"
            hasArrow
          >
            <Link href="/challengesTemp/[roomID]/[uuid]" as={`/challengesTemp/${roomID}/${uuid}`} passHref>
              <CustomButtonRef
                name={dictionary.challenges_page.leaderboard_start_challenge_button_friends}
                id="upload"
                size={"lg"}
                variant={"success"}
                borderRadius={"2%"}
                categoryGA={"Start Challenge"}
                labelGA={"Start Challenge Button"}
                key={"Start Challenge Button"}
                onClick={() => { checkConnection() }}
                disabled={!isConnected}
                gap={undefined}
                srcImg={undefined}
                alt={undefined}
                hImg={undefined}
                wImg={undefined}
              />
            </Link>
          </Tooltip>
        </div>
      </div>
      <Footer />
    </>
  );

}