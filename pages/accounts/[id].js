import Head from "next/head";
import Image from "next/image";
import { Box } from "@chakra-ui/react";

import Sidebar from "../../components/Sidebar";
import AccountView from "../../components/AccountView";
import { useRouter } from "next/router";

export default function Home() {
  return (
    <Box width="100%">
      {/* <Header /> */}
      <Sidebar>
        <AccountView />
      </Sidebar>
    </Box>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      protected: true,
    },
  };
}
