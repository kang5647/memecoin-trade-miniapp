import logging
from telegram import Update
from telegram.ext import CallbackContext
from telegram.error import TelegramError
import os
import requests
from dotenv import load_dotenv
import time

load_dotenv()
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
logger = logging.getLogger(__name__)

DEXTOOLS_API_BASE_URL = "https://public-api.dextools.io/trial/v2/token"
DEXTOOLS_API_KEY = os.getenv("DEXTOOLS_API_KEY")


async def get_token_info(contract_address: str, chain: str) -> dict:
    """
    Get comprehensive token information from Dextools API.
    """
    headers = {"accept": "application/json", "X-API-Key": DEXTOOLS_API_KEY}

    try:
        # Basic token info
        basic_info_url = f"{DEXTOOLS_API_BASE_URL}/{chain}/{contract_address}"
        basic_info_response = requests.get(basic_info_url, headers=headers)
        basic_info_response.raise_for_status()
        basic_info = basic_info_response.json().get("data")

        time.sleep(1)

        # Token metrics
        metrics_url = f"{DEXTOOLS_API_BASE_URL}/{chain}/{contract_address}/info"
        metrics_response = requests.get(metrics_url, headers=headers)
        metrics_response.raise_for_status()
        metrics = metrics_response.json().get("data")

        time.sleep(1)

        # Price information
        price_url = f"{DEXTOOLS_API_BASE_URL}/{chain}/{contract_address}/price"
        price_response = requests.get(price_url, headers=headers)
        price_response.raise_for_status()
        price_info = price_response.json().get("data")

        # Combine all information
        return {
            "name": basic_info.get("name", "N/A"),
            "symbol": basic_info.get("symbol", "N/A"),
            "contract": contract_address,
            "circulating_supply": metrics.get("circulatingSupply", 0),
            "total_supply": metrics.get("totalSupply", 0),
            "market_cap": metrics.get("mcap", 0),
            "fully_diluted_valuation": metrics.get("fdv", 0),
            "holders": metrics.get("holders", 0),
            "transactions": metrics.get("transactions", 0),
            "current_price": price_info.get("price", 0),
            "price_24h_ago": price_info.get("price24h", 0),
            "price_change_24h": price_info.get("variation24h", 0),
        }
    except requests.HTTPError as http_err:
        logger.error(f"HTTP error occurred: {http_err}")
        raise
    except requests.RequestException as e:
        logger.error(f"Error fetching data from Dextools API: {str(e)}")
        return {}


async def tokeninfo(update: Update, context: CallbackContext) -> None:
    if not context.args and len(context.args) < 2:
        await update.message.reply_text(
            "Please provide a chain and contract address. Usage: /token <contract_address>"
        )
        return

    contract_address = context.args[0]
    chain = context.args[1]

    await update.message.reply_text(f"Fetching token information...")
    try:
        token_info = await get_token_info(chain, contract_address)
        if not token_info:
            await update.message.reply_text("Cannot fetch token information.")
        response = (
            f"🪙 Token Information for {token_info['name']} ({token_info['symbol']}):\n\n"
            f"📊 Basic Info:\n"
            f"   Contract: {token_info['contract']}\n\n"
            f"💰 Market Data:\n"
            f"   Current Price: ${token_info['current_price']:.6f}\n"
            f"   24h Change: {token_info['price_change_24h']:.2f}%\n"
            f"   Market Cap: ${token_info['market_cap']:,.0f}\n"
            f"   Fully Diluted Valuation: ${token_info['fully_diluted_valuation']:,.0f}\n\n"
            f"📈 Supply:\n"
            f"   Circulating: {token_info['circulating_supply']:,.0f}\n"
            f"   Total: {token_info['total_supply']:,.0f}\n\n"
            f"👥 Community:\n"
            f"   Holders: {token_info['holders']:,}\n"
            f"   Transactions: {token_info['transactions']:,}"
        )

        mini_app_link = f"https://t.me/meme_scout_bot/memecoin_trade?startapp={contract_address}-{chain}"

        # Add the mini-app link to the response
        response += f"\n\n🚀 Trade this memecoin: [Open Mini-App]({mini_app_link})"

        await update.message.reply_text(response)
    except Exception as e:
        logger.error(f"Error fetching token info: {str(e)}")
        await update.message.reply_text(
            "Sorry, I couldn't fetch the token information. Please try again later."
        )


async def error(update, context):
    """Log Errors caused by Updates."""
    logger.warning('Update "%s" caused error "%s"', update, context.error)
