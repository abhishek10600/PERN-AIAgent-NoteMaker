import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/general/Navbar";
import { useEffect, useRef, useState, useCallback } from "react";
import { toast } from "sonner";
import { getAllNotes } from "@/api/notes/note.api";
import { aiAgent } from "@/api/ai/ai.api";
import { Spinner } from "@/components/ui/spinner";
import { Mic, MicOff } from "lucide-react";

interface Note {
  id: string;
  content: string;
  isCompleted: boolean;
}

type VoiceState = "idle" | "listening" | "processing" | "sending";

const DashboardPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [sendMessageLoading, setSendMessageLoading] = useState<boolean>(false);
  const [listening, setListening] = useState(false);
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");

  const recognitionRef = useRef<any>(null);
  const sendMessageRef = useRef<(msg?: string) => Promise<void>>(
    async () => {},
  );

  const fetchNotes = async () => {
    try {
      const response = await getAllNotes();
      setNotes(response.data);
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const sendMessage = useCallback(
    async (msg?: string) => {
      const finalMessage = msg ?? message;

      if (!finalMessage.trim()) return;

      try {
        setSendMessageLoading(true);
        setVoiceState("sending");

        await aiAgent(finalMessage);

        setMessage("");
        await fetchNotes();
      } catch (error: any) {
        toast.error(error?.message);
      } finally {
        setSendMessageLoading(false);
        setVoiceState("idle");
      }
    },
    [message],
  );

  // Keep ref always pointing to the latest sendMessage
  useEffect(() => {
    sendMessageRef.current = sendMessage;
  }, [sendMessage]);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    let silenceTimer: any = null;
    let finalTranscript = "";

    recognition.onresult = (event: any) => {
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      const combined = finalTranscript + interimTranscript;
      setMessage(combined);

      clearTimeout(silenceTimer);

      silenceTimer = setTimeout(() => {
        if (finalTranscript.trim()) {
          setVoiceState("processing");

          const transcriptToSend = finalTranscript.trim();
          finalTranscript = "";

          setTimeout(() => {
            // Use ref to avoid stale closure
            sendMessageRef.current(transcriptToSend);
          }, 800);

          recognition.stop();
          setListening(false);
        }
      }, 1500);
    };

    recognition.onerror = () => {
      setListening(false);
      setVoiceState("idle");
      toast.error("Speech recognition error");
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
      setVoiceState("idle");
    } else {
      setMessage("");
      recognitionRef.current.start();
      setListening(true);
      setVoiceState("listening");
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
        <div className="max-w-6xl mx-auto px-6 py-3">
          {/* VOICE STATUS */}
          {voiceState !== "idle" && (
            <div className="text-xs text-gray-400 flex items-center gap-2 mb-2">
              {voiceState === "listening" && (
                <>
                  <span className="animate-pulse text-red-400">●</span>
                  Listening...
                </>
              )}

              {voiceState === "processing" && (
                <>
                  <Spinner />
                  Processing speech...
                </>
              )}

              {voiceState === "sending" && (
                <>
                  <Spinner />
                  Sending to AI...
                </>
              )}
            </div>
          )}

          <div className="flex gap-3 items-center">
            <Input
              placeholder="Tell the agent what to do..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-[#111827] border-white/10 focus-visible:ring-indigo-500"
            />

            {/* MIC BUTTON */}
            <Button
              type="button"
              onClick={toggleListening}
              className={`shadow-lg cursor-pointer ${
                listening
                  ? "bg-red-500 hover:bg-red-400"
                  : "bg-indigo-600 hover:bg-indigo-500"
              }`}
            >
              {listening ? <MicOff size={18} /> : <Mic size={18} />}
            </Button>

            {/* SEND BUTTON */}
            <Button
              onClick={() => sendMessage()}
              disabled={sendMessageLoading}
              className="bg-indigo-600 hover:bg-indigo-500 shadow-lg cursor-pointer"
            >
              {sendMessageLoading ? <Spinner /> : "Send"}
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;
