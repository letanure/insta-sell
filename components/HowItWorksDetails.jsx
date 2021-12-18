import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  ListIcon,
  List,
  ListItem,
} from "@chakra-ui/react";
import {
  AddIcon,
  TimeIcon,
  WarningTwoIcon,
  ArrowForwardIcon,
  AtSignIcon,
  EmailIcon,
  UnlockIcon,
} from "@chakra-ui/icons";

export default function Simple() {
  return (
    <Container maxW={"3xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 1 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Stack spacing={{ base: 1, md: 1 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              textAlign={"center"}
            >
              Complete flow
            </Heading>
          </Box>

          <Stack
            spacing={{ base: 6, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("green.600", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"2xl"}
                fontWeight={"300"}
                textAlign={"center"}
              >
                The process step by step
              </Text>
              {/* <Text fontSize={"lg"}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                aliquid amet at delectus doloribus dolorum expedita hic, ipsum
                maxime modi nam officiis porro, quae, quisquam quos
                reprehenderit velit? Natus, totam.
              </Text> */}
            </VStack>
            <Box>
              <List spacing={2}>
                <ListItem marginBottom={4}>
                  <ListIcon as={ArrowForwardIcon} color="green.500" />
                  Create an account and sign in
                  <Text fontSize={"sm"} color="gray.500" paddingLeft={6}>
                    no personal data is required
                  </Text>
                </ListItem>
                <ListItem marginBottom={4}>
                  <ListIcon as={AtSignIcon} color="green.500" />
                  Add the Instagram account details (username, password)
                  <Text fontSize={"sm"} color="gray.500" paddingLeft={6}>
                    The data is encrypted and not visible to anyone
                  </Text>
                </ListItem>
                <ListItem marginBottom={4}>
                  <ListIcon as={EmailIcon} color="green.500" />
                  Update the email address on Instagram to the provided email
                  (and confirm!)
                  <Text fontSize={"sm"} color="gray.500" paddingLeft={6}>
                    The email is used only by our software
                  </Text>
                </ListItem>
                {/* You can also use custom icons from react-icons */}
                <ListItem marginBottom={4}>
                  <ListIcon as={TimeIcon} color="green.500" />
                  The buyer will be notified that we hold the account and he has
                  to pay in 48h
                  <Text fontSize={"sm"} color="gray.500" paddingLeft={6}>
                    He can pay using his bank account or Paypal
                  </Text>
                </ListItem>
                <ListItem marginBottom={4}>
                  <ListIcon as={UnlockIcon} color="green.500" />
                  When the buyer has paid, we will send the account to him and
                  the money to the seller
                  <Text fontSize={"sm"} color="gray.500" paddingLeft={6}>
                    The account details will be deleted from our database
                  </Text>
                </ListItem>
                <ListItem marginBottom={4}>
                  <ListIcon as={WarningTwoIcon} color="green.500" />
                  If the buyer has not paid, we will return the account to the
                  buyer in 24h
                  <Text fontSize={"sm"} color="gray.500" paddingLeft={6}>
                    We will not store any details about the transaction
                  </Text>
                </ListItem>
              </List>
              {/* <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Features
              </Text> */}

              {/* <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem marginBottom={4}>Chronograph</ListItem>
                  <ListItem marginBottom={4}>Master Chronometer Certified</ListItem>{" "}
                  <ListItem marginBottom={4}>Tachymeter</ListItem>
                </List>
                <List spacing={2}>
                  <ListItem marginBottom={4}>Anti‑magnetic</ListItem>
                  <ListItem marginBottom={4}>Chronometer</ListItem>
                  <ListItem marginBottom={4}>Small seconds</ListItem>
                </List>
              </SimpleGrid> */}
            </Box>
            {/* <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Product Details
              </Text>

              <List spacing={2}>
                <ListItem marginBottom={4}>
                  <Text as={"span"} fontWeight={"bold"}>
                    Between lugs:
                  </Text>{" "}
                  20 mm
                </ListItem>
                <ListItem marginBottom={4}>
                  <Text as={"span"} fontWeight={"bold"}>
                    Bracelet:
                  </Text>{" "}
                  leather strap
                </ListItem>
                <ListItem marginBottom={4}>
                  <Text as={"span"} fontWeight={"bold"}>
                    Case:
                  </Text>{" "}
                  Steel
                </ListItem>
                <ListItem marginBottom={4}>
                  <Text as={"span"} fontWeight={"bold"}>
                    Case diameter:
                  </Text>{" "}
                  42 mm
                </ListItem>
                <ListItem marginBottom={4}>
                  <Text as={"span"} fontWeight={"bold"}>
                    Dial color:
                  </Text>{" "}
                  Black
                </ListItem>
                <ListItem marginBottom={4}>
                  <Text as={"span"} fontWeight={"bold"}>
                    Crystal:
                  </Text>{" "}
                  Domed, scratch‑resistant sapphire crystal with anti‑reflective
                  treatment inside
                </ListItem>
                <ListItem marginBottom={4}>
                  <Text as={"span"} fontWeight={"bold"}>
                    Water resistance:
                  </Text>{" "}
                  5 bar (50 metres / 167 feet){" "}
                </ListItem>
              </List>
            </Box> */}
          </Stack>

          {/* <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack> */}
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
