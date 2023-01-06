import { HStack, Text, Image } from "@chakra-ui/react";
import CountUp from 'react-countup';

export default function NavbarBalance ({balanceToken, ImgSrc, alt}:{balanceToken:any, ImgSrc:any, alt:any}) {

    return (
        balanceToken != null ? (
            <HStack>
                <CountUp
                    start={0}
                    end={balanceToken}
                    duration={0.5}
                    separator=","
                    decimal="."
                    decimals={4}
                    style={{ display:'flex', flexDirection:'row', paddingTop:'8px', color: 'white'}}
                />
                <Image
                    src={ImgSrc}
                    alt={alt}
                    height={35}
                    width={35}
                    paddingTop="3px"
                    paddingRight="7px"
                />
            </HStack>
        ) : (
            <HStack>
                <Text style={{paddingTop:"8px"}} color="white">0.0000</Text>
                <Image
                    src={ImgSrc}
                    alt={alt}
                    height={35}
                    width={35}
                    paddingTop="3px"
                    paddingRight="7px"
                />
            </HStack>
        )
    );
}