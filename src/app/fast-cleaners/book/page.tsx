import Navbar from "@/components/Navbar";
import SubsidiaryNavbar from "@/components/SubsidiaryNavbar";
import SubsidiaryFooter from "@/components/SubsidiaryFooter";
import CustomerBookingForm from "@/components/CustomerBookingForm";

export const metadata = {
  title: "Book Cleaning Service | Fast Cleaners",
  description: "Request professional cleaning services across Ghana. Fast Cleaners will match you with trained cleaners in your area.",
};

export default function BookingPage() {
  return (
    <>
      <SubsidiaryNavbar subsidiary="fast-cleaners" />
      <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Request a Cleaning Service
            </h1>
            <p className="text-lg text-gray-400">
              Professional cleaning on demand. Fill out the form below and we'll connect
              you with a trained cleaner in your area.
            </p>
          </div>

          {/* Booking Form Card */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-8 shadow-2xl mb-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Booking Details</h2>
              <p className="text-gray-400">
                Tell us about your cleaning needs. Our team will review your request and
                contact you within 1-2 hours to confirm and discuss pricing.
              </p>
            </div>

            <CustomerBookingForm />
          </div>

          {/* Info Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
              <h3 className="text-orange-400 font-bold mb-2">🕐 Fast Response</h3>
              <p className="text-sm text-gray-300">
                We respond to bookings within 1-2 hours during business hours.
              </p>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <h3 className="text-blue-400 font-bold mb-2">✓ Professional Staff</h3>
              <p className="text-sm text-gray-300">
                All our cleaners are trained and verified for quality service.
              </p>
            </div>

            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <h3 className="text-green-400 font-bold mb-2">📍 Available Nationwide</h3>
              <p className="text-sm text-gray-300">
                We operate across all regions of Ghana. Your cleaner is nearby.
              </p>
            </div>
          </div>
        </div>
      </main>
      <SubsidiaryFooter subsidiary="fast-cleaners" />
    </>
  );
}
