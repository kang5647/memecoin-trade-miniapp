// app/api/dextool-proxy/route.ts
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const chain = searchParams.get('chain')
  const address = searchParams.get('address')
  const apiKey = process.env.DEXTOOLS_API_KEY

  if (!chain || !address) {
    return NextResponse.json({ error: 'Missing chain or address parameter' }, { status: 400 })
  }

  if (!apiKey) {
    console.error("DEXTOOLS_API_KEY is not set")
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  const apiUrl = `https://public-api.dextools.io/trial/v2/token/${chain}/${address}`

  try {
    console.log(`Fetching data from: ${apiUrl}`)
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'x-api-key': apiKey
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`DexTools API error: ${response.status} ${response.statusText}`, errorText)
      return NextResponse.json({ 
        error: 'Error from DexTools API', 
        details: errorText 
      }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Error fetching token info:", error)
    return NextResponse.json({ error: 'Failed to fetch token info', details: error.message }, { status: 500 })
  }
}