import Link from "next/link";

import { buttonVariants } from "~/components/ui/button";
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
          <span className="relative flex justify-center text-xs uppercase text-gray-600">
            or
          </span>
        </div>
        <Link
          href="/api/auth/signin/discord"
          className={buttonVariants({
            variant: "outline",
            className: "w-full",
          })}
        >
          Sign in with Discord
        </Link>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 text-center text-sm text-gray-600">
        <span>Don&apos;t have an account?</span>
        <Link
          href="/sign-up"
          className={buttonVariants({
            variant: "link",
            className: "text-primary h-auto p-0",
          })}
        >
          Sign up
        </Link>
      </CardFooter>
    </Card>
  );
}
