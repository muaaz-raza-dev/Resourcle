import { Button } from "@/shadcn/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shadcn/components/ui/card"
import { Separator } from "@/shadcn/components/ui/separator";
import SecuritySettingsPasswordSection from "./security-settings-password-section";
import SecuritySettingsEmailSection from "./security-settings-email-section";
import SecuritySettingsProvidersSection from "./security-settings-providers-section";
export default function SecurityAccountSettingsPage() {
  return (
    <div className="max-w-2xl  ">
    <SecuritySettingsPasswordSection/>
    <Separator/>
    <SecuritySettingsEmailSection/>
    <Separator/>
    <SecuritySettingsProvidersSection/>
    <Separator/>
    <Card className="bg-transparent shadow-none border-none rounded-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Delete Account</CardTitle>
        <CardDescription>
          Permanently remove your account from the our server. This cannot be undone and all your progress and data will be lost.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          variant="destructive"
          className="w-full"
        >
          Delete Account
        </Button>
      </CardContent>
    </Card>
  </div>
  )
}
