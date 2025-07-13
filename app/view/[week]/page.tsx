import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TimesheetList from "@/components/TimesheetList";

const ListView = () => {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50 px-4 py-6 flex flex-col items-center">
                <TimesheetList />
                <Footer />
            </main>
        </>
    );
};

export default ListView;
