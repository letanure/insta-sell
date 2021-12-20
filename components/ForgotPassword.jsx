import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  FormHelperText,
  useColorModeValue,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import Joi from "joi";
import { useRouter } from "next/router";

const schema = Joi.object({
  email: Joi.string()
    .email({
      tlds: {
        allow: false,
      },
    })
    .required(),
});

export default function ForgotPasswordForm() {
  const auth = getAuth();
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const saveToDb = async (newdata) => {
    try {
      const docRef = await addDoc(collection(db, "ForgotPasswordForm"), {
        ...newdata,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const validate = (key, value) => {
    let error = "";
    if (key === "email") {
      if (!/^\S+@\S+\.\S+$/.test(value)) {
        error = "Email must be valid";
      }
    }
    if (value === "") {
      error = "Required field";
    }
    return error;
  };

  function sendEmail(email) {
    sendPasswordResetEmail(auth, email)
      .then(() => {})
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  const handleSubmit = () => {
    const { error, value } = schema.validate(data);
    if (error) {
      const listErrors = {};
      for (let key in data) {
        listErrors[key] = validate(key, data[key]);
      }
      setErrors(listErrors);
      return;
    } else {
      saveToDb(data);
      sendEmail(data.email);
      router.push("/sign-in");
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
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          You&apos;ll get an email with a reset link
        </Text>
        <FormControl id="email">
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <FormHelperText color={"red.400"}>
            {errors.email ? errors.email : ""}
          </FormHelperText>
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"green.400"}
            color={"white"}
            _hover={{
              bg: "green.500",
            }}
            onClick={handleSubmit}
          >
            Request Reset
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
