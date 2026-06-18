import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isLoading: boolean;
  isModalOpen: boolean;
  modalContent: string | null;
}

const initialState: UIState = {
  isLoading: false,
  isModalOpen: false,
  modalContent: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    openModal(state, action: PayloadAction<string | null>) {
      state.isModalOpen = true;
      state.modalContent = action.payload;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.modalContent = null;
    },
  },
});

export const { setLoading, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
