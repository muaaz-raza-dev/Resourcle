"use client";
import ProfileFormInformationLoader from "@/components/profile/profile-form-info-loader";
import SecurityAccountSettingsPage from "@/components/settings/security-account/security-account-settings-page";
import useFetchSecurityInfo from "@/hooks/settings/useFetchSecurityInfo";

export default function AccountSettingsPage() {
  const {isLoading} = useFetchSecurityInfo({hitApi:true})
  if (isLoading) {
    return <ProfileFormInformationLoader/>}
  return (
    <SecurityAccountSettingsPage/>
  )
}
