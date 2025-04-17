import axios from "axios";

const totalStaked = (await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + `/total-staked`)).data;
const topStakers = (await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + `/top-stakers/1`)).data;

export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center gap-2">
          <p className="text-lg text-foreground px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity">Total tokens staked: {totalStaked.length}</p>
      </div>
      <p>Top Stakers</p>
      {
                topStakers && topStakers.map((staker, index) => {
                    return (
                        <p key={index}>Staker: {staker.address}| Stakes Count: {staker.tokenCount}</p>
                    )
                })
            }
    </div>
  );
}
