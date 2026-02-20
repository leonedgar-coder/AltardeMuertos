export default function Loading() {
    return (
        <div className="min-h-screen bg-[#1a0f02] flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-orange-200 animate-pulse italic">Preparando el altar...</p>
        </div>
    );
}
