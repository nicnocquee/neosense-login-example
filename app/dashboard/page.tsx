import { cookies } from "next/headers";
import LoginToNeosense from "./login";
import Link from "next/link";
import Logout from "./logout";

export default function Dashboard() {
  const email = cookies().get("email")?.value;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-4">
          {email ? (
            <>
              <h2 className="text-lg font-medium leading-6 text-gray-900">
                Dashboard
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                This is a demo dashboard page. Click the Login to Neosense
                button.
              </p>
              <LoginToNeosense email={email} />
              <Logout />
            </>
          ) : (
            <div>
              Please{" "}
              <Link className="text-primary underline" href="/">
                login
              </Link>{" "}
              to Neosense
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
