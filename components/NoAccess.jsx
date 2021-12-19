import { Box, Button, Heading, Link, Text } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";

export default function Warning() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <WarningTwoIcon boxSize={"50px"} color={"orange.300"} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Access Denied
      </Heading>
      <Text color={"gray.500"}>
        You dont have permission to access this page.
      </Text>
      <Link href="/sign-in">
        <Button
          mt={10}
          colorScheme={"green"}
          bg={"green.400"}
          rounded={"full"}
          px={6}
          _hover={{
            bg: "green.500",
          }}
        >
          Sign In
        </Button>
      </Link>
    </Box>
  );
}
