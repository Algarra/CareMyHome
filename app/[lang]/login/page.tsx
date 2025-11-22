import { Title, titleSize } from "../../components/atoms/title";
import { Navbar } from "../../components/organisms/navbar";
import { localizedT } from "../../utils";
import login from "../../utils/staticImages/login.webp";
import { Text } from "../../components/atoms/text";
import { RedirectIfUserIsLoggedIn } from "./components/RedirectIfUserDontExist";
import { SignUpLogInform } from "./components/form";
import Image from "@/utils/image";
import { GoogleLoginButton } from "@/app/components/molecules/googleLoginButton";
import { cookies } from "next/headers";

const Login = async ({ params = { lang: "en" } }: any) => {
  const { lang } = await params;
  const t = localizedT(lang);
  const authToken = (await cookies()).get("authToken");

  return (
    <>
      <Navbar actualLocale={t("actualLocale")} />
      <RedirectIfUserIsLoggedIn cookie={authToken?.value} />
      <style>
        {`
        @media screen and (min-width: 768px) {
          .loginImageTransparencie {
            mask-image: linear-gradient(
              to right,
              rgba(0, 0, 0, 2),
              rgba(0, 0, 0, 0) 95%
            );
          }
        }
      `}
      </style>
      <section className="h-screen justify-center flex">
        <div className="container h-full px-6 pt-14 pb-8">
          <div className="g-6 flex h-full w-full flex-wrap items-center justify-center ">
            <div className="md:w-6/12 ">
              <div className=" left-0 top-0 absolute w-[50%] h-full hidden md:flex">
                <Image
                  src={login}
                  fill
                  className=" loginImageTransparencie object-cover object-left"
                  alt="Login illustration"
                />
              </div>
            </div>

            <div className="w-full md:w-6/12 mb-5 ">
              <div className=" w-full text-center mb-5 ">
                <Title
                  size={titleSize.H1}
                  titleClasses=" dark:text-white mb-5 text-xl md:text-[2em] font-bold"
                >
                  {t("/login.title")}
                </Title>
                <Text textClasses="dark:text-white">{t("/login.text")}</Text>
              </div>
              <form className="flex flex-col ">
                <SignUpLogInform actualLoacale={t("actualLocale")} />
                <GoogleLoginButton actualLocale={t("actualLocale")} />
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
