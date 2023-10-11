import { Select } from "@chakra-ui/react";
import CustomButton from "../button/button";
import CustomSwitch from "../switch/customSwitch";
import { LanguageContext } from "../LanguageSwitcher/language";
import React from "react";

export default function OptionEditor({ changeLang, scoring, switchText, changeTheme }: { changeLang: any, scoring: any, switchText: any, changeTheme: any }) {
  const { dictionary } = React.useContext(LanguageContext);

  return (
    <div id="editor_opt">
      <CustomButton name="ScoreBoard" id="upload" onClick={scoring} gap={undefined} srcImg={undefined} alt={undefined} size={undefined} disabled={undefined} variant={undefined} hImg={undefined} wImg={undefined} borderRadius={undefined} />
      <Select w="30" variant="filled" id="lang_choice"
        onChange={(e) => changeLang(e.target.value)}
      >
        <option value="">{dictionary.tutorial.tutorial_choose_language}</option>
        <option value={"js"} onClick={() => changeLang('js')}>javascript</option>
        <option value={"cpp"} onClick={() => changeLang('cpp')}>cpp</option>
        <option value={"py"} onClick={() => changeLang('py')}>python</option>
        <option value={"R"} onClick={() => changeLang('R')}>R</option>
        <option value={"c"} onClick={() => changeLang('c')}>c</option>
        <option value={"solidity"} onClick={() => changeLang('solidity')}>solidity</option>
      </Select>
      <CustomSwitch switchText={switchText} changeTheme={changeTheme} />
    </div>
  )
}