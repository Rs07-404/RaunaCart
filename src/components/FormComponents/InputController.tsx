import { FormField, FormItem, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { FloatingLabelInput } from "../ui/floating-label-input";

interface InputControllerProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    description?: string;
    type?: string;
    required?: boolean;
}

const InputController: React.FC<InputControllerProps> = ({ ...props }) => {
    const form = useFormContext()

    return (
        <FormField
            control={form.control}
            {...props}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <FloatingLabelInput {...props} {...field} />
                    </FormControl>
                    <FormDescription>{props.description}</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />

    )
}

export default InputController;