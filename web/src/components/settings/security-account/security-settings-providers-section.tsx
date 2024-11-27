import useFetchSecurityInfo from "@/hooks/settings/useFetchSecurityInfo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import { Database, GitMerge } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import SecuritySettingsSwitchProviderDialog from "./security-settings-switch-provider-dialog";
import SecuritySettingsProviderInfoDialog from "./security-settings-provider-info-dialog";
import GoogleAuthDialog from "@/components/auth/Attach-Google-auth-Dialog";
type Provider = "google" | "local" | "hybrid";
interface ProviderOption {
  id: Provider;
  name: string;
  icon: React.ReactNode;
}

const providers: ProviderOption[] = [
  { id: "google", name: "Google", icon: <FaGoogle className="w-6 h-6" /> },
  { id: "local", name: "Local", icon: <Database className="w-6 h-6" /> },
  { id: "hybrid", name: "Hybrid", icon: <GitMerge className="w-6 h-6" /> },
];
function SwitchButtonRenderer({currentProvider,provider}:{currentProvider:Provider,provider:ProviderOption}){
  if(currentProvider == provider.id){
    return (<button className=" text-accent text-xs font-semibold ">
      Current
    </button>)
  }
  else if(currentProvider=="hybrid"){
    return (<SecuritySettingsSwitchProviderDialog
      provider={provider.id}
      title={"Switch Provider to " + provider.id}
    >
      <button className=" text-xs font-semibold text-primary hover:underline hover:scale-105 transition-all">
        {" "}
        Switch{" "}
      </button>
    </SecuritySettingsSwitchProviderDialog>)
  }
  else if(currentProvider=="local"){
    return <GoogleAuthDialog  provider={provider.id}>
     <button className=" text-xs font-semibold text-primary hover:underline hover:scale-105 transition-all">
    Switch
  </button>
    </GoogleAuthDialog>
    }
    else if(currentProvider == "google"){
      return <label className="text-xs font-semibold text-primary hover:underline hover:scale-105 transition-all" htmlFor="new-password">Switch</label>
    }
}
export default function SecuritySettingsProvidersSection() {
  
  const { data } = useFetchSecurityInfo();
  const q = data?.payload;
  if(!q) return null
  return (
    <Card className="bg-transparent shadow-none border-none rounded-none">
      <CardHeader>
        <div className="flex justify-between">
          <div className="">
            <CardTitle className="text-2xl font-bold">
              Login Providers
            </CardTitle>
            <CardDescription>
              Use the form below to update your login methods.
            </CardDescription>
          </div>
          <SecuritySettingsProviderInfoDialog />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap  gap-4">
          {providers.map((provider) => (
            <main
              key={provider.id}
              className="flex flex-col justify-center gap-2"
            >
              <label
                htmlFor={
                  q?.provider == "google" && provider.id != "google"
                    ? "new-password"
                    : ""
                }
                className={`
                flex flex-col items-center justify-center w-28 h-28 p-4 rounded-lg cursor-pointer
                transition-all duration-200 ease-in-out
                border
                ${
                  q?.provider === provider.id
                    ? "bg-secondary-foreground text-accent scale-105"
                    : "bg-card text-card-foreground hover:bg-secondary-foreground hover:text-secondary"
                }
            `}
              >
                {provider.icon}
                <span className="mt-2 text-sm font-semibold tracking-wide">
                  {provider.name}
                </span>
              </label>
             <SwitchButtonRenderer provider={provider} currentProvider={q?.provider}/>
            </main>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
