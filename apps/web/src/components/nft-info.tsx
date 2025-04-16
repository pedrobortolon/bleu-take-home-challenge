'use client'
import StakeNFTButton from "@/components/stake-nft-button"
import { useEffect, useState } from "react"
import axios from "axios";

export default function NFTInfo() {
    const address = "0x778F609Ae977B633a0FEC8832b0Bb781ad0Fd819";
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        if (!address) return;

        const fetchTokens = async () => {
        try {
            const response = await axios.get(`http://localhost:42069/tokens/${address}`);
            console.log(response.data)
            setTokens(response.data);
        } catch (error) {
            console.error("Error fetching tokens:", error);
        }
    };

    fetchTokens();
  }, [address]);

    return (
        <div>
            <p>tokenId|owner|state</p>
            {
                tokens && tokens.map((token, index) => {
                    return (
                        <div className="flex flex-row gap-4" key={index}>
                        <p>{token.tokenId}|{token.owner}|{token.staked ? "staked" : "unstaked"}</p>
                        <StakeNFTButton token={token}/>
                        </div>
                    )
                })
            }
        </div>
    )
}