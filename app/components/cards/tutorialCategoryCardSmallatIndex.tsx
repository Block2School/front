import TutorialCategoryCardSmall from "../cards/tutorialCategoryCardSmall";

export default function TutorialCategoryCardSmallatIndex({ categories, index, categoryToDisplay, showCategoryTutorialsModal }: { categories: any, index: number, categoryToDisplay: string, showCategoryTutorialsModal: any }) {
  let idx = 0;

  return (
    <div id="card">
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
            return item.props.name === categoryToDisplay
          })
      }
    </div>
  );
}