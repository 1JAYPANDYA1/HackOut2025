import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/companies";

// ---------- Async Thunks ----------
export const createCompany = createAsyncThunk(
  "company/createCompany",
  async (companyData, { rejectWithValue }) => {
    console.log("Creating company with data:", companyData);
    try {
      const response = await axios.post(API_URL, companyData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const fetchCompanies = createAsyncThunk(
  "company/fetchCompanies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching companies");
    }
  }
);

// ---------- Initial State ----------
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
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

// ---------- Slice ----------
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
  extraReducers: (builder) => {
    builder
      // --- Create Company
      .addCase(createCompany.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // --- Fetch Companies
      .addCase(fetchCompanies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        // You could keep companies list if needed
        state.list = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { updateDetail, updateDocument, resetCompany } =
  companySlice.actions;

export default companySlice.reducer;
