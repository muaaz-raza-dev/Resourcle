"use client";
import ResourceLoader from "@/components/landing page/loader/resource-loader";
import SecurityAccountSettingsPage from "@/components/settings/security-account/security-account-settings-page";
import useFetchSecurityInfo from "@/hooks/settings/useFetchSecurityInfo";

export default function AccountSettingsPage() {
  const {isLoading} = useFetchSecurityInfo({hitApi:true})
  if (isLoading) {
    return <ResourceLoader/>
  }
  return (
    <SecurityAccountSettingsPage/>
  )
}
