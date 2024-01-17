import {
  Alert,
  AlertIcon
} from '@chakra-ui/react'

export default function CustomAlert (message: string) {
    return (
      <Alert status='success'>
      <AlertIcon />
      {message}
    </Alert>
    );
}


