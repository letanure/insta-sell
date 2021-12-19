import Head from "next/head";
import Image from "next/image";
import { Box } from "@chakra-ui/react";

import Sidebar from "../../components/Sidebar";
import AccountAdd from "../../components/AccountAdd";

export default function Home() {
  return (
    <Box width="100%">
      {/* <Header /> */}
      <Sidebar>
        <AccountAdd />
      </Sidebar>
    </Box>
  );
}
