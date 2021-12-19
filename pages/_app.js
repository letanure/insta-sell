import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import "../services/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { UserContext } from "../components/user";
import NoAccess from "../components/NoAccess";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("signed in", user);
        const uid = user.uid;
        setUser(user);
      } else {
        console.log("NOT signed in");
      }
    });
  }, []);

  if (pageProps.protected && !user) {
    return (
      <ChakraProvider>
        <NoAccess />
      </ChakraProvider>
    );
  }

  return (
    <UserContext.Provider value={user}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
