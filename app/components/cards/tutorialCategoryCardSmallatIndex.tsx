import TutorialCategoryCardSmall from "../cards/tutorialCategoryCardSmall";

export default function TutorialCategoryCardSmallatIndex ({categories, index, showCategoryTutorialsModal}: {categories:any, index:number, showCategoryTutorialsModal:any}) {

    return (
        <div id="card">
            {categories.map((item: { name: string, image: string, description: string }) => {
              return (
                <TutorialCategoryCardSmall
                  name={item.name}
                  image={item.image}
                  description={item.description}
                  callback={() => showCategoryTutorialsModal(item.name)}
                />
              )}).at(index)
            }
        </div>//10 pour accèder bon tutoriel test markdown
    );
}