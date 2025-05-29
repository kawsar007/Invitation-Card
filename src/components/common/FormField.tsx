
import { FORM_FIELDS } from "@/components/design-templates/CreateEventModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "../ui/button";

export const FormField = ({
  field,
  value,
  onChange,
  onSelectChange
}: {
  field: typeof FORM_FIELDS[number];
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange?: (value: string, fieldId: string) => void;
}) => (
  <div className="space-y-2">
    <Label htmlFor={field.id}>
      {field.label}
      {field.required && <span className="text-red-500 ml-1">*</span>}
    </Label>
    {field.component === 'select' ? (
      <Select
        value={value}
        onValueChange={(value) => onSelectChange?.(value, field.id)}
      >
        <SelectTrigger>
          <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {field.options?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ) : (
      <Input
        id={field.id}
        name={field.id}
        type={field.type}
        placeholder={field.placeholder}
        value={value}
        onChange={onChange}
        required={field.required}
      />
    )}
  </div>
);

export const ErrorMessage = ({ error }: { error: string | null }) => {
  if (!error) return null;

  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
      {error}
    </div>
  );
};

export const FormActions = ({
  isSubmitting,
  onCancel
}: {
  isSubmitting: boolean;
  onCancel: () => void;
}) => (
  <div className="flex gap-3 pt-4">
    <Button
      type="button"
      variant="outline"
      onClick={onCancel}
      className="flex-1"
      disabled={isSubmitting}
    >
      Cancel
    </Button>
    <Button
      type="submit"
      disabled={isSubmitting}
      className="flex-1"
    >
      {isSubmitting ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
          Creating...
        </>
      ) : (
        'Create Event'
      )}
    </Button>
  </div>
);