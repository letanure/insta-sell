import { Box, Heading, Text, Button, Link } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <Box textAlign="center" py={20} px={20} minHeight={"75vh"}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bg={"green.400"}
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={"gray.500"} mb={6}>
        The page you&#39;re looking for does not seem to exist
      </Text>

      <Link href="/">
        <Button
          colorScheme="teal"
          bg={"green.400"}
          color="white"
          variant="solid"
        >
          Go to Home
        </Button>
      </Link>
    </Box>
  );
}
