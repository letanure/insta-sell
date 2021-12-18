import { Box } from "@chakra-ui/react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import ForgotPassword from "../components/ForgotPassword";

export default function Home() {
  return (
    <Box width="100%">
      <Header />
      <ForgotPassword />
      <Footer />
    </Box>
  );
}
