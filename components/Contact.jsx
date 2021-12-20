/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-children-prop */
import {
  Container,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Alert,
  AlertIcon,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  FormHelperText,
} from "@chakra-ui/react";
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import { BsInstagram, BsDiscord, BsPerson, BsTwitter } from "react-icons/bs";
import Link from "next/link";
import Joi from "joi";
import { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useEffect, useContext } from "react";
import { UserContext } from "./user";

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      tlds: {
        allow: false,
      },
    })
    .required(),
  message: Joi.string().min(20).max(500).required(),
});

export default function contact() {
  const user = useContext(UserContext);
  let uid = null;

  const [showSuccess, setShowSuccess] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (user) {
      setData({ ...data, email: user.email });
    }
  }, [user]);

  const saveToDb = async (newdata) => {
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        ...newdata,
        uid,
        createdAt: Timestamp.now(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const validate = (key, value) => {
    let error = "";
    if (key === "name") {
      if (value.length < 3) {
        error = "Name must be at least 3 characters long";
      }
    }
    if (key === "message") {
      if (value.length < 20) {
        error = "Message must be at least 20 characters long";
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
      saveToDb(data);
      setShowSuccess(true);
      setData({
        name: "",
        email: "",
        message: "",
      });
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      // router.push("/accounts");
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
    <Container
      bg="gray.200"
      maxW="full"
      mt={0}
      centerContent
      overflow="hidden"
      paddingBottom={10}
      paddingTop={10}
    >
      <div>
        <Box
          bg="green.400"
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
        >
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading>Contact</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="white">
                    Fill up the form below to contact
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 4 }}>
                    <VStack
                      pl={0}
                      spacing={3}
                      alignItems="center"
                      pt={{ lg: 40 }}
                    >
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        color="white"
                        _hover={{ border: "2px solid green.300" }}
                        leftIcon={<MdEmail color="green.400" size="20px" />}
                      >
                        <Link href={`mailto:support@insta-sell.shop`}>
                          support@insta-sell.shop
                        </Link>
                      </Button>
                    </VStack>
                  </Box>
                  <HStack
                    mt={{ lg: 1, md: 1 }}
                    spacing={5}
                    px={50}
                    alignItems="center"
                  >
                    <IconButton
                      aria-label="Twitter"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: "green.400" }}
                      icon={<BsTwitter size="28px" />}
                    />
                    <IconButton
                      aria-label="Instagram"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: "green.400" }}
                      icon={<BsInstagram size="28px" />}
                    />
                  </HStack>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="gray.800">
                    <VStack spacing={5}>
                      {showSuccess && (
                        <Alert status="success">
                          <AlertIcon />
                          Message sent with success!
                        </Alert>
                      )}

                      <FormControl isRequired id="name">
                        <FormLabel>Your Name</FormLabel>
                        <InputGroup borderColor="gray.400">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<BsPerson color="gray.800" />}
                          />
                          <Input
                            type="text"
                            size="md"
                            value={data.name}
                            onChange={(e) =>
                              handleChange("name", e.target.value)
                            }
                          />
                        </InputGroup>
                        <FormHelperText color={"red.400"}>
                          {errors.name ? errors.name : ""}
                        </FormHelperText>
                      </FormControl>

                      <FormControl isRequired id="email">
                        <FormLabel>Mail</FormLabel>
                        <InputGroup borderColor="gray.400">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<MdOutlineEmail color="gray.800" />}
                          />
                          <Input
                            type="email"
                            size="md"
                            value={data.email}
                            onChange={(e) =>
                              handleChange("email", e.target.value)
                            }
                          />
                        </InputGroup>
                        <FormHelperText color={"red.400"}>
                          {errors.email ? errors.email : ""}
                        </FormHelperText>
                      </FormControl>

                      <FormControl isRequired id="message">
                        <FormLabel>Message</FormLabel>
                        <Textarea
                          borderColor="gray.400"
                          _hover={{
                            borderRadius: "gray.300",
                          }}
                          value={data.message}
                          placeholder="message"
                          onChange={(e) =>
                            handleChange("message", e.target.value)
                          }
                        />
                        <FormHelperText color={"red.400"}>
                          {errors.message ? errors.message : ""}
                        </FormHelperText>
                      </FormControl>

                      <FormControl id="name" float="right">
                        <Button
                          variant="solid"
                          bg="green.400"
                          color="white"
                          _hover={{}}
                          onClick={handleSubmit}
                        >
                          Send Message
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </div>
    </Container>
  );
}
