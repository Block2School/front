import TutorialCategoryCard from "../cards/tutorialCategoryCard";

export default function TutorialCategoryCardatIndex({ categories, index, categoryName, showCategoryTutorialsModal }: { categories: any, index: number, categoryName: string, showCategoryTutorialsModal: any }) {

  return (
    <div id="suggestions-cards">
      {/* {categories.map((item: { name: string, image: string, description: string }) => {
        return (
          <TutorialCategoryCard
            name={item.name}
            image={item.image}
            description={item.description}
            callback={() => showCategoryTutorialsModal(item.name)}
          />
        )
      }).at(index)
      } */}
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
        // instead of using .at(index), use categoryName
        .filter((item: { props: { name: any; }; name: string; }) => {
          console.log('item.props.name == ', item.props.name)
          console.log('categoryName == ', categoryName)
          if (item.props.name === categoryName) console.log('item.props.name === categoryName');
          return item.props.name === categoryName
        })
      }
    </div> //10 pour accèder bon tutoriel test markdown
  );
}