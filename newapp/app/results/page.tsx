import { Navbar } from '@/components/Navbar';
import { ResultsContent } from '@/components/ResultsContent';
import {GeometricShapes} from "@/components/GeometricShapes";

export default function ResultsPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="pt-20 px-4 relative">
                <GeometricShapes />
                <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
                <ResultsContent />
            </div>
        </main>
    );
}

