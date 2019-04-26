User-flow

1) User sends /start to bot - Billy creates empty account for user.
2) Now user should give Billy contacts of friends with whom user wants to share bills
   > /add @kate @tom @johnny
   If somebody from this list is not yet registered in the system, bot responds with the next message:
   @kate @tom are not yet known to me :( send them invite link t.me/billy_sharer-bot and ask them to add you to contacts!

   Rules for adding a contact:
    1) Request should be made from both sides, only after that bot allows for sharing bills

3) 
  > /buy %Natural language description of what user bought, some limits for length is applied% @johhny @kate @%self-username%

  Bot sends messages with description and inline button to submit or reject purchase, everyone should accept in order for the record to be createds


4) 
  > /pay @kate 700

  Bot sends message witn inline button to the loan-giver, after loan-giver submits payment, debt is decreased for both users.

Thats it!