import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <header className="backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold tracking-tight">NoterAI</h1>
        <Button className="cursor-pointer text-gray-900" variant="outline">
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
