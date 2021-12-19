import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  FormHelperText,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import Joi from "joi";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      tlds: {
        allow: false,
      },
    })
    .required(),
  password: Joi.string().min(6).required(),
});

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const saveToDb = async (newdata) => {
    try {
      const docRef = await addDoc(collection(db, "users"), newdata);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const registerWithEmailAndPassword = async (name, email, password) => {
    const auth = getAuth();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      saveToDb({
        uid: user.uid,
        name,
        password,
        authProvider: "local",
        email,
      });
      setErrorGeneral("");
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
      if (err.code === "auth/email-already-in-use") {
        setErrorGeneral("Email already in use");
      }
      console.dir(err);
    }
  };

  const validate = (key, value) => {
    let error = "";
    if (key === "name") {
      if (value.length < 3) {
        error = "Name need at least 3 chars ";
      }
    }
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
    console.log(error);
    if (error) {
      const listErrors = {};
      for (let key in data) {
        listErrors[key] = validate(key, data[key]);
      }
      setErrors(listErrors);
      return;
    } else {
      registerWithEmailAndPassword(data.name, data.email, data.password);
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
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={data.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              <FormHelperText color={"red.400"}>
                {errors.name ? errors.name : ""}
              </FormHelperText>
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={data.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              <FormHelperText color={"red.400"}>
                {errors.email ? errors.email : ""}
              </FormHelperText>
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText color={"red.400"}>
                {errors.password ? errors.password : ""}
              </FormHelperText>
            </FormControl>

            <Stack spacing={5} pt={2}>
              {errorGeneral && <Text color={"red.400"}>{errorGeneral}</Text>}
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"green.400"}
                color={"white"}
                _hover={{
                  bg: "green.500",
                }}
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link color={"green.400"} href="/sign-in">
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
