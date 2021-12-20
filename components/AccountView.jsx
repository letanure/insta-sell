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
  Tag,
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
import {
  collection,
  addDoc,
  Timestamp,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "./user";

const schema = Joi.object({
  user: Joi.string().min(3).max(30).required(),
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
  const { uid } = useContext(UserContext);
  const router = useRouter();
  const { id } = router.query;
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

  const getAccountData = async () => {
    const docRef = doc(db, "accounts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const docData = docSnap.data();
      if (docData.active === false) {
        router.push("/accounts");
        return;
      }
      setData({
        user: docData.user,
        password: docData.password,
        price: docData.price,
        emailBuyer: docData.emailBuyer,
        sellerTransferred: docData.sellerTransferred,
        sellerEmailConfirmed: docData.sellerEmailConfirmed,
        buyerPaid: docData.buyerPaid,
        sellerPaid: docData.sellerPaid,
      });
    } else {
      console.log("No such document!");
      router.push("/accounts");
    }
  };

  useEffect(() => {
    getAccountData();
  }, []);

  const saveToDb = async (newdata) => {
    try {
      const docRef = await addDoc(collection(db, "accounts"), {
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

  const handleDelete = async (key, value) => {
    const docRef = doc(db, "accounts", id);

    await updateDoc(docRef, {
      active: false,
    });
    router.push("/accounts");
  };

  return (
    <Box maxW="12xl" mx={"auto"} pt={5} px={{ base: 2, sm: 22, md: 17 }}>
      <SimpleGrid className="TESTE" columns={{ base: 1 }}>
        <Stack spacing={8} mx={"auto"} w={"100%"}>
          <Stack align={"left"} p={4}>
            <Heading fontSize={"4xl"} textAlign={"left"}>
              View account to sell
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
            <SimpleGrid columns={{ base: 1, md: 1 }} spacing={2} mb={3}>
              <Box>
                <Text fontSize={"md"} fontWeight={600}>
                  Status Login
                </Text>
              </Box>
              <Box border={"1px solid #e2e8f0"} padding={2} borderRadius={6}>
                {data.sellerTransferred ? (
                  <Tag colorScheme="green" size="sm" mb={1}>
                    Login confirmed
                  </Tag>
                ) : (
                  <Tag colorScheme="yellow" size="sm" mb={1}>
                    Awaiting login confirmation
                  </Tag>
                )}
                <br />
                {data.sellerEmailConfirmed ? (
                  <Tag colorScheme="green" size="sm">
                    Email confirmed
                  </Tag>
                ) : (
                  <Tag colorScheme="yellow" size="sm">
                    Awaiting email transfer
                  </Tag>
                )}
              </Box>
              <Box>
                <Text fontSize={"md"} fontWeight={600}>
                  Paid by the buyer?
                </Text>
              </Box>
              <Box border={"1px solid #e2e8f0"} padding={2} borderRadius={6}>
                {data.buyerPaid ? (
                  <Tag colorScheme="green" size="sm" mb={1}>
                    Yes
                  </Tag>
                ) : (
                  <Tag colorScheme="red" size="sm" mb={1}>
                    No
                  </Tag>
                )}
              </Box>
              <Box>
                <Text fontSize={"md"} fontWeight={600}>
                  Seller paid?
                </Text>
              </Box>
              <Box border={"1px solid #e2e8f0"} padding={2} borderRadius={6}>
                {data.sellerPaid ? (
                  <Tag colorScheme="green" size="sm" mb={1}>
                    Yes
                  </Tag>
                ) : (
                  <Tag colorScheme="red" size="sm" mb={1}>
                    No
                  </Tag>
                )}
              </Box>
            </SimpleGrid>

            <FormControl isReadOnly isRequired marginBottom={4}>
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

            <FormControl isReadOnly isRequired marginBottom={4}>
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
              <FormHelperText>
                The passwords are encrypted and not visible to our team
              </FormHelperText>
            </FormControl>

            <FormControl isReadOnly isRequired marginBottom={4}>
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

            <FormControl isReadOnly isRequired marginBottom={4}>
              <FormLabel htmlFor="emailBuyer">Email of the buyer</FormLabel>
              <Input
                id="emailBuyer"
                type="emailBuyer"
                value={data.emailBuyer}
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

            {!data.sellerEmailConfirmed && (
              <>
                <Text fontSize="lg" marginTop={5} marginBottom={5}>
                  Dont forget to confirm the email change on Instagram and
                  foward the confirmation email to
                </Text>
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
                <Text fontSize="lg" marginTop={5} marginBottom={5}>
                  <EmailChangeInstructionsModal />
                </Text>
              </>
            )}

            <Button
              mt={4}
              colorScheme="red"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </Button>

            <Link href="/accounts/" ml={5}>
              <Button
                mt={4}
                colorScheme={"green"}
                bg={"green.400"}
                px={6}
                _hover={{
                  bg: "green.500",
                }}
              >
                Back to the list
              </Button>
            </Link>
          </Box>
        </Stack>
      </SimpleGrid>
    </Box>
  );
}
