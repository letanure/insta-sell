import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { useState, useEffect } from "react";
import { db } from "../services/firebase";
import { BsInstagram, BsCurrencyDollar, BsClock } from "react-icons/bs";
import { collection, getDocs } from "firebase/firestore";

function StatsCard(props) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("green.400", "green.300")}
      bg={useColorModeValue("white", "gray.800")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function BasicStatistics() {
  const [accountsNr, setAccountsNr] = useState(0);
  const [awaitingpaymentNr, setAwaitingpaymentNr] = useState(0);
  const [salesTotal, setSalesTotal] = useState(0);

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = async () => {
    const querySnapshot = await getDocs(collection(db, "accounts"));
    const accountsDb = [];
    querySnapshot.forEach((doc) => {
      accountsDb.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    // setAccounts(accountsDb);
    setAccountsNr(accountsDb.length);
    setAwaitingpaymentNr(
      accountsDb.filter((account) => account.sellerPaid === false).length
    );
    setSalesTotal(
      accountsDb.reduce((acc, account) => acc + parseFloat(account.price), 0)
    );
  };
  return (
    <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1 textAlign={"left"} fontSize={"2xl"} py={1} fontWeight={"bold"}>
        Your status
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={"Acounts"}
          stat={accountsNr}
          icon={<BsInstagram size={"3em"} />}
        />
        <StatsCard
          title={"Sales"}
          stat={salesTotal.toFixed(2)}
          icon={<BsCurrencyDollar size={"3em"} />}
        />
        <StatsCard
          title={"Awaiting payment"}
          stat={awaitingpaymentNr}
          icon={<BsClock size={"3em"} />}
        />
      </SimpleGrid>
    </Box>
  );
}
