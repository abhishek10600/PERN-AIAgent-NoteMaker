import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className="relative w-full max-w-md px-6">
      <Card className="bg-[#111827]/80 backdrop-blur border border-white/10 rounded-2xl shadow-2xl">
        <CardContent className="p-8">
          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-200">
              NoterAI
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              Sign in to your workspace
            </p>
          </div>

          {/* FORM */}
          <form className="flex flex-col gap-6">
            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-gray-400">Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-[#0b0f19] border-white/10 focus-visible:ring-indigo-500 text-gray-200 py-5"
              />
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-gray-400">Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                className="bg-[#0b0f19] border-white/10 focus-visible:ring-indigo-500 text-gray-200 py-5"
              />
            </div>

            {/* LOGIN BUTTON */}
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-900/30 cursor-pointer py-5"
            >
              Sign In
            </Button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-gray-500">OR</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* SIGNUP */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-400 hover:text-indigo-300"
            >
              Create one
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
