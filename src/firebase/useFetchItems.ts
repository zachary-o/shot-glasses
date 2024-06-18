import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore"
import {
  Item,
  setError,
  setItems,
  setLoading,
} from "../redux/slices/itemsSlice"
import { db } from "./config"
import i18n from "i18next"
import { toast } from "react-toastify"

export const useFetchItems = (displayedItems?: number) => {
  const dispatch = useDispatch()
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    const fetchItems = async () => {
      dispatch(setLoading(true))
      try {
        const itemsRef = collection(db, "shot-glasses")

        const totalCountSnapshot = await getCountFromServer(itemsRef)
        const totalCount = totalCountSnapshot.data().count
        setTotalItems(totalCount)

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
  }, [dispatch, displayedItems, totalItems])
  return { totalItems }
}
