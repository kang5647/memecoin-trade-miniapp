// pages/api/dextools-proxy.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { chain, address } = req.query;
  const apiKey = process.env.DEXTOOLS_API_KEY;
  const apiUrl = `https://public-api.dextools.io/trial/v2/token/${chain}/${address}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'x-api-key': apiKey as string
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching token info:", error);
    res.status(500).json({ error: 'Failed to fetch token info' });
  }
}