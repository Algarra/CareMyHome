import { OutlinedButton } from "../../atoms/buttons/outlinedButton";
import { Title, titleSize } from "../../atoms/title";

export const InternalNavigation = () => {
  return (
    <div className=" gap-2 flex flex-wrap">
      <Title
        size={titleSize.H1}
        titleClasses=" text-2xl md:text-3xl dark:text-white mr-5 mb-2 "
      >
        Creator
      </Title>

      <OutlinedButton href="/host/creator">Hosts</OutlinedButton>
      <OutlinedButton href="/blog/creator">Articles</OutlinedButton>
    </div>
  );
};
