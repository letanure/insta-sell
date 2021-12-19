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
  Code,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import EmailChangeInstructionsModal from "./EmailChangeInstructionsModal";

const validateEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};

export default function SignupCard() {
  const [data, setData] = useState({
    user: "",
    password: "",
    price: 50,
    emailBuyer: "",
  });
  const [errors, setErrors] = useState({
    user: "",
    password: "",
    price: "",
    emailBuyer: "",
  });

  const validate = (key, value) => {
    let error = "";
    if (key === "user") {
      if (value.length < 3) {
        error = "Username must be at least 3 characters long";
      }
    }
    if (key === "price") {
      if (value < 50) {
        error = "The minimum price is 50";
      }
    }
    if (key === "password") {
      if (value.length < 6) {
        error = "Password must be at least 6 characters long";
      }
    }
    if (key === "emailBuyer") {
      if (/^\S+@\S+\.\S+$/.test(value)) {
        error = "Email must be valid";
      }
    }
    return error;
  };

  const handleChange = (key, value) => {
    setErrors({ ...errors, [key]: validate(key, value) });
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
              <FormHelperText color={"red.400"}>
                {errors.user ? errors.user : ""}
              </FormHelperText>
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
              <FormHelperText color={"red.400"}>
                {errors.password ? errors.password : ""}
              </FormHelperText>
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>

            <FormControl isRequired marginBottom={4}>
              <FormLabel htmlFor="price">Price</FormLabel>
              <NumberInput
                max={10000}
                min={50}
                value={data.price}
                onChange={(value) => handleChange("price", value)}
              >
                <NumberInputField id="price" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormHelperText color={"red.400"}>
                {errors.price ? errors.price : ""}
              </FormHelperText>
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
              <FormHelperText color={"red.400"}>
                {errors.emailBuyer ? errors.emailBuyer : ""}
              </FormHelperText>
              <FormHelperText>
                We will send a notification to the buyer's email with the
                payment link.
              </FormHelperText>
            </FormControl>

            <Text fontSize="lg" marginTop={5} marginBottom={5}>
              Dont forget to confirm the email change on Instagram and foward
              the confirmation email to
              <>
                <Flex align={"center"}>
                  <CopyToClipboard text="seller-4567@insta-sell.shop">
                    <Text bg={"green.200"} p={1} mr={3} cursor={"pointer"}>
                      seller-4567@insta-sell.shop
                    </Text>
                  </CopyToClipboard>
                  <Text fontSize="sm" marginTop={5} marginBottom={5}>
                    click to copy
                  </Text>
                </Flex>
              </>
            </Text>
            <Text fontSize="lg" marginTop={5} marginBottom={5}>
              <EmailChangeInstructionsModal />
            </Text>

            <Button mt={4} colorScheme="teal" type="submit">
              Save
            </Button>
          </Box>
        </Stack>
      </SimpleGrid>
    </Box>
  );
}
