import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CardTable from "@/components/CardTable";

export default function TimesheetsPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1 p-6 flex flex-col items-center">
                <CardTable />
                <Footer />
            </main>
        </div>
    );
}