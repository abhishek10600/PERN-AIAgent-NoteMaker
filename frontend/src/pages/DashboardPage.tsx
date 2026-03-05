import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/general/Navbar";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAllNotes } from "@/api/notes/note.api";
import { aiAgent } from "@/api/ai/ai.api";
import { Spinner } from "@/components/ui/spinner";

interface Note {
  id: string;
  content: string;
  isCompleted: boolean;
}

const DashboardPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [sendMessageLoading, setSendMessageLoading] = useState<boolean>(false);

  const fetchNotes = async () => {
    try {
      const response = await getAllNotes();
      setNotes(response.data);
      // console.log(response.data);
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const sendMessage = async () => {
    try {
      setSendMessageLoading(true);
      const response = await aiAgent(message);
      setMessage("");
      await fetchNotes();
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setSendMessageLoading(false);
    }
  };

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
            {notes.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No notes yet. Ask the AI agent to create one.
              </p>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  className={`p-4 rounded-xl border ${
                    note.isCompleted
                      ? "bg-green-900/20 border-green-500/30"
                      : "bg-[#111827] border-white/10"
                  }`}
                >
                  <p
                    className={`text-sm ${
                      note.isCompleted ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {note.content}
                  </p>

                  <div className="mt-3 text-xs">
                    {note.isCompleted ? (
                      <span className="text-green-400">✓ Completed</span>
                    ) : (
                      <span className="text-yellow-400">Pending</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* AGENT INPUT */}
      <footer className="border-t border-white/10 bg-[#0b0f19]/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex gap-3">
          <Input
            placeholder="Tell the agent what to do..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-[#111827] border-white/10 focus-visible:ring-indigo-500"
          />

          <Button
            onClick={sendMessage}
            disabled={sendMessageLoading}
            className="bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-900/30 cursor-pointer"
          >
            {sendMessageLoading ? (
              <div className="flex justify-center items-center gap-2">
                <Spinner />
              </div>
            ) : (
              "Send"
            )}
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;
