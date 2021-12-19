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
import { useCallback, useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import EmailChangeInstructionsModal from "./EmailChangeInstructionsModal";
import Joi from "joi";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/router";

const schema = Joi.object({
  user: Joi.string().alphanum().min(3).max(30).required(),
  emailBuyer: Joi.string()
    .email({
      tlds: {
        allow: false,
      },
    })
    .required(),
  price: Joi.number().min(1).max(100000000).required(),
  password: Joi.string().min(6).required(),
  sellerTransferred: Joi.any(),
  sellerEmailConfirmed: Joi.any(),
  buyerPaid: Joi.any(),
  sellerPaid: Joi.any(),
});

export default function SignupCard() {
  const router = useRouter();
  const [data, setData] = useState({
    user: "",
    password: "",
    price: 50,
    emailBuyer: "",
    sellerTransferred: false,
    sellerEmailConfirmed: false,
    buyerPaid: false,
    sellerPaid: false,
  });

  const [errors, setErrors] = useState({
    user: "",
    password: "",
    price: "",
    emailBuyer: "",
  });

  const saveToDb = async (newdata) => {
    try {
      const docRef = await addDoc(collection(db, "accounts"), newdata);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

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
      if (!/^\S+@\S+\.\S+$/.test(value)) {
        error = "Email must be valid";
      }
    }
    if (value === "") {
      error = "Required field";
    }
    return error;
  };

  const handleSubmit = () => {
    const { error, value } = schema.validate(data);
    console.log(error, errors);
    if (error) {
      const listErrors = {};
      for (let key in data) {
        listErrors[key] = validate(key, data[key]);
      }
      setErrors(listErrors);
      return;
    } else {
      saveToDb(data);
      router.push("/accounts");
    }
  };
  const handleChange = async (key, value) => {
    setData((prevdata) => ({
      ...prevdata,
      [key]: value,
    }));
    setErrors({ ...errors, [key]: validate(key, value) });
  };

  return (
    <Box maxW="12xl" mx={"auto"} pt={5} px={{ base: 2, sm: 22, md: 17 }}>
      <SimpleGrid className="TESTE" columns={{ base: 1 }}>
        <Stack spacing={8} mx={"auto"} w={"100%"}>
          <Stack align={"left"} p={4}>
            <Heading fontSize={"4xl"} textAlign={"left"}>
              Settings
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
            <FormControl marginBottom={4}>
              <FormLabel htmlFor="user">Paypal account</FormLabel>
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
                The account that the money will be sent to
              </FormHelperText>
            </FormControl>

            <FormControl marginBottom={4}>
              <FormLabel htmlFor="password">Crypto wallet</FormLabel>
              <Input
                id="password"
                type="text"
                value={data.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              <FormHelperText color={"red.400"}>
                {errors.password ? errors.password : ""}
              </FormHelperText>
              <FormHelperText>
                The account that the money will be sent to
              </FormHelperText>
            </FormControl>

            <FormControl marginBottom={4} isDisabled>
              <FormLabel htmlFor="emailBuyer">Email</FormLabel>
              <Input
                id="emailBuyer"
                type="emailBuyer"
                value={data.emailBuyer}
                onChange={(e) => handleChange("emailBuyer", e.target.value)}
              />
              <FormHelperText color={"red.400"}>
                {errors.emailBuyer ? errors.emailBuyer : ""}
              </FormHelperText>
              <FormHelperText>Your email</FormHelperText>
            </FormControl>

            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Box>
        </Stack>
      </SimpleGrid>
    </Box>
  );
}
