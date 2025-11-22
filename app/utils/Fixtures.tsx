export const locales = ["en", "es", "fr", "de"];
export const localesPath = ["", "/es", "/fr", "/de"];

export const be_service =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3333"
    : "https://rooms-be.onrender.com";

export const be_ws =
  process.env.NODE_ENV === "development"
    ? "localhost:3333"
    : "rooms-be.onrender.com";

export const local_url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://www.roomsolvers.com";

export const stripe_client_key =
  process.env.NODE_ENV === "development"
    ? "pk_test_51Osgzz04NIPwiiccRiSuwBZKgpD1xp0kWBwOjTePOTXF064DYPF8VxNO9ktVFsIIfUmrMkeJXTJK7DZb17MFPEWt00u5IvqnUY"
    : "pk_live_51Osgzz04NIPwiiccOEUFZ76SIvi2yPsHZ3XaDLHdvTFipXmiOPvbsiawB8xOEPWkVlzfH686u0mNY5dil3dn4B2k00455wtGT7";

// export const getTeam = (t: TranslationT) => [
//   {
//     image: t("/.peopleGrid.people.danielAlgarra.image"),
//     name: t("/.peopleGrid.people.danielAlgarra.name"),
//     title: t("/.peopleGrid.people.danielAlgarra.title"),
//     description: t("/.peopleGrid.people.danielAlgarra.description"),
//     linkedInLink: t("/.peopleGrid.people.danielAlgarra.linkedInLink"),
//   },
//   {
//     image: t("/.peopleGrid.people.danielAlgarra.image"),
//     name: t("/.peopleGrid.people.danielAlgarra.name"),
//     title: t("/.peopleGrid.people.danielAlgarra.title"),
//     description: t("/.peopleGrid.people.danielAlgarra.description"),
//     linkedInLink: t("/.peopleGrid.people.danielAlgarra.linkedInLink"),
//   },
//   {
//     image: t("/.peopleGrid.people.danielAlgarra.image"),
//     name: t("/.peopleGrid.people.danielAlgarra.name"),
//     title: t("/.peopleGrid.people.danielAlgarra.title"),
//     description: t("/.peopleGrid.people.danielAlgarra.description"),
//     linkedInLink: t("/.peopleGrid.people.danielAlgarra.linkedInLink"),
//   },
// ];
