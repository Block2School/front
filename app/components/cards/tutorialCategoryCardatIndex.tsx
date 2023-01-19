import TutorialCategoryCard from "../cards/tutorialCategoryCard";

export default function TutorialCategoryCardatIndex ({categories, index, showCategoryTutorialsModal}: {categories:any, index:number, showCategoryTutorialsModal:any}) {

    return (
      <div id="suggestions-cards">
        {categories.map((item: { name: string, image: string, description: string }) => {
          return (
            <TutorialCategoryCard
              name={item.name}
              image={item.image}
              description={item.description}
              callback={() => showCategoryTutorialsModal(item.name)}
            />
          )}).at(index)
        }
      </div> //10 pour accèder bon tutoriel test markdown
    );
}