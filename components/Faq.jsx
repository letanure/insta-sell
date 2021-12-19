import {
  Box,
  chakra,
  Container,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Text,
  Heading,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { ReactNode } from "react";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function SmallWithSocial() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"12xl"}
        py={10}
        direction={{ base: "column", md: "column" }}
        spacing={8}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Stack spacing={{ base: 1, md: 1 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              textAlign={"center"}
              marginBottom={5}
            >
              Frequently Asked Questions
            </Heading>
          </Box>
          <Accordion>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Fee
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                The InstaSell fee is 10% of the account price, but not less than
                $ 25 per transaction.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Who pays the fee?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                The buyer pays the fee, and the seller receives the funds.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    My account was hacked and is on sale here. What should I do?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                The service is not responsible for the security of your account.
                The purpose of the service is to make it easier both sides to
                make a safe deal where both parties can trust in our services
                and finish the deal. The buyer is sure they will get the bill
                back and the seller is sure they will be paid
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Can I sell/buy annonymously?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                All the details of the seller and buyer are hidden.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Methods for Transferring and Receiving the Payments
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Currently, all the payments are processed via Paypal or Bitcoin
                payment system. USD to BTC rate is fixed at the moment of
                invoicing. If during 1 day the Buyer does not pay the invoice,
                the amount can be recalculated (according to the USD to BTC rate
                then current). The Seller receives the payment according to the
                rate current at the moment of invoicing the Buyer (including
                fees) to his Bitcoin wallet. We are currently working on adding
                new payment methods. You can find out about new payment methods
                from our news.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Why are the usernames masked?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                At InstaSell, we are connecting sellers and buyers. Some sellers
                prefer to keep the username confidential since they don’t want
                to let everybody know their account is on sale. Also, we would
                like to avoid the possibility of an online transaction outside
                of our safe and secure platform.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Can I refund the account which I bought?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Once the buyer receive the credentials, he/she cannot cancel the
                transaction and ask for a refund. Please note, this rule only
                applies to all sales.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    What If the seller does not provide the credentials?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                In this case, the paid amount will be refunded to the customer
                within 48 hours. Also, the cooperation with the seller will be
                discontinued forever.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    What If the buyer does not pay in 48h?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                In this case, the account will be returned to the seller in 24h.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Do you accept custom orders for other social media
                    platforms?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Yes, we do! Although our main focus is Instagram, we cover
                Facebook, Youtube, Twitter, TikTok, Spotify, Tumblr, and
                Pinterest. Please let us know if you are looking for the
                specific account in terms of category and followers and we will
                get back to you as soon we find it.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    How can I purchase an Instagram Account?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Check the How it works section.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Stack>
      </Container>
    </Box>
  );
}
