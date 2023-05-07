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
  BiErrorCircle
} from 'react-icons/bi'

export default function ErrorAlert({ errorMessage, isOpen, onClose }: { errorMessage: string, isOpen: boolean, onClose: any }) {
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
              {/* div that centers the content and put the two content one under the other */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <BiErrorCircle
                  style={{
                    color: 'red',
                    fontSize: '2rem',
                    margin: '0 auto',
                  }}
                  size={75}
                />
                <Text
                  style={{
                    color: 'red',
                    fontSize: '1.5rem',
                    margin: '0 auto',
                  }}
                >
                  Error
                </Text>
              </div>
            </AlertDialogHeader>
            <AlertDialogBody>
              <Center>
                {errorMessage}
              </Center>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onClose}
                id="errorAlertCloseButton"
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