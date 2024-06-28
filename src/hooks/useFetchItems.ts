import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore"
import i18n from "i18next"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { db } from "../firebase/config"
import {
  Item,
  setError,
  setItems,
  setLoading,
  setTotalItems,
} from "../redux/slices/itemsSlice"

export const useFetchItems = (displayedItems?: number) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchItems = async () => {
      dispatch(setLoading(true))
      try {
        const itemsRef = collection(db, "shot-glasses")

        const totalCountSnapshot = await getCountFromServer(itemsRef)
        const totalCount = totalCountSnapshot.data().count
        dispatch(setTotalItems(totalCount))

        let q
        if (displayedItems) {
          q = query(
            itemsRef,
            orderBy("createdAt", "desc"),
            limit(displayedItems)
          )
        } else {
          q = query(itemsRef)
        }
        const snapshot = await getDocs(q)
        const allItems = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }))
        dispatch(setItems(allItems as Item[]))
        dispatch(setLoading(false))
      } catch (error) {
        toast.error(i18n.t("toast.itemsFetchErr"))
        dispatch(setError("Failed to fetch items"))
        dispatch(setLoading(false))
      }
    }

    fetchItems()
  }, [dispatch, displayedItems])
}
