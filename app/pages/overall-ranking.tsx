import Footer from '../components/footer/footer'
import Navbar from '../components/navbar/navbar'
import { useState } from 'react';

import { Table } from "react-chakra-pagination";

import {
  Flex,
  Avatar,
  Text,
  Box,
  Icon,
  Button,
  Heading
} from "@chakra-ui/react";

import { FiTrash2, FiUser } from "react-icons/fi";

type User = {
  id: number;
  name: string;
  total_score: number;
  avatar_url: string;
};

const users: User[] = [
  {
    id: 1,
    name: "Carlin Gwinn",
    total_score: 4567898765,
    avatar_url:
      "https://robohash.org/assumendanihilodio.png?size=50x50&set=set1"
  },
  {
    id: 2,
    name: "Yetta Snape",
    total_score: 12345678,
    avatar_url:
      "https://robohash.org/liberorationequasi.png?size=50x50&set=set1"
  },
  {
    id: 3,
    name: "Carlin Gwinn",
    total_score: 4567898765,
    avatar_url:
      "https://robohash.org/assumendanihilodio.png?size=50x50&set=set1"
  },
  {
    id: 4,
    name: "Yetta Snape",
    total_score: 12345678,
    avatar_url:
      "https://robohash.org/liberorationequasi.png?size=50x50&set=set1"
  },
  {
    id: 5,
    name: "Carlin Gwinn",
    total_score: 4567898765,
    avatar_url:
      "https://robohash.org/assumendanihilodio.png?size=50x50&set=set1"
  },
  {
    id: 6,
    name: "Yetta Snape",
    total_score: 12345678,
    avatar_url:
      "https://robohash.org/liberorationequasi.png?size=50x50&set=set1"
  },
  {
    id: 7,
    name: "Carlin Gwinn",
    total_score: 4567898765,
    avatar_url:
      "https://robohash.org/assumendanihilodio.png?size=50x50&set=set1"
  },
  {
    id: 8,
    name: "Yetta Snape",
    total_score: 12345678,
    avatar_url:
      "https://robohash.org/liberorationequasi.png?size=50x50&set=set1"
  },
  {
    id: 9,
    name: "Carlin Gwinn",
    total_score: 4567898765,
    avatar_url:
      "https://robohash.org/assumendanihilodio.png?size=50x50&set=set1"
  },
  {
    id: 10,
    name: "Yetta Snape",
    total_score: 12345678,
    avatar_url:
      "https://robohash.org/liberorationequasi.png?size=50x50&set=set1"
  },
  {
    id: 11,
    name: "Carlin Gwinn",
    total_score: 4567898765,
    avatar_url:
      "https://robohash.org/assumendanihilodio.png?size=50x50&set=set1"
  },
  {
    id: 12,
    name: "Yetta Snape",
    total_score: 12345678,
    avatar_url:
      "https://robohash.org/liberorationequasi.png?size=50x50&set=set1"
  },
  {
    id: 13,
    name: "Carlin Gwinn",
    total_score: 4567898765,
    avatar_url:
      "https://robohash.org/assumendanihilodio.png?size=50x50&set=set1"
  },
  {
    id: 14,
    name: "Yetta Snape",
    total_score: 12345678,
    avatar_url:
      "https://robohash.org/liberorationequasi.png?size=50x50&set=set1"
  },
];

export default function OverallRanking() {
  const [page, setPage] = useState(1);

  const tableData = users.map((user) => ({
    name: (
      <Flex align="center">
        <Avatar name={user.name} src={user.avatar_url} size="sm" mr="4" />
        <Text>{user.name}</Text>
      </Flex>
    ),
    total_score: user.total_score.toString(),
  }));

  const tableColumns = [
    {
      Header: "Name",
      accessor: "name" as const
    },
    {
      Header: "Total Score",
      accessor: "total_score" as const
    },
  ];

  return (
    <>
      <Navbar />
      <Box p="12">
        <Heading size="sm" as="h3">
          Overall Ranking
        </Heading>

        <Box mt="6">
          <Table
            colorScheme="blue"
            emptyData={{
              icon: FiUser,
              text: "Nobody is registered here."
            }}
            totalRegisters={users.length}
            page={page}
            onPageChange={(page) => setPage(page)}
            columns={tableColumns}
            data={tableData}
          />
        </Box>
      </Box>
      <Footer/>
    </>
  )
}
