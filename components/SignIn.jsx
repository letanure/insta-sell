import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  FormHelperText,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Joi from "joi";
import { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const schema = Joi.object({
  email: Joi.string()
    .email({
      tlds: {
        allow: false,
      },
    })
    .required(),
  password: Joi.string().min(6).required(),
});

export default function SimpleCard() {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [errorGeneral, setErrorGeneral] = useState();

  const saveToDb = async (newdata) => {
    try {
      const docRef = await addDoc(collection(db, "signins"), newdata);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const logIn = async (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        saveToDb({
          uid: user.uid,
          name,
          password,
          authProvider: "local",
          email,
        });
        setErrorGeneral("");
        router.push("/dashboard");
      })
      .catch((error) => {
        if (error.code === "auth/too-many-requests") {
          setErrorGeneral(error.message);
        }
        if (
          error.code === "auth/user-not-found" ||
          error.code === "EMAIL_NOT_FOUND"
        ) {
          setErrorGeneral("User not found");
        }
        if (error.code === "auth/wrong-password") {
          setErrorGeneral("Wrong password or email");
        }
      });
  };

  const validate = (key, value) => {
    let error = "";

    if (key === "password") {
      if (value.length < 6) {
        error = "Password need at least 6 chars ";
      }
    }
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
      logIn(data.email, data.password);
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
      minH={"86vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          {/* <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text> */}
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={data.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              <FormHelperText color={"red.400"}>
                {errors.email ? errors.email : ""}
              </FormHelperText>
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={data.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              <FormHelperText color={"red.400"}>
                {errors.password ? errors.password : ""}
              </FormHelperText>
            </FormControl>

            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                {/* <Checkbox>Remember me</Checkbox> */}
                <Link color={"green.400"} href="/forgot-password">
                  Forgot password?
                </Link>
              </Stack>
              {errorGeneral && <Text color={"red.400"}>{errorGeneral}</Text>}
              <Button
                bg={"green.400"}
                color={"white"}
                size="lg"
                _hover={{
                  bg: "green.500",
                }}
                onClick={handleSubmit}
              >
                Sign in
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Not a uset yet?{" "}
                <Link color={"green.400"} href="/sign-up">
                  Create an account
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
