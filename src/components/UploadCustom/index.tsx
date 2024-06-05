import { CSSProperties, useCallback, useMemo } from "react"
import { useDropzone } from "react-dropzone"
import uploadImgDragging from "../../assets/images/upload-img-dragging.png"
import uploadImgError from "../../assets/images/upload-img-error.png"
import uploadImg from "../../assets/images/upload-img.png"
import styles from "./UploadCustom.module.scss"

const baseStyle: CSSProperties = {
  flex: 1,
  maxWidth: "522px",
  height: "455px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  border: "2px dashed #1C1B1F",
  borderRadius: 20,
  background: "none",
  color: "#141414",
  outline: "none",
  transition: "border .24s ease-in-out",
}

const focusedStyle: CSSProperties = {
  border: "2px dashed #2196f3",
}

const acceptStyle: CSSProperties = {
  border: "2px dashed #1712EC",
  background: "#E6E6FF",
}

const rejectStyle: CSSProperties = {
  border: "2px dashed #ff1744",
  background: "lighten($color: #ff1744, $amount: 20%)",
}

interface UploadCustomProps {
  onImageUpload: (file: File[]) => void
  uploadProgress: number
  preview: string | ArrayBuffer | null
  setPreview: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>
}

const UploadCustom = ({
  onImageUpload,
  uploadProgress,
  preview,
  setPreview,
}: UploadCustomProps) => {
  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      const previewFile = new FileReader()
      const file = acceptedFiles
      onImageUpload(file)
      previewFile.onload = function () {
        setPreview(previewFile.result)
      }

      previewFile.readAsDataURL(acceptedFiles[0])
    },
    [onImageUpload]
  )

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  )

  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <>
          <img
            src={isDragReject ? uploadImgError : uploadImgDragging}
            alt="Upload"
            style={{
              width: 63,
              height: 63,
              marginBottom: 10,
            }}
          />
          {isDragReject ? (
            <p style={{ color: "#ff1744" }}>Please upload an image</p>
          ) : (
            <p>Drop the files here ...</p>
          )}
        </>
      ) : (
        <div className={styles["upload-container"]}>
          <img
            src={uploadImg}
            alt="Upload"
            style={{ width: 63, height: 63, marginBottom: 10 }}
          />
          <p style={{ textAlign: "center", marginBottom: "5px" }}>
            Братішка, перетягни сюди файли або
            <br />
            <strong>
              <span style={{ color: "#9B0D00" }}>натисни, щоб завантажити</span>
            </strong>
          </p>

          {uploadProgress === 0 || !preview ? null : (
            <div className={styles.progress}>
              <div
                className={styles["progress-bar"]}
                style={{ width: `${uploadProgress.toFixed(2)}%` }}
              >
                {uploadProgress.toFixed(2)}%
              </div>
            </div>
          )}
        </div>
      )}

      {preview && (
        <p className={styles["preview-container"]}>
          <img
            className={styles["preview-image"]}
            src={preview as string}
            alt="Upload preview"
            style={{ width: 200 }}
          />
          <span
            className={styles["preview-clear"]}
            onClick={(event) => {
              event.stopPropagation()
              setPreview(null)
            }}
          >
            x
          </span>
        </p>
      )}
    </div>
  )
}
export default UploadCustom
