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
import { SignUpForm } from "~/_components/modules/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Sign up</CardTitle>
        <CardDescription>
          Create an account with email and password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter className="flex flex-col gap-2 text-center text-sm text-muted-foreground">
        <span>Already have an account?</span>
        <Link
          href="/sign-in"
          className={buttonVariants({
            variant: "link",
            className: "h-auto p-0 text-primary",
          })}
        >
          Sign in
        </Link>
      </CardFooter>
    </Card>
  );
}
