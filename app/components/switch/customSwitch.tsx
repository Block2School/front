import { Switch, Text, HStack } from '@chakra-ui/react'

export default function CustomSwitch ({switchText, changeTheme}:{switchText:string, changeTheme:any}) {

    return (
        <HStack>
            <Switch onChange={changeTheme}/>
            <Text id="switch-text">{switchText}</Text>
        </HStack>
    )
}