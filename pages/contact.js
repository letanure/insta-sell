import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Box } from "@chakra-ui/react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <Box width="100%">
      <Header />
      <Contact />
      <Footer />
    </Box>
  );
}
