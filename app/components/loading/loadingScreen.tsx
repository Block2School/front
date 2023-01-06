import Navbar from "../navbar/navbar";
import { Spinner, Text, Alert, AlertIcon } from '@chakra-ui/react'

export default function LoadingScreen ({showError}:{showError:boolean}) {

    return (
        <div id="loading-screen">
          <Navbar/>
          <Spinner speed="0.5s" emptyColor='black' thickness='5px' color="#ffe6c4" size="xl" id="loading-screen-spinner" />
          {showError != true ? (
                <div id="loading-screen-text">
                    <Text>Loading ...</Text>
                </div>
            ):(
                <Alert status='error'>
                  <AlertIcon />
                  There was an error processing your request. Try to refresh the page or contact the administrator.
                </Alert>
            )}
        </div>
    )
}