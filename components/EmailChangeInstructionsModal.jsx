import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  ModalHeader,
  ModalFooter,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import EmailChangeInstructions from "./EmailChangeInstructions";
import { useDisclosure } from "@chakra-ui/react";

export default function BasicUsage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>View instructions</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Instruction to change email</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EmailChangeInstructions />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
