import { Spinner } from "../../atoms/spinner";
import { Navbar } from "../navbar";

export const FullPageLoader = () => {
  // Or a custom loading skeleton component
  return (
    <div className=" flex w-full h-screen justify-center ">
      <Navbar actualLocale="es" />
      <span className="m-auto">
        <Spinner size={10} />
      </span>
    </div>
  );
};
