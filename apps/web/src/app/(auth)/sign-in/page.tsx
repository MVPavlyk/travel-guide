import * as Tooltip from "@radix-ui/react-tooltip";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  NavLink,
} from "@travel-guide/ui";
import { SignInForm } from "~/_components/modules/auth/SignInForm";

export default function SignInPage() {
  return (
    <Card className="border border-gray-300">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-gray-800">Sign in</CardTitle>
        <CardDescription className="text-gray-600">
          Sign in with email and password
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
        <Tooltip.Provider delayDuration={300}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <span className="inline-block w-full">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full cursor-not-allowed font-medium opacity-60"
                  disabled
                >
                  Sign in with Discord
                </Button>
              </span>
            </Tooltip.Trigger>
            <Tooltip.Content
              sideOffset={6}
              className="rounded bg-gray-800 px-3 py-2 text-sm text-white shadow"
            >
              Coming soon
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>
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
