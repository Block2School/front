import CustomSwitch from "../switch/customSwitch";
import { Checkbox, Select, Tooltip, Text } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../LanguageSwitcher/language";

export default function OptionEditorv2({
  switchText,
  changeTheme,
  selectDefaultText,
  changeLang,
  language,
  wasAlreadyCompleted,
  playingTimer
}: {
  switchText: string,
  changeTheme: any,
  selectDefaultText: string,
  changeLang: any,
  language: string,
  wasAlreadyCompleted: boolean,
  playingTimer : {minutes: number, seconds :number}
}) {

  const [displayLanguage, setDisplayLanguage] = useState('');
  const { dictionary } = useContext(LanguageContext);

  useEffect(() => {
    if (language == "py") setDisplayLanguage("python");
    else if (language == "js") setDisplayLanguage("javascript");
    else if (language == "cpp") setDisplayLanguage("cpp");
    else if (language == "c") setDisplayLanguage("c");
    else if (language == "R") setDisplayLanguage("r");
    else if (language == "solidity") setDisplayLanguage("solidity");
    else setDisplayLanguage("");
    console.log("displayLanguage is: ", displayLanguage);
  }, [])

  return (
    <div id="editor_opt">
      <div
        style={{
          paddingLeft: "5%",
        }}
      >
        <Tooltip
          label={
            wasAlreadyCompleted ?
              dictionary.option_editorv2.tooltip_was_already_completed :
              dictionary.option_editorv2.tooltip_was_not_completed
          }
          aria-label="A tooltip"
          placement="left"
          fontSize={"md"}
          hasArrow
          shouldWrapChildren
        >
          <Checkbox
            colorScheme={wasAlreadyCompleted ? "green" : "red"}
            defaultChecked
            isReadOnly
            paddingLeft={"4%"}
            size={"xlg"}
          />
        </Tooltip>
      </div>
      <Text fontSize="xl" color="blue.500">
        {String(playingTimer.minutes).padStart(2, '0')}:{String(playingTimer.seconds).padStart(2, '0')}
      </Text>
      <Select w="30" variant="filled" id="lang_choice"
        onChange={(e) => changeLang(e.target.value)}
      >
        <option value="">{selectDefaultText}</option>
        <option value={language}>{displayLanguage}</option>
      </Select>
      <CustomSwitch switchText={switchText} changeTheme={changeTheme} />
    </div>
  );
}