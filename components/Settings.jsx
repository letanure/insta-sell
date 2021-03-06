/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  AlertIcon,
  Alert,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  SimpleGrid,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
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
  getDocs,
  query,
  where,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "./user";

const schema = Joi.object({
  paypal: Joi.string().min(6).max(200).required(),
  crypto: Joi.string().min(6).max(200).required(),
  preferred: Joi.any(),
  // email: Joi.string()
  //   .email({
  //     tlds: {
  //       allow: false,
  //     },
  //   })
  //   .required(),
});

export default function SignupCard() {
  const [showSuccess, setShowSuccess] = useState(false);
  const { uid, email } = useContext(UserContext);
  const router = useRouter();
  const [data, setData] = useState({
    paypal: "",
    crypto: "",
    preferred: "pp",
    // email: email,
  });

  const [errors, setErrors] = useState({
    paypal: "",
    crypto: "",
    preferred: "",
    // email: "",
  });

  useEffect(() => {
    getSettings();
  }, []);

  const getSettings = async () => {
    const citiesRef = collection(db, "settings");
    const q = query(
      citiesRef,
      where("uid", "==", uid),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    // const querySnapshot = await getDocs(collection(db, "accounts"));
    const allSettings = [];
    querySnapshot.forEach((doc) => {
      allSettings.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    if (allSettings.length > 0) {
      const { paypal, crypto, preferred } = allSettings[0];
      setData({ paypal, crypto, preferred });
    }
  };

  const saveToDb = async (newdata) => {
    try {
      const docRef = await addDoc(collection(db, "settings"), {
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
    if (key === "paypal") {
      if (value.length < 6) {
        error = "Paypal must be at least 6 characters long";
      }
    }
    if (key === "crypto") {
      if (value.length < 6) {
        error = "Password must be at least 6 characters long";
      }
    }
    // if (key === "email") {
    //   if (!/^\S+@\S+\.\S+$/.test(value)) {
    //     error = "Email must be valid";
    //   }
    // }
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
            {showSuccess && (
              <Alert status="success">
                <AlertIcon />
                Save with success!
              </Alert>
            )}
            <FormControl isRequired marginBottom={4}>
              <FormLabel htmlFor="paypal">Paypal account</FormLabel>
              <Input
                id="paypal"
                type="paypal"
                value={data.paypal}
                onChange={(e) => handleChange("paypal", e.target.value)}
              />
              <FormHelperText color={"red.400"}>
                {errors.paypal ? errors.paypal : ""}
              </FormHelperText>
              <FormHelperText>
                The account that the money will be sent to
              </FormHelperText>
            </FormControl>

            <FormControl isRequired marginBottom={4}>
              <FormLabel htmlFor="crypto">Crypto wallet</FormLabel>
              <Input
                id="crypto"
                type="text"
                value={data.crypto}
                onChange={(e) => handleChange("crypto", e.target.value)}
              />
              <FormHelperText color={"red.400"}>
                {errors.crypto ? errors.crypto : ""}
              </FormHelperText>
              <FormHelperText>
                The account that the money will be sent to
              </FormHelperText>
            </FormControl>

            <FormControl isRequired marginBottom={4}>
              <FormLabel htmlFor="preferred">
                Preferred payment method
              </FormLabel>
              <Select
                value={data.preferred}
                onChange={(e) => handleChange("preferred", e.target.value)}
              >
                <option value="pp">PayPal</option>
                <option value="btc">Bitcoin</option>
              </Select>
              <FormHelperText color={"red.400"}>
                {errors.preferred ? errors.preferred : ""}
              </FormHelperText>
            </FormControl>

            {/* <FormControl isRequired marginBottom={4} isDisabled>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              <FormHelperText color={"red.400"}>
                {errors.email ? errors.emailBuyer : ""}
              </FormHelperText>
              <FormHelperText>Your email</FormHelperText>
            </FormControl> */}

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
