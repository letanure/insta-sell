import Head from "next/head";
import Image from "next/image";
import { Box } from "@chakra-ui/react";

import Sidebar from "../../components/Sidebar";
import AccountsList from "../../components/AccountsList";

export default function Home() {
  return (
    <Box width="100%">
      {/* <Header /> */}
      <Sidebar>
        <AccountsList />
      </Sidebar>
    </Box>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
    },
  };
}
