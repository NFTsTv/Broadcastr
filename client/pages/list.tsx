import type { NextPage } from "next";
import React from "react";
import { useAccount, useContractRead } from "wagmi";
import NftCard from "components/NftCard";
import Container from "components/container";
import factoryContract from "contracts/factory-abi";
import Menu from "components/Menu";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards, Controller, Swiper as swiperType } from "swiper";

const contractAddress = process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS ?? "";

const List: NextPage = () => {
  const { address } = useAccount();
  const [controlledSwiper, setControlledSwiper] = React.useState<swiperType | null>(null);
  const { data, error, isError, isLoading, status } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: factoryContract,
    functionName: "getCreatorChannels",
    args: [address],
  });

  if (isLoading || data === undefined) {
    return <div>loading</div>;
  }

  const handleScroll = (index: string) => {
    controlledSwiper?.slideTo(Number(index))
  };

  return (
    <Container>
      <Menu />
      <h1>All your LNFTs</h1>

      <div className="relative h-full">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards, Controller]}
          onSwiper={(swiper) => setControlledSwiper(swiper)}
          cardsEffect={{
            slideShadows: true,
            rotate: false,
            perSlideOffset: 15,
          }}
        >
          {data.map((data) => {
            return (
              <SwiperSlide>
                <NftCard address={data}  />
              </SwiperSlide>
            );
          })}
          <input
            type="range"
            min="0"
            defaultValue={0}
            max={data.length -1}
            className="range range-xs mt-8"
            onChange={(e) => handleScroll(e.target.value)}
          />
        </Swiper>
      </div>
    </Container>
  );
};

export default List;
