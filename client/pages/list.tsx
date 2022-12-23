import type { NextPage } from "next";
import React from "react";
import { useAccount, useContractRead } from "wagmi";
import NftCard from "components/NftCard";
import Container from "components/container";
import factoryContract from "contracts/factory-abi";
import Menu from "components/Menu";
import { Swiper, SwiperSlide,  } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper";

const contractAddress = process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS ?? "";

const List: NextPage = () => {
  const { address } = useAccount();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const { data, error, isError, isLoading, status } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: factoryContract,
    functionName: "getCreatorChannels",
    args: [address],
  });

  if (isLoading || data === undefined) {
    return <div>loading</div>;
  }

  return (
    <Container>
      <Menu />
      <h1>All you LNFTs</h1>

      <div className="relative h-full">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          cardsEffect={slideShadows: false}
        >
          {data.map((data, index) => {
            return (
              <SwiperSlide>
                <div className="bg-red-400 card text-primary-content box-border shadow-xl">
                  <NftCard address={data} />
                </div>
              </SwiperSlide>
            );
          })}

          {/* <SwiperSlide>
          <div className="mt-10 ml-10 bg-red-200 card text-primary-content box-border">
            <NftCard address={data[1]} />
          </div>
          </SwiperSlide> */}
        </Swiper>
      </div>
    </Container>
  );
};

export default List;
