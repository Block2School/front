import { Button, Image, Text, HStack, useColorModeValue } from '@chakra-ui/react';
import { sendGAEvent } from '../../utils/utils';
import { MixPanelTracking } from '../../services/mixpanel';

export default function CustomButton({ id, name, srcImg, alt, size, disabled, variant, onClick, hImg, wImg, gap, borderRadius, categoryGA = "Button", labelGA = "Clicking on the button"}: { gap: any, id: any, name: any, srcImg: any, alt: any, size: any, disabled: any, variant: any, onClick: any, hImg: any, wImg: any, borderRadius: any, categoryGA: string, labelGA: string }) {

    const color = useColorModeValue("black", "white");

    const handleClick = () => {
        sendGAEvent(categoryGA, 'button_click', labelGA)
        MixPanelTracking.getInstance().buttonClicked(`${categoryGA} - ${labelGA}`);
        onClick();
    }

    return (
        <Button id={id} size={size} disabled={disabled} variant={variant} onClick={() => handleClick()}>
            <HStack gap={gap} color={color}>
                {srcImg != null ? (
                    <Image src={srcImg} width={wImg} height={hImg} alt={alt} borderRadius={borderRadius} />
                ) : (null)}
                <Text>{name}</Text>
            </HStack>
        </Button>
    );
}