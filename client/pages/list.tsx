import type { NextPage } from "next";
import { useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import NftCard from "components/Elements/NftCard";
import Container from "components/Elements/Container";
import CastrFactory from "contracts/CastrFactory-abi";
import Menu from "components/Elements/Menu";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import { ContractAddress } from "utils/constants";

// import required modules
import { EffectCards, Controller, Swiper as swiperType } from "swiper";


const List: NextPage = () => {
  const { address } = useAccount();
  const [controlledSwiper, setControlledSwiper] =
    useState<swiperType | null>(null);
  const { data, isLoading } = useContractRead({
    addressOrName: ContractAddress,
    contractInterface: CastrFactory,
    functionName: "getCreatorChannels",
    args: [address],
  });

  if (isLoading || data === undefined) {
    return <div>loading</div>;
  }

  const handleScroll = (index: string) => {
    controlledSwiper?.slideTo(Number(index));
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
                <NftCard address={data} />
              </SwiperSlide>
            );
          })}
          <input
            type="range"
            min="0"
            defaultValue={0}
            max={data.length - 1}
            className="range range-xs mt-8"
            onChange={(e) => handleScroll(e.target.value)}
          />
        </Swiper>
      </div>
    </Container>
  );
};

export default List;
