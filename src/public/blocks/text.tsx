'use client';

import { WaveText } from '../components/waveText';

export default function Text() {
  return (
    <div className="">
      <div className="">
        <div className=" text-[#2E368F]  font-weight-300 flex item-center">
          <WaveText delay={60} duration={500}>
            <span className="font-black text-[20px] uppercase">VIÊN KÉP</span>
          </WaveText>
            <span 
                style={{

                animation: `waveUp 600ms ease-out 200ms both`,
                }}
                className="text-[16px] lg:text-[40px]  lg:mt-7 mt-1 ml-1">02 Men</span>
        </div>
        
        <div className=" text-[#2E368F] font-bold ml-4 flex">
                <span 
                style={{
                    display: 'inline-block',
                    animation: `waveUp 600ms ease-out both`,
                }}
                className=" text-[16px] lg:text-[40px] lg:mt-6 mt-1 ml-1 mr-1">Bụng</span>
          <WaveText delay={60} duration={500}>
            <span className="font-black text-[20px] uppercase">YÊN</span>

          </WaveText>
                <span 
                style={{
                    display: 'inline-block',
                    animation: `waveUp 600ms ease-out 100ms both`,
                }}
                className="text-[16px] lg:text-[40px] lg:mt-6 mt-1 ml-1 mr-1"> - Ruột</span>
          <WaveText delay={60} duration={500}>
            <span className="font-black text-[20px] uppercase">ỔN</span>
          </WaveText>
        </div>
      </div>
    </div>
  );
}
