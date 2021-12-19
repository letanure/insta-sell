import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Box } from "@chakra-ui/react";

import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <Box width="100%">
      {/* <Header /> */}
      <Sidebar>Settings</Sidebar>
    </Box>
  );
}
