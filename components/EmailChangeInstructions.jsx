import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Head from "next/head";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";

export default function CallToActionWithAnnotation() {
  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <Flex align="center" justify="center">
            <Image
              src="/1.jpeg"
              alt="Picture of the author"
              width={277}
              height={600}
            />
          </Flex>
        </SwiperSlide>
        <SwiperSlide>
          <Flex align="center" justify="center">
            <Image
              src="/2.jpeg"
              alt="Picture of the author"
              width={277}
              height={600}
            />
          </Flex>
        </SwiperSlide>
        <SwiperSlide>
          <Flex align="center" justify="center">
            <Image
              src="/3.jpeg"
              alt="Picture of the author"
              width={277}
              height={600}
            />
          </Flex>
        </SwiperSlide>
        <SwiperSlide>
          <Flex align="center" justify="center">
            <Image
              src="/4.jpeg"
              alt="Picture of the author"
              width={277}
              height={600}
            />
          </Flex>
        </SwiperSlide>
        <SwiperSlide>
          <Flex align="center" justify="center">
            <Image
              src="/5.jpeg"
              alt="Picture of the author"
              width={277}
              height={600}
            />
          </Flex>
        </SwiperSlide>
        <SwiperSlide>
          <Flex align="center" justify="center">
            <Image
              src="/6.jpeg"
              alt="Picture of the author"
              width={277}
              height={600}
            />
          </Flex>
        </SwiperSlide>
        <SwiperSlide>
          <Flex align="center" justify="center">
            <Image
              src="/7.jpeg"
              alt="Picture of the author"
              width={277}
              height={600}
            />
          </Flex>
        </SwiperSlide>
        <SwiperSlide>
          <Flex align="center" justify="center">
            <Image
              src="/8.jpeg"
              alt="Picture of the author"
              width={277}
              height={600}
            />
          </Flex>
        </SwiperSlide>
        <SwiperSlide>
          <Flex align="center" justify="center">
            <Image
              src="/9.jpeg"
              alt="Picture of the author"
              width={277}
              height={600}
            />
          </Flex>
        </SwiperSlide>
        <SwiperSlide>
          <Flex align="center" justify="center">
            <Image
              src="/10.jpeg"
              alt="Picture of the author"
              width={277}
              height={600}
            />
          </Flex>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
