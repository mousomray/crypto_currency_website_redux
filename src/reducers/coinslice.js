import { createAsyncThunk } from "@reduxjs/toolkit"; //createAsyncThunk handle asynconomous function 
import axiosInstance from "../api/api"
import { endpoints } from "../endpoint/endpoint";


// Call Api for Product
export const coinlist = createAsyncThunk("coinlist", async (_, { rejectWithValue }) => {
    try {
        const apiurl = endpoints.cms.allcoins
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Coin List", response);
        return response?.data?.data
    } catch (error) {
        console.log("Error Coin List data", error);
        return rejectWithValue(error.response.data);
    }
});