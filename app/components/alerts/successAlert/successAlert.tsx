import React from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Center,
  Text,
} from '@chakra-ui/react'

import {
  BiCheckCircle
} from 'react-icons/bi'
import { sendGAEvent } from '../../../utils/utils';

export default function SuccessAlert({ successMessage, isOpen, onClose }: { successMessage: string, isOpen: boolean, onClose: any }) {
  const cancelRef = React.useRef(null)

  if (!isOpen) {
    return null;
  }
  return (
    <>
      <AlertDialog
        isOpen={true}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent
            style={{
              backgroundColor: '#343434',
              color: 'white',
            }}
          >
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <BiCheckCircle
                  style={{
                    color: 'green',
                    fontSize: '2rem',
                    margin: '0 auto',
                  }}
                  size={75}
                />
                <Text
                  style={{
                    color: 'green',
                    fontSize: '1.5rem',
                    margin: '0 auto',
                  }}
                >
                  Success
                </Text>
              </div>
            </AlertDialogHeader>
            <AlertDialogBody>
              <Center>
                <Text
                  style={{
                    color: 'white',
                    fontSize: '1.5rem',
                    margin: '0 auto',
                  }}
                >
                  {successMessage}
                </Text>
              </Center>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => {
                  sendGAEvent('Success Alert', 'button_click', `Close success alert`)
                  onClose()
                }}
                id="successAlertCloseButton"
              >
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}