// Create a Redux slice (workspaceSlice.js)
import { createSlice } from '@reduxjs/toolkit';

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: {
    selectedWorkspaceId: null, // Initialize with null or a default value
  },
  reducers: {
    setSelectedWorkspaceId: (state, action) => {
      state.selectedWorkspaceId = action.payload;
    },
  },
});

export const { setSelectedWorkspaceId } = workspaceSlice.actions;
export const setWorkspaceId = setSelectedWorkspaceId; // Export setWorkspaceId as an alias
export default workspaceSlice.reducer;
