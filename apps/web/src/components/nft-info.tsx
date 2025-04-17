'use client'
import { useAccount } from 'wagmi';
import { useEffect, useState } from "react"
import NFTItem from "./ntf-item";
import axios from "axios";

export default function NFTInfo() {
    const { address } = useAccount();
    const [tokenIds, setTokens] = useState([]);

    useEffect(() => {
        if (!address) return;

        const fetchTokens = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + `/tokens/id/address/${address}`);
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