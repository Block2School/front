import { HStack, VStack, Stack, Text } from "@chakra-ui/react"
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import Balance from "../balance/balance"
import CustomButton from "../button/button"

export default function LoginInformation ({account, library, chainId, active, onOpen, disconnect}:{account:any, library:any, chainId:any, active:boolean, onOpen:any, disconnect:any}) {

    return (
        !active ? (
            <Stack>
                <CustomButton name="Connect Wallet" onClick={onOpen}/>
                <VStack justifyContent="center" alignItems="center" padding="10px 0">
                    <HStack>
                        <Text>{`Connection Status: `}</Text>
                        <WarningIcon color="#cd5700" />
                    </HStack>
                    <HStack>
                        <Text>{`Account: `}</Text>
                        <Text>{`Not Connected`}</Text>
                    </HStack>
                    <HStack>
                        <Text>{`Network: `}</Text>
                        <Text>{`Not Connected`}</Text>
                    </HStack>
                    <HStack>
                        <Text>{`Library: `}</Text>
                        <Text>{`Not Connected`}</Text>
                    </HStack>
                    <Balance account={account} library={library} />
                </VStack>
            </Stack>
        ) : (
            <Stack>
                <CustomButton name="Disconnect Wallet" onClick={disconnect}/>
                <VStack justifyContent="center" alignItems="center" padding="10px 0">
                    <HStack>
                        <Text>{`Connection Status: `}</Text>
                        <CheckCircleIcon color="green" />
                    </HStack>
                    <HStack>
                        <Text>{`Account: `}</Text>
                        <Text>{account}</Text>
                    </HStack>
                    <HStack>
                        <Text>{`Network: `}</Text>
                        <Text>{chainId}</Text>
                    </HStack>
                    <HStack>
                        <Text>{`Library: `}</Text>
                        <Text>{library.name}</Text>
                    </HStack>
                    <Balance account={account} library={library} />
                </VStack>
            </Stack>
        )
    )
}