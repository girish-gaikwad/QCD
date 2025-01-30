import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import AnalyticsCategory from "@/components/AnalyticsCategory/page";

export const metadata: Metadata = {
  title: "Next.js Profile Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Profile page for NextAdmin Dashboard Kit",
};

const AnalyticsPage = () => {
  return (
    <DefaultLayout>
      {/* <div className="mx-auto w-full max-w-[970px]"> */}

        <AnalyticsCategory />
      {/* </div> */}
    </DefaultLayout>
  );
};

export default AnalyticsPage;
