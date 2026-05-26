import Navbar from "@/components/Navbar";
import SubsidiaryNavbar from "@/components/SubsidiaryNavbar";
import SubsidiaryFooter from "@/components/SubsidiaryFooter";
import FastCleanersApplicationForm from "@/components/FastCleanersApplicationForm";

export const metadata = {
  title: "Apply as Fast Cleaners Employee | Fast Cleaners",
  description: "Join Fast Cleaners as a part-time employee and earn flexible income. Apply now to start cleaning jobs across Ghana.",
};

export default function ApplyPage() {
  return (
    <>
      <SubsidiaryNavbar subsidiary="fast-cleaners" />
      <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Join Our Team
            </h1>
            <p className="text-lg text-gray-400">
              Become a Fast Cleaners employee and work flexible hours across Ghana
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-8 shadow-2xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Employment Application</h2>
              <p className="text-gray-400">
                Fill out this form to apply as a part-time cleaner. Our admin team will review your application and contact you within 24-48 hours.
              </p>
            </div>

            <FastCleanersApplicationForm />

            {/* Info Box */}
            <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
              <p className="text-sm text-gray-300">
                <strong className="text-orange-400">What happens next?</strong> After submission, our team will review your application. 
                Approved employees will receive job notifications via SMS and can start accepting cleaning jobs immediately.
              </p>
            </div>
          </div>
        </div>
      </main>
      <SubsidiaryFooter subsidiary="fast-cleaners" />
    </>
  );
}
