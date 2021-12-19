import { Box, useColorModeValue, Text, Flex } from "@chakra-ui/react";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

export default function Logo(size = 30) {
  return (
    <Box color={useColorModeValue("green.400", "green.400")}>
      <Flex alignItems="center" justifyContent="space-between">
        <RiMoneyDollarCircleLine size={36} />
        <Text fontSize={20} marginLeft={1}>
          InstaSell
        </Text>
      </Flex>
    </Box>
  );
}
