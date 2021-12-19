/* eslint-disable react/no-children-prop */
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
} from "@chakra-ui/react";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from "react-icons/md";
import { BsInstagram, BsDiscord, BsPerson, BsTwitter } from "react-icons/bs";
import Link from "next/link";

export default function contact() {
  return (
    <Container
      bg="gray.200"
      maxW="full"
      mt={0}
      centerContent
      overflow="hidden"
      paddingBottom={10}
      paddingTop={10}
    >
      <div>
        <Box
          bg="green.400"
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
        >
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading>Contact</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="white">
                    Fill up the form below to contact
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 4 }}>
                    <VStack
                      pl={0}
                      spacing={3}
                      alignItems="center"
                      pt={{ lg: 40 }}
                    >
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        color="white"
                        _hover={{ border: "2px solid green.300" }}
                        leftIcon={<MdEmail color="green.400" size="20px" />}
                      >
                        <Link href={`mailto:support@insta-sell.shop`}>
                          support@insta-sell.shop
                        </Link>
                      </Button>
                    </VStack>
                  </Box>
                  <HStack
                    mt={{ lg: 1, md: 1 }}
                    spacing={5}
                    px={50}
                    alignItems="center"
                  >
                    <IconButton
                      aria-label="Twitter"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: "green.400" }}
                      icon={<BsTwitter size="28px" />}
                    />
                    <IconButton
                      aria-label="Instagram"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: "green.400" }}
                      icon={<BsInstagram size="28px" />}
                    />
                  </HStack>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="gray.800">
                    <VStack spacing={5}>
                      <FormControl id="name">
                        <FormLabel>Your Name</FormLabel>
                        <InputGroup borderColor="gray.400">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<BsPerson color="gray.800" />}
                          />
                          <Input type="text" size="md" />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Mail</FormLabel>
                        <InputGroup borderColor="gray.400">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<MdOutlineEmail color="gray.800" />}
                          />
                          <Input type="text" size="md" />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Message</FormLabel>
                        <Textarea
                          borderColor="gray.400"
                          _hover={{
                            borderRadius: "gray.300",
                          }}
                          placeholder="message"
                        />
                      </FormControl>
                      <FormControl id="name" float="right">
                        <Button
                          variant="solid"
                          bg="green.400"
                          color="white"
                          _hover={{}}
                        >
                          Send Message
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </div>
    </Container>
  );
}
