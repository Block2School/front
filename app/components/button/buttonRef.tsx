import { Button, Image, Text, HStack, useColorModeValue } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { sendGAEvent } from '../../utils/utils';

// export default function CustomButtonRef ({id,name,srcImg,alt,size,disabled,variant,onClick,hImg,wImg,gap,borderRadius}:{gap:any, id:any, name:any, srcImg:any, alt:any ,size:any, disabled:any, variant:any, onClick:any, hImg:any, wImg:any,borderRadius:any}) {

//     const color = useColorModeValue("black", "white");

//     return (
//         <Button id={id} size={size} disabled={disabled} variant={variant} onClick={onClick}> 
//             <HStack gap={gap} color={color}>
//                 {srcImg != null ? (
//                     <Image src={srcImg} width={wImg} height={hImg} alt={alt} borderRadius={borderRadius}/>
//                 ):(null)}
//                 <Text>{name}</Text>
//             </HStack>
//         </Button>
//     );
// }

// export default function CustomButtonRef({ id, name, srcImg, alt, size, disabled, variant, onClick, hImg, wImg, gap, borderRadius }: { gap: any, id: any, name: any, srcImg: any, alt: any, size: any, disabled: any, variant: any, onClick: any, hImg: any, wImg: any, borderRadius: any }) {
//   const color = useColorModeValue("black", "white");

//   return (
//     <Button id={id} size={size} disabled={disabled} variant={variant} onClick={onClick}>
//       <HStack gap={gap} color={color}>
//         {srcImg != null ? (
//           <Image src={srcImg} width={wImg} height={hImg} alt={alt} borderRadius={borderRadius} />
//         ) : (null)}
//         <Text>{name}</Text>
//       </HStack>
//     </Button>
//   );
// }

const CustomButtonRef = forwardRef(({ id, name, srcImg, alt, size, disabled, variant, onClick, hImg, wImg, gap, borderRadius, categoryGA="Button", labelGA="Clicking on the button" }: { gap: any, id: any, name: any, srcImg: any, alt: any, size: any, disabled: any, variant: any, onClick: any, hImg: any, wImg: any, borderRadius: any, categoryGA: string, labelGA: string  }, ref: any) => {
  const color = useColorModeValue("black", "white");

  const handleClick = () => {
    // print the category and label of the button clicked
    console.log('category: ', categoryGA)
    console.log('label: ', labelGA)
    sendGAEvent(categoryGA, 'button_click', labelGA)
    onClick();
  }


  return (
    <>
      <Button id={id} size={size} disabled={disabled} variant={variant} onClick={onClick} ref={ref}>
        <HStack gap={gap} color={color}>
          {srcImg != null ? (
            <Image src={srcImg} width={wImg} height={hImg} alt={alt} borderRadius={borderRadius} />
          ) : (null)}
          <Text>{name}</Text>
        </HStack>
      </Button>
    </>
  );
});

CustomButtonRef.displayName = 'CustomButtonRef';

export default CustomButtonRef;