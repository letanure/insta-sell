import { ReactElement } from "react";
import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  Heading,
  Container,
} from "@chakra-ui/react";
import { FcList, FcMoneyTransfer, FcApproval } from "react-icons/fc";

const Feature = ({ title, text, icon }) => {
  return (
    <>
      <Container maxW={"7xl"}>
        <SimpleGrid columns={{ base: 1, lg: 1 }} spacing={{ base: 18, md: 10 }}>
          <Stack>
            <Flex
              // w={12}
              h={16}
              align={"center"}
              justify={"center"}
              color={"white"}
              // rounded={"full"}
              // bg={"gray.100"}
              mb={1}
            >
              {icon}
            </Flex>
            <Text fontWeight={600}>{title}</Text>
            <Text color={"gray.600"}>{text}</Text>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default function SimpleThreeColumns() {
  return (
    <Container maxW={"7xl"}>
      <Box p={4}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={0}>
          <Feature
            icon={<Icon as={FcList} w={10} h={10} />}
            title={"Add the account to sell"}
            text={
              "Just add the details of the account you want to sell and we'll do the rest."
            }
          />
          <Feature
            icon={<Icon as={FcMoneyTransfer} w={10} h={10} />}
            title={"We receive the payment from the buyer"}
            text={
              "We receive the payment from the buyer and we'll transfer it to the seller's bank account."
            }
          />
          <Feature
            icon={<Icon as={FcApproval} w={10} h={10} />}
            title={"We send your money and the account to the buyer"}
            text={"We send your money and the account to the buyer"}
          />
        </SimpleGrid>
      </Box>
    </Container>
  );
}
