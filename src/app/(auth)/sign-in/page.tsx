import { NavLink } from "~/app/_components/NavLink";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { SignInForm } from "~/_components/modules/auth/SignInForm";

export default function SignInPage() {
  return (
    <Card className="border border-gray-300">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-gray-800">Sign in</CardTitle>
        <CardDescription className="text-gray-600">
          Sign in with email and password or Discord
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <SignInForm />
        <div className="relative">
          <span className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </span>
          <span className="relative mx-auto flex w-fit justify-center bg-white px-3 text-xs text-gray-600 uppercase">
            or
          </span>
        </div>
        <NavLink
          href="/api/auth/signin/discord"
          variant="outline"
          className="w-full font-medium"
        >
          Sign in with Discord
        </NavLink>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 text-center text-sm text-gray-600">
        <span>Don&apos;t have an account?</span>
        <NavLink href="/sign-up" variant="link">
          Sign up
        </NavLink>
      </CardFooter>
    </Card>
  );
}
