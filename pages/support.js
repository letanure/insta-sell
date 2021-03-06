import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Box } from "@chakra-ui/react";

import Sidebar from "../components/Sidebar";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <Box width="100%">
      <Sidebar>
        <Contact />
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
