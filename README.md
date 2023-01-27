# DeckFinder

This app is meant for starting or returning players to HearthStone.

App is in development. Next information you read is work in progress, probably not even started :D

After login you can select what cards you own in the game and after that you can
look through the decks that are the best match for your owned cards.
You can create decks, save favourite decks, get a deckcode so you can import a
deck into your game.

App uses Battle.Net free APIs to get all up-to-date information and stores them
into DB through TypeORM.
User then works with our DB so cards and information are no longer dependent on third party API.

Create decks though will be dependent on Battle.net APIs since deckode for the game can be created only with their API.

This is my passion project. I hope it will see the light of the world.

Thanks to Senior Mentor/Contributor Adamkooo for guiding me in this project.

# Db Model

https://drawsql.app/teams/team-592/diagrams/deckfinder
