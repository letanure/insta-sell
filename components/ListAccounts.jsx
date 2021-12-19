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
  Tfoot,
  Heading,
  Text,
  useColorModeValue,
  SimpleGrid,
  Button,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);

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
          >
            <Stack spacing={4}>
              <Table variant="simple">
                <TableCaption>Prices in US Dollars (USD)</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Account</Th>
                    <Th>Tranfered</Th>
                    <Th>Price</Th>
                    <Th>Paid by the buyer</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <Link
                        href="https://www.instagram.com/bolatat2/"
                        target={"_blank"}
                      >
                        @bolata2
                      </Link>
                    </Td>
                    <Td>No</Td>
                    <Td isNumeric>200</Td>
                    <Td>No</Td>
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
                </Tbody>
              </Table>
            </Stack>
            <Stack spacing={4}>
              <Button
                colorScheme={"green"}
                bg={"green.400"}
                rounded={"full"}
                w={"20%"}
                px={6}
                _hover={{
                  bg: "green.500",
                }}
              >
                Add new account
              </Button>
            </Stack>
          </Box>
        </Stack>
      </SimpleGrid>
    </Box>
  );
}
