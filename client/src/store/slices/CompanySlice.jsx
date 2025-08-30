import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: {
    name: "",
    logo: null,
    email: "",
    phone: "",
    contactPerson: "",
    address: "",
  },
  documents: {
    iso: null,
    registration: null,
    gst: null,
  },
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    updateDetail: (state, action) => {
      const { field, value } = action.payload;
      state.details[field] = value;
    },
    updateDocument: (state, action) => {
      const { field, value } = action.payload;
      state.documents[field] = value;
    },
    resetCompany: () => initialState,
  },
});

export const { updateDetail, updateDocument, resetCompany } = companySlice.actions;
export default companySlice.reducer;
