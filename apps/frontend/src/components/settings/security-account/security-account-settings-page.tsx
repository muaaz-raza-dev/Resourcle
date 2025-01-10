import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shadcn/components/ui/card"
import { Separator } from "@/shadcn/components/ui/separator";
import SecuritySettingsPasswordSection from "./security-settings-password-section";
import SecuritySettingsEmailSection from "./security-settings-email-section";
import SecuritySettingsProvidersSection from "./security-settings-providers-section";
import DeleteAccountButton from "./delete-account-button";
import SecurityAccountEmailVerificationSettings from "./security-account-email-verification-settings";
export default function SecurityAccountSettingsPage() {
  return (
    <div className="max-w-2xl  ">
    <SecuritySettingsPasswordSection/>
    <Separator/>
    <SecuritySettingsEmailSection/>
    <Separator/>
    <SecurityAccountEmailVerificationSettings/>
    <Separator/>
    <SecuritySettingsProvidersSection/>
    <Separator/>
    <Card className="bg-transparent shadow-none border-none rounded-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Delete Account</CardTitle>
        <CardDescription>
        Deleting your account will permanently remove all associated data, including your resources, collections, and other related information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DeleteAccountButton/>
      </CardContent>
    </Card>
  </div>
  )
}
