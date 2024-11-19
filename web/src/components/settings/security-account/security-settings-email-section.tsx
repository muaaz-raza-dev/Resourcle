import { Input } from "@/shadcn/components/ui/input"
import { Label } from "@/shadcn/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shadcn/components/ui/card"
import { Button } from "@/shadcn/components/ui/button"
import useFetchSecurityInfo from "@/hooks/settings/useFetchSecurityInfo"
export default function SecuritySettingsEmailSection() {
    const {data } =  useFetchSecurityInfo()
    const q=data?.payload;
  return (
    <Card className="bg-transparent shadow-none border-none rounded-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Update Email</CardTitle>
        <CardDescription>
          Use the form below to update your email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-email">Current Email</Label>
            <Input
            value={q?.email}
              id="current-email"
              type="email"
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-email">New Email</Label>
            <Input
              id="new-email"
              type="email"
              placeholder="Enter new email"
            />
          </div>
          <Button
            className="w-full bg-gray-400 hover:bg-gray-500"
            type="submit"
          >
            Send Verification Link
          </Button>
        </form>
      </CardContent>
    </Card> 
  )
}
