# main routes

mongodb://127.0.0.1:27017/DATABASE
localhost/1234/notes
create
read

update paths
?title - update title
?summary - update summary
?tags - update tags
?content - update content

localhost/1234/audio
create
read
edit (for transcripts only)

{
"audio_id": "audio.id",
"title": "The boy who cried Wolf"
"content": \`Markdown Ready Format \`
"chunks" : [{line: 0, "text" : "## Summary"}, {line: 1, "text" : "Summary of the first line. This should be a one liner og og og og"}]
"tags" : [{type: String, unique: true}]
}
