import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore"
import {
  Item,
  setError,
  setItems,
  setLoading,
} from "../redux/slices/itemsSlice"
import { db } from "./config"

export const useFetchItems = (displayedItems?: number) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchItems = async () => {
      dispatch(setLoading(true))
      try {
        const itemsRef = collection(db, "shot-glasses")
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
        dispatch(setError("Failed to fetch items"))
        dispatch(setLoading(false))
      }
    }

    fetchItems()
  }, [dispatch])
}