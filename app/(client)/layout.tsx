import Footer from "@/components/common/footer";
import Navigation from "@/components/common/navigation";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="min-h-screen bg-black text-white overflow-hidden">
        <Navigation />
        <div className="min-h-screen flex justify-center items-start bg-gradient-to-br from-gray-100 to-gray-200">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default layout;
