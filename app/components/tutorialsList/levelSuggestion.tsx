import TutorialCategoryCardatIndex from "../cards/tutorialCategoryCardatIndex";

export default function SuggestionTutorial ({categories, showCategoryTutorialsModal}:{categories:any, showCategoryTutorialsModal:any}) {

    return (
        <div id="suggestions">
          <div id="category-title">
            <h1>SUGGESTIONS</h1>
          </div>
          <div id="wrapper-suggestions-cards">
            <TutorialCategoryCardatIndex categories={categories} showCategoryTutorialsModal={showCategoryTutorialsModal} index={10}/>
            <TutorialCategoryCardatIndex categories={categories} showCategoryTutorialsModal={showCategoryTutorialsModal} index={0}/>
          </div>
        </div>
    );
}