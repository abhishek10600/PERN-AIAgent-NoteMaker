import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { loginUserSchema, type LoginUserFormData } from "@/schemas/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { loginUser } from "@/api/auth/auth.api";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginUserFormData>({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit = async (data: LoginUserFormData) => {
    console.log(data);
    try {
      setLoading(true);
      setServerError(null);
      const response = await loginUser(data);
      const userName: string = response.data.user.name;
      toast.success(`Welcome back! ${userName}`);
      navigate("/");
      reset();
    } catch (error: any) {
      setServerError(error.message);
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-10"
          >
            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-gray-400">Email</Label>
              <div className="relative">
                <Input
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  className="bg-[#0b0f19] border-white/10 focus-visible:ring-indigo-500 text-gray-200 py-5"
                />
                {errors.email && (
                  <p className="absolute left-0 top-full mt-1 text-xs text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-gray-400">Password</Label>
              <div className="relative">
                <Input
                  type="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className="bg-[#0b0f19] border-white/10 focus-visible:ring-indigo-500 text-gray-200 py-5"
                />
                {errors.password && (
                  <p className="absolute left-0 top-full mt-1 text-xs text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-900/30 cursor-pointer py-5"
            >
              {loading ? (
                <div className="flex gap-2 justify-center items-center">
                  <Spinner />
                  Logging You In
                </div>
              ) : (
                "Sign In"
              )}
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
