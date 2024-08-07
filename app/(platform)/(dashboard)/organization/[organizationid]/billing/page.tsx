import { checkSubscription } from "@/lib/subcription";
import Info from "../_components/info";
import { Separator } from "@/components/ui/separator";
import SubscriptionButton from "./_components/subcription-button";

const BillingPage = async () => {
  const isPro = await checkSubscription();
  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator className="my-2" />
      <SubscriptionButton isPro={isPro} />
    </div>
  );
};

export default BillingPage;
