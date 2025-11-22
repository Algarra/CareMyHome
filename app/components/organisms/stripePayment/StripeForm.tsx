"use client";
import {
  PaymentElement,
  useElements,
  useStripe,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { FC, useState, useRef } from "react";
import { OutlinedButton } from "../../atoms/buttons/outlinedButton";
import { tshirtSizes } from "../../theme/tshirtSizes";
import { Colors } from "../../theme/colors";
import { useCartStore } from "@/app/zustand/cart";
import { be_service, local_url, stripe_client_key } from "@/app/utils/Fixtures";
import { Stripe } from "@stripe/stripe-js";
import { Spinner } from "../../atoms/spinner";
import { TranslationT } from "@/app/utils";
import { useNotificationsStore } from "@/app/zustand/notifications";
import { NotificationOptions } from "@/app/types/notification";
import { Order, OrderPaymentApprovedDTO } from "./types";
import { useRouter } from "next/navigation";

export const StripeForm: FC<{
  stripePromise: Stripe | null;
  client: Order["client"];
  t: TranslationT;
  validate?: () => boolean;
  amount: number;
  currency: string;
  date: number;
}> = ({ stripePromise, t, validate, amount, currency, client, date }) => {
  const setNotification = useNotificationsStore(
    (state) => state.setNotification
  );
  const [Loading, setLoading] = useState(false);
  const emailRef = useRef("");
  const items = useCartStore((state) => state.items);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    console.log(emailRef.current);

    if (validate) {
      const validated = validate();

      if (!validated) {
        setLoading(false);
        return;
      }
    }

    if (elements == null || stripe == null) {
      setLoading(false);
      return;
    }

    const orderRequest = await fetch(
      `${be_service}/orders/create/pending-order`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client: {
            ...client,
            email: emailRef.current,
            phone: client.phone.replace("%%", " "),
          },
          amount,
          currency,
          date,
          itemsList: items.map((item) => ({
            units: item.units,
            productId: item.product._id,
          })),
        } as Order),
      }
    );
    if (!orderRequest.ok) {
      setLoading(false);
      return;
    }
    console.log(document.getElementById("Field-emailInput"));
    const { token } = await orderRequest.json();

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();

    if (submitError?.message) {
      // Show error to your customer
      setNotification({
        type: NotificationOptions.ERROR,
        message: submitError.message,
      });
      setLoading(false);
      return;
    }

    const sresult = await stripe.confirmPayment({
      // `Elements` instance that was used to create the Payment Element
      elements,
      clientSecret: stripe_client_key,
      redirect: "if_required",
      confirmParams: {
        return_url: `${local_url}${t("localePath")}/payment/success/${token}`,
        payment_method_data: {
          billing_details: {
            email: client.email,
            name: `${client.name} ${client.lastName}`,
          },
        },
      },
    });

    if (sresult?.error?.message) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setNotification({
        type: NotificationOptions.ERROR,
        message: sresult.error.message,
      });
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      await fetch(`${be_service}/orders/payment/update`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        } as OrderPaymentApprovedDTO),
      });
      router.push(`${t("localePath")}/payment/success`);
    }
    setLoading(false);
  };

  return (
    <form id="sptripe-payment-form" onSubmit={handleSubmit}>
      <div id="test">
        <LinkAuthenticationElement
          options={{
            defaultValues: {
              email: client.email,
            },
          }}
          onChange={(e) => (emailRef.current = e.value.email)}
          id="link-autentication-element"
        />
      </div>
      <PaymentElement id="payment-element" />

      <p className="mt-3 mb-3">{t("components.StripeForm.makeSureText")}</p>

      <div className=" w-full pt-5">
        <OutlinedButton
          onClick={handleSubmit}
          disabled={!items.length || stripePromise == null || Loading}
          buttonClasses=" w-full lg:mt-auto "
          innerSpanClasses="w-full flex justify-center gap-2"
          // @ts-expect-error
          type="submit"
          size={tshirtSizes.EXTRA_LARGE}
          color={Colors.GREEN}
        >
          {Loading ? (
            <>
              {t("components.StripeForm.loading")}...{" "}
              <span className="-mt-[3px]">
                <Spinner color={Colors.GREEN} size={5} />
              </span>
            </>
          ) : (
            <>{t("components.StripeForm.payNow")}</>
          )}
        </OutlinedButton>
      </div>
    </form>
  );
};
