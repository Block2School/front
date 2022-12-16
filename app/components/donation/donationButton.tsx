import { Button, Text, HStack, Image, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
  BiDonateHeart
} from 'react-icons/bi'
import DonationModal from './donationModal';

export default function DonationButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button // donation button no picture exists
        onClick={onOpen}
      >
        <HStack w="100%" justifyContent="center">
          <BiDonateHeart />
          <Text>Donate</Text>
        </HStack>
      </Button>
      <DonationModal isOpen={isOpen} closeModal={onClose} />
    </>
  );
}