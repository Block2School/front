import { Spinner } from "react-bootstrap"
import CustomButton from '../button/button'


export default function UploadEditor ({isUploading, uploadCode}:{isUploading:any, uploadCode:any}) {

    return (
        <div id="submit-button">
          {(isUploading === false) ? <CustomButton name="Submit" id="upload" size="lg" disabled={isUploading} variant="success" onClick={uploadCode}/> :
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>}
        </div>
    )
}