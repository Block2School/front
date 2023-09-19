import axios from "axios";

import { serverURL } from "../utils/globals";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { useDisclosure, Text, Table, Td, Th, Tr, Box } from "@chakra-ui/react";

export default function Challenges() {
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<[
    {
      username: string,
      points: number,
      rank: number,
      user_uuid: string
    }
  ]>([{ username: '', points: 0, rank: 0, user_uuid: '' }]);
  const [userRank, setUserRank] = useState<
    {
      username: string,
      points: number,
      rank: number,
      user_uuid: string
    }
  >({ username: '', points: 0, rank: 0, user_uuid: '' });

  useEffect(() => {
    console.log('HI IM HERE [CHALLENGE_USE_EFFECT]')
    axios.get(`${serverURL}:8080/challenges/leaderboard`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(res => {
      let rawLeaderboard = res.data;
      console.log('RES.DATA: ', res.data);
      console.log('rawLeaderboard: ', rawLeaderboard);
      let formatedLeaderboard: any = rawLeaderboard.map((user: { username: any; points: any; rank: any; user_uuid: any; }) => {
        return {
          username: user.username,
          points: user.points,
          rank: user.rank,
          user_uuid: user.user_uuid
        }
      });
      for (let idx = 4; idx < 20; idx++) {
        formatedLeaderboard.push({
          username: "User" + idx,
          points: idx,
          rank: idx,
          user_uuid: "uuid" + idx
        })
      }
      console.log('formatedLeaderboard: ', formatedLeaderboard);
      setLeaderboard(formatedLeaderboard);

      console.log('leaderboard1: ', res.data.data);
      setTimeout(() => { setIsLoading(false); console.log('leaderboard2: ', leaderboard) }, 500);
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
      console.log('RES.DATA: ', res.data);
      console.log('rawUserRank: ', rawUserRank);
      let formatedUserRank = {
        username: rawUserRank?.username,
        points: rawUserRank?.points,
        rank: rawUserRank?.rank,
        user_uuid: rawUserRank?.user_uuid
      };
      console.log('formatedUserRank: ', formatedUserRank);
      setUserRank(formatedUserRank);

      console.log('userRank1: ', res.data.data);
      setTimeout(() => { setIsLoading(false); console.log('userRank2: ', userRank) }, 500);
    })
  }, [])

  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh" }}>
        <div style={{ textAlign: "center", marginTop: "2%" }}>
          <Text fontSize="4xl" fontWeight="bold" color="black">Leaderboard</Text>
        </div>
        <Box
          width="60%"
          height="40vh"
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
                <Th>Rank</Th>
                <Th>Username</Th>
                <Th>Points</Th>
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
          <Text fontSize={"xl"} fontWeight="bold" color="black">Your rank: {userRank.rank}</Text>
        </div>
      </div>
      <Footer />
    </>
  );

}