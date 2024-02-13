# another scuffed documentation

Use `npm i` on the commandline in to generate the requirements file.  
run `npm run dev` to simulate the server.

use the ff routes to communicate with the server what you want to do

127.0.0.1:1234/service/notes (POST || GET)
127.0.0.1:1234/service/edit-notes/:id (PATCH)
127.0.0.1:1234/service/delete-notes/:id (DELETE)

127.0.0.1:1234/service/audio (POST || GET)
127.0.0.1:1234/service/edit-audio (PATCH)
127.0.0.1:1234/service/delete-audio (DELETE)

note: :id means any VALID id from id value created by mongoDB

## example

On recent page

1. create a GET request to 127.0.0.1:1234/service/notes
2. will give back ALL the notes
3. some of it will have audio, but others don't
4. just get the text parts.

when the Card for the note is pressed

1. get the ID of that specific note
2. save the information to be passed as props later
3. proceed to a specific Single Page Router

when "create new note" button is pressed.

1. fill up the necessary fields
2. create a POST request to 127.0.0.1:1234/service/notes
3. nice the data is saved

when "creating new audio"

1. upload (or in the future updates, record using MIC) wav audio
2. Upload the file somewhere on the internet.
3. transcribe using POST request to 127.0.0.1:1234/service/audio
4.

when Mic is used (for future Naypes to figure out)

1. use mic
2. crete web socket on 127.0.0.1/service/mic-audio/
3. blob the audio from mic
4. create the fetch the result chunk immediately.
5. save to file
6. format in the correct way for DATABASE
