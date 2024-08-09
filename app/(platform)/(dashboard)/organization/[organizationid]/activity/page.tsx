import { auth } from "@clerk/nextjs/server";
import ActivityModal from "./_components/activity-modal";
import { redirect } from "next/navigation";

const Activity = () => {
  const { userId, orgId } = auth();
  if (!userId && !orgId) {
    redirect("/select-org");
  }

  return (
    <>
      <ActivityModal orgId={orgId} />
    </>
  );
};

export default Activity;
