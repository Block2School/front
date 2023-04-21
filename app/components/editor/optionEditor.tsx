import { Select} from "@chakra-ui/react";
import CustomButton from "../button/button";
import CustomSwitch from "../switch/customSwitch";

export default function OptionEditor ({changeLang, scoring, switchText, changeTheme}:{changeLang:any, scoring:any, switchText:any, changeTheme:any}) {

    return (
        <div id="editor_opt">
          <CustomButton name="ScoreBoard" id="upload" onClick={scoring}/>
          <Select w="30" variant="filled" id="lang_choice">
            <option value="">Chose Language</option>
            <option onClick={() => changeLang('js')}>javascript</option>
            <option onClick={() => changeLang('cpp')}>cpp</option>
            <option onClick={() => changeLang('py')}>python</option>
            <option onClick={() => changeLang('R')}>rust</option>
            <option onClick={() => changeLang('c')}>c</option>
            <option onClick={() => changeLang('solidity')}>solidity</option>
          </Select>
          <CustomSwitch switchText={switchText} changeTheme={changeTheme}/>
        </div>
    )
}