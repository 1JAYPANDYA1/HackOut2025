export const companyDetailsFields = [
  { name: "companyName", label: "Company Name", type: "text" },
  { name: "companyLogo", label: "Company Logo", type: "file", accept: "image/*" },
  { name: "companyEmail", label: "Company Email", type: "email" },
  { name: "companyPhoneNumber", label: "Phone Number", type: "text" },
  { name: "companyContactPersonName", label: "Contact Person", type: "text" },
  { name: "companyAddress", label: "Company Address", type: "text" },
];

export const companyDocumentFields = [
  { name: "iso", label: "ISO Certification", type: "file" },
  { name: "registration", label: "Company Registration", type: "file" },
  { name: "gst", label: "GST Certificate", type: "file" },
];
