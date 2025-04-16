'use client'
import NFTItem from "./ntf-item";
import { useEffect, useState } from "react"
import axios from "axios";

export default function NFTInfo() {
    const address = "0x778F609Ae977B633a0FEC8832b0Bb781ad0Fd819";
    const [tokenIds, setTokens] = useState([]);

    useEffect(() => {
        if (!address) return;

        const fetchTokens = async () => {
        try {
            const response = await axios.get(`http://localhost:42070/tokens/id/address/${address}`);
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
                tokenIds && tokenIds.map((tokenId, index) => {
                    return (
                        <NFTItem tokenId={tokenId} key={index} />
                    )
                })
            }
        </div>
    )
}