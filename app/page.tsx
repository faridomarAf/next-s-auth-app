import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default async function Home() {

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black to-white">
      <div className="space-y-6 w-full text-center">
         <h1 className="text-6xl font-bold text-white drop-shadow-xl">🔐 Auth</h1>
         <p className="font-semibold text-xl text-yellow-100 drop-shadow-2xl">
          A Complete Next-js Auth Application
         </p>
         <div>
          <LoginButton>
            <Button size={'lg'} variant={'outline'} className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black to-white text-white">
              Sign in
            </Button>
          </LoginButton>
         </div>
      </div>
    </div>
  );
}
