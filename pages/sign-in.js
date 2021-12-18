import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Box } from "@chakra-ui/react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import SignIn from "../components/SignIn";

export default function Home() {
  return (
    <Box width="100%">
      <Header />
      <SignIn />
      <Footer />
    </Box>
  );
}
