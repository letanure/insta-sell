import {
  Flex,
  Box,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Stack,
  Tag,
  Heading,
  Text,
  useColorModeValue,
  SimpleGrid,
  Button,
  Link,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = async () => {
    const querySnapshot = await getDocs(collection(db, "accounts"));
    const accountsDb = [];
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      accountsDb.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setAccounts(accountsDb);
  };

  return (
    <Box maxW="12xl" mx={"auto"} pt={5} px={{ base: 2, sm: 22, md: 17 }}>
      <SimpleGrid className="TESTE" columns={{ base: 1 }}>
        <Stack spacing={8} mx={"auto"} w={"100%"}>
          <Stack align={"center"} p={4}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Accounts
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={4}
            w={"100%"}
            overflowX={"scroll"}
          >
            <Stack spacing={4}>
              <Table variant="simple">
                <TableCaption>Prices in US Dollars (USD)</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Account</Th>
                    <Th>Price</Th>
                    <Th>Tranfered</Th>
                    <Th>Paid by the buyer?</Th>
                    <Th>Seller paid?</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {accounts.length === 0 && (
                    <Tr>
                      <Td colSpan={5}>
                        <Text>No accounts found</Text>
                      </Td>
                    </Tr>
                  )}
                  {accounts.map((account, index) => (
                    <Tr key={index}>
                      <Td>
                        <Link
                          href={`https://www.instagram.com/${account.user}`}
                          target={"_blank"}
                        >
                          {account.user}
                        </Link>
                      </Td>
                      <Td isNumeric width={30}>
                        ${account.price}
                      </Td>
                      <Td>
                        {account.sellerTransferred ? (
                          "Yes"
                        ) : (
                          <Tag colorScheme="yellow" size="sm" mb={1}>
                            Awaiting login confirmation
                          </Tag>
                        )}
                        {account.sellerEmailConfirmed ? (
                          "Yes"
                        ) : (
                          <Tag colorScheme="yellow" size="sm">
                            Awaiting email transfer
                          </Tag>
                        )}
                      </Td>
                      <Td>
                        {account.buyerPaid ? (
                          <Tag colorScheme="green" size="sm" mb={1}>
                            Yes
                          </Tag>
                        ) : (
                          <Tag colorScheme="red" size="sm" mb={1}>
                            No
                          </Tag>
                        )}
                      </Td>
                      <Td>
                        {account.sellerPaid ? (
                          <Tag colorScheme="green" size="sm" mb={1}>
                            Yes
                          </Tag>
                        ) : (
                          <Tag colorScheme="red" size="sm" mb={1}>
                            No
                          </Tag>
                        )}
                      </Td>
                      <Td>
                        <Button
                          variant="outline"
                          size="sm"
                          leftIcon={<ViewIcon />}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          View
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Stack>
          </Box>
          <Stack spacing={4}>
            <Link href="/accounts/add">
              <Button
                colorScheme={"green"}
                bg={"green.400"}
                rounded={"full"}
                w={"50%"}
                px={6}
                _hover={{
                  bg: "green.500",
                }}
              >
                Add new account
              </Button>
            </Link>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Box>
  );
}
