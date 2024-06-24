import { Icon } from '@iconify/react'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { Gallery } from 'components/Gallery/Gallery';
import ReactCrop, {centerCrop,makeAspectCrop,Crop,PixelCrop} from 'react-image-crop'
import DataManager from 'utils/DataManager'
import { setGlobalState, useGlobalState } from 'state';
import { useDebounceEffect } from '@/app/Management/Inventory/Details/useDebounceEffect';
import { canvasPreview } from '@/app/Management/Inventory/Details/canvasPreview';

function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight,
      ),
      mediaWidth,
      mediaHeight,
    )
  }
const CropPop = () => {
    const [crop, setCrop] = useState<Crop>()
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const [scale, setScale] = useState(1)
    const [rotate, setRotate] = useState(0)
    const [imgSrc, setImgSrc] = useState('')
    const [aspect, setAspect] = useState<number | undefined>(16 / 12)
    const Manager = new DataManager();

    useDebounceEffect(
        async () => {
          if (
            completedCrop?.width &&
            completedCrop?.height &&
            imgRef.current &&
            previewCanvasRef.current
          ) {
            // We use canvasPreview as it's much faster than imgPreview.
            canvasPreview(
              imgRef.current,
              previewCanvasRef.current,
              completedCrop,
              scale,
              rotate,
            )
          }
        },
        100,
        [completedCrop, scale, rotate],
      )


    var saveCropBlob = Manager.saveCropBlob();
    const [useItemId] = useGlobalState("setItemID");
    // (document.getElementById("POPImageUpload_cover") as HTMLDivElement).style.transform = 'scale(1)';
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)

    function HideUpload(e:any){
        const id = parseInt(e.target.getAttribute("aria-current"));
        setGlobalState("setItemID",0);
        (document.getElementById("POPImageUpload_cover") as HTMLDivElement).style.transform = 'scale(0)';
      }


      function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
          setCrop(undefined) // Makes crop preview update between images.
          const reader = new FileReader()
          reader.addEventListener('load', () =>
            setImgSrc(reader.result.toString() || ''),
          )
          reader.readAsDataURL(e.target.files[0])
        }
      }
      
      function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        if (aspect) {
          const { width, height } = e.currentTarget
          setCrop(centerAspectCrop(width, height, aspect))
        }
      }
      
      const saveBase64 =() =>{
        var canvas = (document.getElementById('myCanvas') as HTMLCanvasElement);
        var dataURL = canvas.toDataURL('image/webp');
        console.log(typeof useItemId);
        const JSON = {
          "saveCropImageId": useItemId,
          "file": dataURL,
        }
        saveCropBlob({
          variables:JSON
        })
    }


  return (
    <div className='POPImageUpload_cover' id="POPImageUpload_cover">
    <Icon icon="zondicons:close-solid"  className='ClosePOPImageUpload_cover' onClick={(e:any)=>HideUpload(e)}/>
      <div className='POPImageUpload'>
          <div className='cropperControlsContainer'>
            <div className="Crop-Controls">
              <div>
                <input type="file" accept="image/*" onChange={onSelectFile} />
              </div>                        
              <div>
                <label htmlFor="scale-input"><Icon icon="icon-park-outline:scale" /> </label>
                <input
                  id="scale-input"
                  type="range"
                  step="0.0001"
                  max='2'
                  value={scale}
                  min='1'
                  disabled={!imgSrc}
                  onChange={(e) => setScale(Number(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="rotate-input"><Icon icon="material-symbols:rotate-right" /> </label>
                <input
                  id="rotate-input"
                  type="range"
                  step="0.0001"
                  value={rotate}
                  disabled={!imgSrc}
                  onChange={(e) =>
                    setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
                  }
                />
              </div>
              <div>
                <button onClick={saveBase64}>
                  Save <Icon icon="material-symbols:save-sharp" />
                </button>
              </div>

            </div>
            <div className='CropperImageContrainer'>
            {Boolean(imgSrc) && (
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={aspect}
                >
                  <Image
                    ref={imgRef}
                    alt="Crop me"
                    src={imgSrc}
                    style={{ transform: `scale(${scale}) rotate(${rotate}deg)`,height:'40vh' }}
                    onLoad={onImageLoad}
                  />
                </ReactCrop>
              )}
            </div>
            <div>
              {Boolean(completedCrop) && (
                <canvas
                  ref={previewCanvasRef}
                  id='myCanvas'
                  style={{
                    border: '1px solid black',
                    objectFit: 'contain',
                    width: completedCrop.width,
                    height: completedCrop.height,
                    display:'none'
                  }}
                />
              )}
            </div>
          </div>
          <div className='cropperControlsContainer_gallery'>
          <Gallery/>
          </div>
      </div>
    </div>
  )
}

export default CropPop