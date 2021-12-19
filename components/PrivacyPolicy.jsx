/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  List,
  ListItem,
  Spacer,
} from "@chakra-ui/react";
import Link from "next/link";

export default function CallToActionWithAnnotation() {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 10 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Privacy Policy
          </Heading>
          <Text color={"gray.500"}>
            A safe and clear market-place for selling and buying Instagram
            accounts of any existing niche.
          </Text>
        </Stack>
        <Stack as={Box} textAlign={"left"} spacing={{ base: 8, md: 14 }}>
          <Text color={"gray.500"}>
            This page informs you of our policies regarding the collection, use
            and disclosure of Personal Information when you use our Service. We
            will not use or share your information with anyone except as
            described in this Privacy Policy. We use your Personal Information
            for providing and improving the Service. By using the Service, you
            agree to the collection and use of information in accordance with
            this policy. Unless otherwise defined in this Privacy Policy, terms
            used in this Privacy Policy have the same meanings as in our Terms
            and Conditions.
          </Text>
          <Heading fontWeight={600}>Information Collection And Use</Heading>
          <Text color={"gray.500"} mt={0}>
            While using our Service, we may ask you to provide us with certain
            personally identifiable information that can be used to contact or
            identify you, and to provide escrow service. Personally identifiable
            information (“Personal Information”) may include, but is not limited
            to:
            <List>
              <ListItem>First Name</ListItem>
              <ListItem>Last Name</ListItem>
              <ListItem>Email address</ListItem>
            </List>
          </Text>

          <Heading fontWeight={600}>Log Data</Heading>
          <Text color={"gray.500"}>
            We collect information that your browser sends whenever you visit
            our Service (“Log Data”). This Log Data may include information such
            as your computer’s Internet Protocol (“IP”) address, browser type,
            browser version, the pages of our Service that you visit, the time
            and date of your visit, the time spent on those pages and other
            statistics.
          </Text>

          <Heading fontWeight={600}>Cookies</Heading>
          <Text color={"gray.500"}>
            Cookies are files with small amount of data, which may include an
            anonymous unique identifier. Cookies are sent to your browser from a
            web site and stored on your computer’s hard drive.
          </Text>
          <Text color={"gray.500"}>
            We use “cookies” to collect information. You can instruct your
            browser to refuse all cookies or to indicate when a cookie is being
            sent. However, if you do not accept cookies, you may not be able to
            use some portions of our Service.
          </Text>

          <Heading fontWeight={600}>Service Providers</Heading>
          <Text color={"gray.500"}>
            We may employ third party companies and individuals to facilitate
            our Service, to provide the Service on our behalf, to perform
            Service-related services or to assist us in analyzing how our
            Service is used.
          </Text>
          <Text color={"gray.500"}>
            These third parties have access to your Personal Information only to
            perform these tasks on our behalf and are obligated not to disclose
            or use it for any other purpose.
          </Text>

          <Heading fontWeight={600}>Security</Heading>
          <Text color={"gray.500"}>
            The security of your Personal Information is important to us, but
            remember that no method of transmission over the Internet, or method
            of electronic storage is 100% secure. While we strive to use
            commercially acceptable means to protect your Personal Information,
            we cannot guarantee its absolute security.
          </Text>

          <Heading fontWeight={600}>Links To Other Sites</Heading>
          <Text color={"gray.500"}>
            Our Service may contain links to other sites that are not operated
            by us. If you click on a third party link, you will be directed to
            that third party’s site. We strongly advise you to review the
            Privacy Policy of every site you visit.
          </Text>
          <Text color={"gray.500"}>
            We have no control over, and assume no responsibility for the
            content, privacy policies or practices of any third party sites or
            services.
          </Text>

          <Heading fontWeight={600}>Children’s Privacy</Heading>
          <Text color={"gray.500"}>
            Our Service does not address anyone under the age of 18
            (“Children”).
          </Text>
          <Text color={"gray.500"}>
            We do not knowingly collect personally identifiable information from
            children under 18. If you are a parent or guardian and you are aware
            that your child has provided us with Personal Information, please
            contact us. If we discover that a child under 18 has provided us
            with Personal Information, we will delete such information from our
            servers immediately.
          </Text>

          <Heading fontWeight={600}>Changes To This Privacy Policy</Heading>
          <Text color={"gray.500"}>
            This Privacy Policy was last updated on: July 19, 2019
          </Text>
          <Text color={"gray.500"}>
            We may update our Privacy Policy from time to time. Should we
            update, amend or make any changes to our privacy policy, those
            changes will be posted here.
          </Text>
          <Text color={"gray.500"}>
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </Text>

          <Heading fontWeight={600}>Contact Us</Heading>
          <Text color={"gray.500"}>
            If you have any questions about this Privacy Policy, please{" "}
            <Link color={"green.400"} href={"/contact"}>
              contact us
            </Link>
            .
          </Text>
          <Spacer />
        </Stack>
      </Container>
    </>
  );
}

const Arrow = createIcon({
  displayName: "Arrow",
  viewBox: "0 0 72 24",
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});
