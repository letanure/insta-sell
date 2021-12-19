/* eslint-disable react/no-unescaped-entities */
import {
  Flex,
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  SimpleGrid,
  Button,
  Link,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";

import EmailChangeInstructionsModal from "./EmailChangeInstructionsModal";

export default function SignupCard() {
  const [data, setData] = useState({
    user: "",
    password: "",
    price: 100,
    emailBuyer: "",
  });

  const handleChange = (key, value) => {
    console.log(key, value);
    setData((prevdata) => ({
      ...prevdata,
      [key]: value,
    }));
  };

  return (
    <Box maxW="12xl" mx={"auto"} pt={5} px={{ base: 2, sm: 22, md: 17 }}>
      <SimpleGrid className="TESTE" columns={{ base: 1 }}>
        <Stack spacing={8} mx={"auto"} w={"100%"}>
          <Stack align={"left"} p={4}>
            <Heading fontSize={"4xl"} textAlign={"left"}>
              Add account to sell
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
            <FormControl isRequired marginBottom={4}>
              <FormLabel htmlFor="user">User @</FormLabel>
              <Input
                id="user"
                type="user"
                value={data.user}
                onChange={(e) => handleChange("user", e.target.value)}
              />
              <FormHelperText>
                Type just the @ handler (ex: "elonrmuskk")
              </FormHelperText>
            </FormControl>

            <FormControl isRequired marginBottom={4}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="text"
                value={data.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>

            <FormControl isRequired marginBottom={4}>
              <FormLabel htmlFor="price">Price</FormLabel>
              <NumberInput
                max={10000}
                min={1}
                value={data.price}
                onChange={(value) => handleChange("price", value)}
              >
                <NumberInputField id="price" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormHelperText>
                The buyer will pay{" "}
                {parseFloat(data.price) * 0.1 < 25
                  ? (parseFloat(data.price) + 25).toFixed(2)
                  : (parseFloat(data.price) * 1.1).toFixed(2)}{" "}
                USD (
                {parseFloat(data.price) * 0.1 < 25
                  ? `$${parseFloat(data.price).toFixed(2)} + $25.00`
                  : `$${(parseFloat(data.price) * 1).toFixed(2)} + $${(
                      parseFloat(data.price) * 0.1
                    ).toFixed(2)}`}
                )
              </FormHelperText>
            </FormControl>

            <FormControl isRequired marginBottom={4}>
              <FormLabel htmlFor="emailBuyer">Email of the buyer</FormLabel>
              <Input
                id="emailBuyer"
                type="emailBuyer"
                onChange={(e) => handleChange("emailBuyer", e.target.value)}
              />
              <FormHelperText>
                We will send a notification to the buyer's email with the
                payment link.
              </FormHelperText>
            </FormControl>

            <Button mt={4} colorScheme="teal" type="submit">
              Save
            </Button>

            <Text fontSize="lg" marginTop={5} marginBottom={5}>
              Dont forget to confirm the email change on instagram
            </Text>
            <EmailChangeInstructionsModal />
          </Box>
        </Stack>
      </SimpleGrid>
    </Box>
  );
}
