import { Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import CustomButton from '../button/button'


export default function UploadEditor({ isUploading, uploadCode }: { isUploading: any, uploadCode: any }) {
  const [isConnected, setIsConnected] = useState(false);

  const uploadCodeModified = () => {
    const token = sessionStorage.getItem('token');
    if (token) setIsConnected(true); else setIsConnected(false);
    if (!token) return;
    uploadCode()
  }

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) setIsConnected(true); else setIsConnected(false);
  }, []);

  if (sessionStorage.getItem('token') === null || isConnected === false) {
    return (
      <div id="submit-button">
        <CustomButton
          name="Please login first"
          id="upload"
          size="lg"
          disabled={true}
          variant="success"
          onClick={uploadCodeModified}
          gap={undefined}
          srcImg={undefined}
          alt={undefined}
          hImg={undefined}
          wImg={undefined}
          borderRadius={undefined}
          categoryGA={"Tutorial Upload Editor"}
          labelGA={"Submit Button"}
        />
      </div>
    )
  }

  return (
    <div id="submit-button">
      {
        (isUploading === false) ?
          <CustomButton
            name="Submit"
            id="upload"
            size="lg"
            disabled={isUploading}
            variant="success"
            onClick={uploadCodeModified}
            gap={undefined}
            srcImg={undefined}
            alt={undefined}
            hImg={undefined}
            wImg={undefined}
            borderRadius={undefined}
            categoryGA={"Tutorial Upload Editor"}
            labelGA={"Submit Button Spinner"} /> :
          <Spinner
            animation="border"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
      }
    </div>
  )
}