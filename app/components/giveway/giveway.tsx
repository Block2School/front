import { Box, Button, Input, Select, Table, Td, Text, Th, Tr } from "@chakra-ui/react";
import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import axios from "axios";
import { serverURL } from "../../utils/globals";
import MyEditor from "../editor/monacoEditor";
import MarkdownRenderer from "../markdown/markdown";
import { LanguageContext } from "../LanguageSwitcher/language";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import VAULT_INTERFACE2 from '../../config/abi/vault2.json';

export default function Giveway() {

  const { dictionary } = useContext(LanguageContext);
  const [leaderboard, setLeaderboard] = useState<[
    {
      username: string,
      wallet_adress: string,
      points?: number,
      rank?: number,
      user_uuid: string
    }
  ]>([{ username: '', wallet_adress: '', points: undefined, rank: undefined, user_uuid: '' }]);

  const { account, library, chainId, activate, deactivate, active } = useWeb3React<Web3Provider>();

  const givewayAction = async () => {
    const _provider = new ethers.providers.Web3Provider(library?.provider);
    const signer = await _provider.getSigner();
    const _contract = new ethers.Contract('0x118d967aB149de6aE0E461f74Da40aD1322fFb8d', VAULT_INTERFACE2, signer)
    let amount: string[] = [];
    let first_amount = 10;
    let adresses: Array<string> = [];
    leaderboard?.map(value => {
      if (value.wallet_adress == '')
        return;
      amount.push(ethers.utils.parseEther(first_amount.toString()).toString())
      adresses.push(value.wallet_adress);
      first_amount -= 1
    })
    try {
      const tx = await _contract.monthlyGiveaway(amount, adresses)
      await tx.wait();
    } catch (error) {
      console.log('error giveway: ', error)
    }
  }

  useEffect(() => {
    console.log('HI IM HERE')
    axios.get(`${serverURL}:8080/challenges/leaderboard/top_10_monthly`, {
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
          wallet_adress: user.username,
          points: user.points,
          rank: user.rank,
          user_uuid: user.user_uuid
        }
      });
      console.log('formatedLeaderboard: ', formatedLeaderboard);
      setLeaderboard(formatedLeaderboard);

      console.log('leaderboard1: ', res.data.data);
    })
  }, []);


  return (
    <>
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
      <Button onClick={givewayAction}>
          Giveway
      </Button>
    </>
  );
}
