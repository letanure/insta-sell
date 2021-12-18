import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Box } from "@chakra-ui/react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import HowItWorks from "../components/HowItWorks";
import HowItWorksDetails from "../components/HowItWorksDetails";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <Box width="100%">
      <Header />
      <HowItWorks />
      <HowItWorksDetails />
      <Testimonials />
      <Footer />
    </Box>
  );
}
