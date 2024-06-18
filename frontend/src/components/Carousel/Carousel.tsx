'use client'
import React, { MutableRefObject } from "react"
import "./carousel.scss"
import { useKeenSlider, KeenSliderPlugin, KeenSliderInstance } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Picture } from "@/app/models"
import Image from "next/image"

function ThumbnailPlugin(
    mainRef: MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
    return (slider) => {
        function removeActive() {
            slider.slides.forEach((slide) => {
                slide.classList.remove("active")
            })
        }
        function addActive(idx: number) {
            slider.slides[idx].classList.add("active")
        }

        function addClickEvents() {
            slider.slides.forEach((slide, idx) => {
                slide.addEventListener("click", () => {
                    if (mainRef.current) mainRef.current.moveToIdx(idx)
                })
            })
        }

        slider.on("created", () => {
            if (!mainRef.current) return
            addActive(slider.track.details.rel)
            addClickEvents()
            mainRef.current.on("animationStarted", (main) => {
                removeActive()
                const next = main.animator.targetIdx || 0
                addActive(main.track.absToRel(next))
                slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
            })
        })
    }
}

interface Props {
    images: Picture[];
    isMobile: boolean;
}

const Carousel = ({images, isMobile}: Props) => {
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
    })

    const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
        {
            initial: 0,
            slides: {
                perView: isMobile ? 4 : 6,
                spacing: 10,
            },
        },
        [ThumbnailPlugin(instanceRef)]
    )

    return (
        <>
            <div ref={sliderRef} className="keen-slider slider">
                {images.length > 0 && images.map(image => (
                    <div key={image.id} className="keen-slider__slide">
                        <Image src={image.url} alt="Producto" width={680} height={680} />
                    </div>
                ))}
            </div>

            <div ref={thumbnailRef} className="keen-slider thumbnail">
                {images.map(image => (
                    <div key={image.id} className="keen-slider__slide">
                        <Image src={image.url} alt="Producto" width={50} height={50} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default Carousel