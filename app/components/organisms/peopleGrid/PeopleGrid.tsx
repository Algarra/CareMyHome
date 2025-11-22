import { FC } from "react";
import { Title, titleSize } from "../../atoms/title";
import { PersonCard, PersonCardProps } from "../../molecules/personCard";

type PeopleGridProps = {
  title: string;
  description: string;
  peopleList: PersonCardProps[];
};

export const PeopleGrid: FC<PeopleGridProps> = ({
  title,
  description,
  peopleList,
}) => {
  return (
    <section className="bg-white dark:bg-neutral-900 w-full">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <Title
            size={titleSize.H2}
            titleClasses="mb-4 text-4xl tracking-tight font-extrabold text-neutral-900 dark:text-white"
          >
            {title}
          </Title>

          <p className="font-light text-neutral-500 lg:mb-16 sm:text-xl dark:text-neutral-400">
            {description}
          </p>
        </div>
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          {peopleList.map((person) => (
            <PersonCard
              key={person.linkedInLink}
              image={person.image}
              name={person.name}
              title={person.title}
              description={person.description}
              linkedInLink={person.linkedInLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
