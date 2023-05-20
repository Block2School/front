import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { FunctionComponent, useEffect, useState } from 'react';


export default function CustomAlert (message: string) {
  // const [show, setShow] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShow(false);
  //   }, duration);
  //   return () => clearTimeout(timer);
  // }, [duration]);

  // const handleClose = () => {
  //   setShow(false);
  // };
    return (
      <Alert status='success'>
      <AlertIcon />
      {message}
    </Alert>
    );
}


