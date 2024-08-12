from telegram.ext import Updater, Application, CommandHandler, MessageHandler, filters 
from handler import ( tokeninfo, error)
import os
from dotenv import load_dotenv

load_dotenv()

TG_BOT_TOKEN= os.getenv('TG_BOT_TOKEN')

def main() -> None: 
    application = Application.builder().token(TG_BOT_TOKEN).build()

    application.add_handler(CommandHandler("token", tokeninfo))
    application.add_error_handler(error)

    application.run_polling()

if __name__ == '__main__':
    main()