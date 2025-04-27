import { useTheme } from "@/components/theme-provider";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Select defaultValue={theme} onValueChange={setTheme}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="主题" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="light">浅色</SelectItem>
          <SelectItem value="dark">深色</SelectItem>
          <SelectItem value="system">系统</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
