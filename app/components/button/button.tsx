import { Button, Image, Text, HStack, useColorModeValue } from '@chakra-ui/react';

export default function CustomButton ({id,name,srcImg,alt,size,disabled,variant,onClick,hImg,wImg,gap,borderRadius}:{gap:any, id:any, name:any, srcImg:any, alt:any ,size:any, disabled:any, variant:any, onClick:any, hImg:any, wImg:any,borderRadius:any}) {

    const color = useColorModeValue("black", "white");

    return (
        <Button id={id} size={size} disabled={disabled} variant={variant} onClick={onClick}> 
            <HStack gap={gap} color={color}>
                {srcImg != null ? (
                    <Image src={srcImg} width={wImg} height={hImg} alt={alt} borderRadius={borderRadius}/>
                ):(null)}
                <Text>{name}</Text>
            </HStack>
        </Button>
    );
}