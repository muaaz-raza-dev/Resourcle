import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/components/ui/select";
import { cn } from "@/shadcn/lib/utils";

interface IcustomSelect {
  data: { value: string; label: string }[] | string[];
  className?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  placeholder?: string;
  value?: string;
}
export default function CustomSelect(props: IcustomSelect) {
  return (
    <Select onValueChange={props.onChange} value={props.value}>
      <SelectTrigger className={cn("w-[180px]", props.className)}>
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {props.data.map((item, index) =>
          typeof item === "string" ? (
            <SelectItem value={item} key={index + item}>
              {item}
            </SelectItem>
          ) : (
            <SelectItem value={item.value} key={index + item.label}>
              {item.label}
            </SelectItem>
          )
        )}
      </SelectContent>
    </Select>
  );
}
