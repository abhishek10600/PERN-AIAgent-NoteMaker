import RegisterForm from "@/components/RegisterPageComponents/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center text-gray-200">
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[radial-gradient(circle_at_top,#111827_0%,#0b0f19_60%)]">
        <div className="absolute w-125 h-125 bg-indigo-600/10 blur-[120px] rounded-full -top-40 -left-40" />
        <div className="absolute w-125 h-125 bg-purple-600/10 blur-[120px] rounded-full bottom-0 right-0" />
      </div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
