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
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function SignupCard() {
  const [price, setPrice] = useState(100);

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (v) => {
    setPrice(v);
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
              <FormLabel htmlFor="email">User @</FormLabel>
              <Input id="email" type="email" />
              <FormHelperText>
                Type just the @ handler (ex: "elonrmuskk")
              </FormHelperText>
            </FormControl>

            <FormControl isRequired marginBottom={4}>
              <FormLabel htmlFor="email">Password</FormLabel>
              <Input id="email" type="email" />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>

            <FormControl isRequired marginBottom={4}>
              <FormLabel htmlFor="price">Price</FormLabel>
              <NumberInput
                max={10000}
                min={1}
                value={price}
                onChange={handleChange}
              >
                <NumberInputField id="price" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormHelperText>
                The buyer will pay{" "}
                {parseFloat(price) * 0.1 < 25
                  ? (parseFloat(price) + 25).toFixed(2)
                  : (parseFloat(price) * 1.1).toFixed(2)}{" "}
                USD (
                {parseFloat(price) * 0.1 < 25
                  ? `$${parseFloat(price).toFixed(2)} + $25.00`
                  : `$${(parseFloat(price) * 1).toFixed(2)} + $${(
                      parseFloat(price) * 0.1
                    ).toFixed(2)}`}
                )
              </FormHelperText>
            </FormControl>

            <FormControl isRequired marginBottom={4}>
              <FormLabel htmlFor="emailBuyer">Email of the buyer</FormLabel>
              <Input id="emailBuyer" type="emailBuyer" />
              <FormHelperText>
                We will send a notification to the buyer's email with the
                payment link.
              </FormHelperText>
            </FormControl>

            <Button mt={4} colorScheme="teal" type="submit">
              Save
            </Button>

            <Text fontSize="lg" marginTop={5}>
              Dont forget to confirm the email change on instagram
            </Text>
          </Box>
        </Stack>
      </SimpleGrid>
    </Box>
  );
}
