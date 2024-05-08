"use client";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useTheme } from "next-themes";

function Appearance() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="m-4 space-y-4">
      <h2 className="text-md font-bold">Appearance</h2>
      <RadioGroup defaultValue="comfortable">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="lightMode" id="r1" onClick={()=> setTheme('light')} checked={theme==='light'}/>
          <Label htmlFor="r1">Light mode</Label>
          <p className="text-sm bg-gray-200">DEFAULT</p>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="darkMode" id="r2" onClick={()=> setTheme('dark')} checked={theme==='dark'}/>
          <Label htmlFor="r2">Dark mode</Label>
        </div>
      </RadioGroup>
    </div>
  );
}

export default Appearance;
