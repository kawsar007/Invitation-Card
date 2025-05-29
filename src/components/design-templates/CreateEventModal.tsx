import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { ErrorMessage, FormActions, FormField } from "@/components/common/FormField";
import { useEventForm } from "@/hooks/useEventForm";

// ==================== TYPES ====================
export interface EventFormData {
  name: string;
  location_type: string;
  venue_name: string;
  venue_address: string;
  virtual_link?: string;
  date: string;
  time_zone: string
}

export interface EventModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  templateId: string;
  onSuccess?: (templateId: string, customizationId?: string) => void;
}

export const FORM_FIELDS = [
  {
    id: 'name',
    label: 'Event Name',
    type: 'text',
    placeholder: 'e.g., Sarah\'s Birthday Party',
    required: true,
    component: 'input'
  },
  {
    id: 'location_type',
    label: 'Location Type',
    type: 'select',
    required: true,
    component: 'select',
    options: [
      { value: 'inPerson', label: 'InPerson' },
      { value: 'virtual', label: 'Virtual' },
    ]
  },
  {
    id: 'venue_name',
    label: 'Venue Name',
    type: 'text',
    placeholder: 'e.g., Sena Kunja',
    required: true,
    component: 'input',
    showWhen: (data: EventFormData) => data.location_type === 'inPerson'
  },
  {
    id: 'venue_address',
    label: 'Venue Address',
    type: 'text',
    placeholder: 'e.g., Community Center Hall',
    required: true,
    component: 'input',
    showWhen: (data: EventFormData) => data.location_type === 'inPerson'
  },
  {
    id: 'virtual_link',
    label: 'Virtual Meeting Link',
    type: 'text',
    placeholder: 'e.g., https://zoom.us/j/123456789',
    required: true,
    component: 'input',
    showWhen: (data: EventFormData) => data.location_type === 'virtual'
  },
  {
    id: 'date',
    label: 'Event Date',
    type: 'date',
    required: true,
    component: 'input'
  },
  {
    id: 'time_zone',
    label: 'Time Zone',
    type: 'select',
    required: true,
    component: 'select',
    options: [
      { value: 'America/New_York', label: 'Eastern Time (EST/EDT)' },
      { value: 'America/Chicago', label: 'Central Time (CST/CDT)' },
      { value: 'America/Denver', label: 'Mountain Time (MST/MDT)' },
      { value: 'America/Los_Angeles', label: 'Pacific Time (PST/PDT)' },
      { value: 'UTC', label: 'UTC' },
      { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
      { value: 'Europe/Paris', label: 'Central European Time (CET)' },
      { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
      { value: 'Asia/Shanghai', label: 'China Standard Time (CST)' },
      { value: 'Asia/Kolkata', label: 'India Standard Time (IST)' },
      { value: 'Australia/Sydney', label: 'Australian Eastern Time (AEST)' }
    ]
  }
] as const;

export default function CreateEventModal({
  isOpen,
  onOpenChange,
  templateId,
  onSuccess
}: EventModalProps) {
  const form = useEventForm(templateId, onSuccess);

  console.log("Form Data:", form);


  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.resetForm();
    }
    onOpenChange(open);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    await form.submitForm(e);
    if (!form.error) {
      onOpenChange(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create Your Event
          </DialogTitle>
          {/* <DialogDescription className="text-gray-600">
            Tell us about your event to personalize this template. All fields marked with * are required.
          </DialogDescription> */}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {FORM_FIELDS.map((field) => {
              // Skip fields that shouldn't be shown based on location type
              if ('showWhen' in field && !field.showWhen(form.formData)) {
                return null;
              }
              return (
                <FormField
                  key={field.id}
                  field={field}
                  value={form.formData[field.id as keyof EventFormData]}
                  onChange={form.handleInputChange}
                  onSelectChange={form.handleSelectChange}
                />
              );
            })}
          </div>

          <ErrorMessage error={form.error} />

          <FormActions
            isSubmitting={form.isSubmitting}
            onCancel={() => onOpenChange(false)}
          />
        </form>
      </DialogContent>
    </Dialog>
  )
}