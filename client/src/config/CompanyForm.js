export const companyDetailsFields = [
  { name: "name", label: "Company Name", type: "text" },
  { name: "logo", label: "Company Logo", type: "file", accept: "image/*" },
  { name: "email", label: "Company Email", type: "email" },
  { name: "phone", label: "Phone Number", type: "text" },
  { name: "contactPerson", label: "Contact Person", type: "text" },
  { name: "address", label: "Company Address", type: "text" },
];

export const companyDocumentFields = [
  { name: "iso", label: "ISO Certification", type: "file" },
  { name: "registration", label: "Company Registration", type: "file" },
  { name: "gst", label: "GST Certificate", type: "file" },
];
