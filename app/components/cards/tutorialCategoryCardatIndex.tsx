import TutorialCategoryCard from "../cards/tutorialCategoryCard";

export default function TutorialCategoryCardatIndex({ categories, index, categoryName, showCategoryTutorialsModal }: { categories: any, index: number, categoryName: string, showCategoryTutorialsModal: any }) {

  return (
    <div id="suggestions-cards">
      {
        categories.map((item: { name: string, image: string, description: string }) => {
          return (
            <TutorialCategoryCard
              name={item.name}
              image={item.image}
              description={item.description}
              callback={() => showCategoryTutorialsModal(item.name)}
              key={item.name}
            />
          )
        })
        .filter((item: { props: { name: any; }; name: string; }) => {
          return item.props.name === categoryName
        })
      }
    </div>
  );
}