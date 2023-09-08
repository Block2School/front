import TutorialCategoryCardSmall from "../cards/tutorialCategoryCardSmall";

export default function TutorialCategoryCardSmallatIndex({ categories, index, categoryToDisplay, showCategoryTutorialsModal }: { categories: any, index: number, categoryToDisplay: string, showCategoryTutorialsModal: any }) {
  let idx = 0;

  return (
    <div id="card">
      {/* {categories.map((item: { name: string, image: string, description: string }) => {
        return (
          <TutorialCategoryCardSmall
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
            <TutorialCategoryCardSmall
              name={item.name}
              image={item.image}
              description={item.description}
              callback={() => showCategoryTutorialsModal(item.name)}
              key={item.name + idx++}
            />
          )
        })
          .filter((item: { props: { name: any; }; name: string; }) => {
            console.log('item.props.name == ', item.props.name)
            console.log('categoryToDisplay == ', categoryToDisplay)
            if (item.props.name === categoryToDisplay) console.log('item.props.name === categoryToDisplay');
            return item.props.name === categoryToDisplay
          })
      }
    </div>//10 pour accèder bon tutoriel test markdown
  );
}