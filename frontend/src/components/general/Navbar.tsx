import { toast } from "sonner";
import { Button } from "../ui/button";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { logoutUser } from "@/api/auth/auth.api";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await logoutUser();
      toast.success("Logged Out Successfully");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <header className="backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold tracking-tight">NoterAI</h1>
        <Button
          onClick={handleLogout}
          disabled={loading}
          className="cursor-pointer text-gray-900"
          variant="outline"
        >
          {loading ? <Spinner /> : "Logout"}
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
