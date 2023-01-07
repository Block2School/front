import { Select} from "@chakra-ui/react";
import CustomButton from "../button/button";
import CustomSwitch from "../switch/customSwitch";

export default function OptionEditor ({changeLang, scoring, switchText, changeTheme}:{changeLang:any, scoring:any, switchText:any, changeTheme:any}) {

    return (
        <div id="editor_opt">
          <CustomButton name="ScoreBoard" id="upload" onClick={() => scoring()}/>
          <Select w="30" variant="filled" id="lang_choice">
            <option selected hidden disabled value="">Chose Language</option>
            <option onClick={() => changeLang('js')}>javascript</option>
            <option onClick={() => changeLang('cpp')}>cpp</option>
            <option onClick={() => changeLang('python')}>python</option>
          </Select>
          <CustomSwitch switchText={switchText} changeTheme={changeTheme}/>
        </div>
    )
}