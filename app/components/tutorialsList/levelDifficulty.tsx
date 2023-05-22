import {useState} from "react";
import Image from 'next/image';
import Icon from '/public/MoreCategoryIcon.svg'
import IconW from '/public/MoreCategoryIconWhite.svg'
import TutorialCategoryCardSmallatIndex from "../cards/tutorialCategoryCardSmallatIndex";

export default function LevelTutorial ({name, categories, showCategoryTutorialsModal}:{name:any, categories:any, showCategoryTutorialsModal:any}) {

  const [currentImage, setCurrentImage] = useState(Icon);

  function handleMouse(imagePath:any) {
    return () => {
        setCurrentImage(imagePath);
        var change = document.getElementById("link")
        if (change != null && imagePath != Icon) {
          change.setAttribute('style', 'color:white');
        } else if (change != null && imagePath != IconW) {
          change.setAttribute('style', 'color:#ffe6c4');
        }
    };
  }

  return (
    <div id="cards">
      <div id="category-header">
        <div id="category-title">
          <h1>{name}</h1>
        </div>
        <div id="more-tutorials" onMouseOver={handleMouse(IconW)} onMouseOut={handleMouse(Icon)}>
          <Image width={25} height={25} src={currentImage}/>
          <a id="link" href="/tutorials/easy">VOIR PLUS</a>
        </div>
      </div>
      <div id="wrapper-cards">
        <TutorialCategoryCardSmallatIndex categories={categories} showCategoryTutorialsModal={showCategoryTutorialsModal} index={1}/>
        <TutorialCategoryCardSmallatIndex categories={categories} showCategoryTutorialsModal={showCategoryTutorialsModal} index={1}/>
        <TutorialCategoryCardSmallatIndex categories={categories} showCategoryTutorialsModal={showCategoryTutorialsModal} index={1}/>
        <TutorialCategoryCardSmallatIndex categories={categories} showCategoryTutorialsModal={showCategoryTutorialsModal} index={1}/>
      </div>
    </div>
  );
}