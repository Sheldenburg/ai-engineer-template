import Appearance from "@/components/appearance-settings";
import MyProfile from "@/components/my-profile";
import PasswordReset from "@/components/password-reset";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import initiateClient from "@/lib/api";

async function SettingsPage() {
  const client = initiateClient();
  const {data, error} = await client.GET("/api/v1/users/me");
  if (error) {
    //TODO: handle error
    console.log(error);
  }
  const fullName = data?.full_name;
  const email = data?.email;
  return (
    <div>
      <h1 className="text-3xl font-bold pl-5">User Settings</h1>
      <div className="pl-5 mt-8">
        <Tabs defaultValue="myProfile">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="myProfile">My Profile</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="myProfile">
            <MyProfile fullName={fullName} email={email} />
          </TabsContent>
          <TabsContent value="password">
            <PasswordReset />
          </TabsContent>
          <TabsContent value="appearance">
            <Appearance />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default SettingsPage;
