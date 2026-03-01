import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/general/Navbar";

const DashboardPage = () => {
  return (
    <div className="h-screen flex flex-col text-gray-200 bg-[#0b0f19]">
      <Navbar />

      {/* NOTES AREA */}
      <main className="flex-1 overflow-y-auto inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,#111827_0%,#0b0f19_60%)]">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h2 className="text-sm tracking-wider text-gray-400 mb-6">
            Your Workspace
          </h2>

          {/* GRID */}
          <div className="grid gap-6 pb-32 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <p className="text-gray-500 text-sm">
              No notes yet. Ask the AI agent to create one.
            </p>
          </div>
        </div>
      </main>

      {/* AGENT INPUT */}
      <footer className="border-t border-white/10 bg-[#0b0f19]/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex gap-3">
          <Input
            placeholder="Tell the agent what to do..."
            className="flex-1 bg-[#111827] border-white/10 focus-visible:ring-indigo-500"
          />

          <Button className="bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-900/30 cursor-pointer">
            Send
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;
