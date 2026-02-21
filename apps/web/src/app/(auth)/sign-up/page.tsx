import { NavLink } from "~/_components/modules/common/NavLink";
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
    <Card className="border border-gray-300">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-gray-800">Sign up</CardTitle>
        <CardDescription className="text-gray-600">
          Create an account with email and password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter className="flex flex-col gap-2 text-center text-sm text-gray-600">
        <span>Already have an account?</span>
        <NavLink href="/sign-in" variant="link">
          Sign in
        </NavLink>
      </CardFooter>
    </Card>
  );
}
