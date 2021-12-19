import { Box, Heading, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import "../services/firebase";
import { getAuth, signOut } from "firebase/auth";
import { useEffect } from "react";

export default function Success() {
  const auth = getAuth();
  useEffect(() => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.info("Sign-out successful.");
      })
      .catch((error) => {
        console.error(error);
        // An error happened.
      });
  });
  return (
    <Box textAlign="center" py={10} px={6} minH={"75vh"}>
      <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Logged out successfully!
      </Heading>
      <Text color={"gray.500"}>
        Click on the Sign In button to sign in again.
      </Text>
    </Box>
  );
}
