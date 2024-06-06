import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { MultiValue, SingleValue } from "react-select"
import { addDoc, collection } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { db, storage } from "../../firebase/config"
import { toast } from "react-toastify"

export interface Continent {
  nameEng: string
  nameUkr: string
}

export interface CountryOption {
  label: string
  value: string
}

interface CountryPayload {
  nameEng: string
  nameUkr: string
}

interface FormState {
  cityEng: string
  cityUkr: string
  countryEng: string
  countryUkr: string
  continentUkr: string
  continentEng: string
  longitude: string
  latitude: string
  purchaseDate: Date | null
  imageUrl: string
  preview: string | ArrayBuffer | null
  selectedContinent: Continent | Continent[] | null
  selectedCountry: SingleValue<CountryOption> | MultiValue<CountryOption>
  uploadProgress: number
  isLoading: boolean
}

const initialState: FormState = {
  cityEng: "",
  cityUkr: "",
  countryEng: "",
  countryUkr: "",
  continentUkr: "",
  continentEng: "",
  longitude: "",
  latitude: "",
  purchaseDate: null,
  imageUrl: "",
  preview: null,
  selectedContinent: null,
  selectedCountry: null,
  uploadProgress: 0,
  isLoading: false,
}

// Async Thunk for image upload
export const uploadImage = createAsyncThunk(
  "admin/uploadImage",
  async (file: File, { rejectWithValue, dispatch }) => {
    try {
      const storageRef = ref(storage, `shot-glasses/${Date.now()}${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      return new Promise<string>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            dispatch(setUploadProgress(progress))
          },
          (error) => {
            toast.error(
              `Error occurred while uploading an image: ${error.message}`
            )
            reject(rejectWithValue(error.message))
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
            toast.success("Image uploaded successfully")
            resolve(downloadURL)
          }
        )
      })
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

// Async Thunk for adding item
export const addItem = createAsyncThunk(
  "admin/addItem",
  async (item: FormState, { rejectWithValue, dispatch }) => {
    try {
      await addDoc(collection(db, "shot-glasses"), {
        cityEng: item.cityEng,
        cityUkr: item.cityUkr,
        countryEng: item.countryEng,
        countryUkr: item.countryUkr,
        continentEng: item.continentEng,
        continentUkr: item.continentUkr,
        longitude: item.longitude,
        latitude: item.latitude,
        purchaseDate: item.purchaseDate,
        imageUrl: item.imageUrl,
      })
      toast.success("Item uploaded successfully")
      dispatch(resetForm())
      return initialState
    } catch (error: any) {
      toast.error(`Error occurred while uploading an item: ${error}`)
      return rejectWithValue(error.message)
    }
  }
)

const adminFormSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    handleCityEngChange: (state, action: PayloadAction<string>) => {
      state.cityEng = action.payload
    },
    handleCityUkrChange: (state, action: PayloadAction<string>) => {
      state.cityUkr = action.payload
    },
    handleLongitudeChange: (state, action: PayloadAction<string>) => {
      state.longitude = action.payload
    },
    handleLatitudeChange: (state, action: PayloadAction<string>) => {
      state.latitude = action.payload
    },
    handleDateChange: (state, action: PayloadAction<Date | null>) => {
      state.purchaseDate = action.payload
    },
    handleContinentSelect: (state, action: PayloadAction<Continent>) => {
      const { nameEng, nameUkr } = action.payload
      state.continentEng = nameEng
      state.continentUkr = nameUkr
    },
    handleCountrySelect: (state, action: PayloadAction<CountryPayload>) => {
      const { nameEng, nameUkr } = action.payload
      state.countryEng = nameEng
      state.countryUkr = nameUkr
    },
    setPreview: (state, action: PayloadAction<string | ArrayBuffer | null>) => {
      state.preview = action.payload
    },
    setSelectedContinent: (state, action: PayloadAction<Continent | null>) => {
      state.selectedContinent = action.payload
    },
    setSelectedCountry: (
      state,
      action: PayloadAction<CountryOption | CountryOption | null>
    ) => {
      state.selectedCountry = action.payload
    },
    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.uploadProgress = action.payload
    },
    resetForm: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        uploadImage.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.imageUrl = action.payload
          state.isLoading = false
          state.uploadProgress = 0
        }
      )
      .addCase(uploadImage.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(addItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addItem.fulfilled, () => {
        return { ...initialState }
      })
      .addCase(addItem.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const {
  handleCityEngChange,
  handleCityUkrChange,
  handleLongitudeChange,
  handleLatitudeChange,
  handleDateChange,
  handleContinentSelect,
  handleCountrySelect,
  setPreview,
  setSelectedContinent,
  setSelectedCountry,
  setUploadProgress,
  resetForm,
} = adminFormSlice.actions

export default adminFormSlice.reducer
