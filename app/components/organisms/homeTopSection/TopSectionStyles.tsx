export const TopSectionStyles = () => {
  return (
    <style>
      {`
        .homeMapTransparency {
          mask-image: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.7),
            rgba(0, 0, 0, 0) 60%
          );
          filter: blur(2px);
        }

        @media screen and (min-width: 1024px) {
          .homeMapTransparency {
            mask-image: linear-gradient(
              to left,
              rgba(0, 0, 0, 0.7),
              rgba(0, 0, 0, 0) 60%
            );
          }
        }
      `}
    </style>
  );
};
