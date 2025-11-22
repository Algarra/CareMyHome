import { FC, ReactNode } from "react";

type KeyPointsProps = {
  title: string;
  text: string;
  keys: { icon: ReactNode; title: string; text: string }[];
};

export const KeyPoints: FC<KeyPointsProps> = ({ title, text, keys }) => {
  return (
    <section className="w-full backdrop-blur-sm bg-white/80 dark:bg-neutral-900/80 ">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-orange-500 dark:text-orange-400 ">
            {title}
          </h2>
          <p className="text-neutral-800 sm:text-xl dark:text-neutral-200">
            {text}
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-10 md:space-y-0">
          {keys.map((key, index) => (
            <div
              className="group ring-1 custom-fade-in ring-neutral-400/30 dark:ring-neutral-100/20 p-3 rounded-md backdrop-brightness-100 dark:backdrop-blur-xl bg-neutral-100/60 dark:bg-neutral-100/10 "
              key={`${key.title}-${index}`}
            >
              <div className=" group-hover:text-orange-500 dark:group-hover:text-orange-400 group-hover:animate-bounce flex justify-center text-neutral-900 dark:text-white items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                {key.icon}
              </div>
              <h3 className=" text-yellow-600 dark:text-yellow-500 mb-2 text-xl font-bold ">
                {key.title}
              </h3>
              <p className="text-neutral-800 dark:text-neutral-200">
                {key.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
