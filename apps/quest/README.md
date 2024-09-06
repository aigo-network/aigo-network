# AiGO Quest system


### Development
- `cd apps/quest` and then `yarn dev` (this is very much a common Next.js site)

### Deployment
- Run: `yarn deploy webApp --stage [production | development]` (make sure `AWS` credential is configured correctly)

### Telegram Bot
- Use [Telegram Bot Father](https://core.telegram.org/bots/tutorial) to create Bot.
- Get `Bot Token` from the Bot Father
- Under project's root: `.env.production`, make sure `TELEGRAM_BOT_TOKEN` key configured with `Bot Token` above

