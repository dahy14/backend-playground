// fuck this shit
// split text from title, tags, content ....

const s = `# Title
- Embracing Adaptability and Resilience in the Modern Era
# Tags
1. Patriotism, Service, John F. Kennedy
## Summary
- Navigating modern technology's rapid pace of change.
## Highlight
- Cultivating adaptability and resilience in a complex landscape of information abundance.
## Supporting Ideas
1. Artificial intelligence is shaping our lives.
2. Social media proliferation has blurred boundaries.
3. Embracing new ideas and uncertainty is essential.
4. A growth mindset and curiosity foster adaptability.
## Counter Arguments
1. Adapting to change can be challenging for some individuals.
2. Uncertainty may cause anxiety and fear of the unknown.`;

const titleIndex = s.indexOf("Title");
const tagIndex = s.indexOf("Tag");
const sumIndex = s.indexOf("Summary");

// some weird magic number to annoy people reading it. very very arbitrary and can be modified depending on the input
const title = s.slice(titleIndex + 5, tagIndex - 3);
const tag = s.slice(tagIndex + 4, sumIndex - 4);
const summary = s.slice(sumIndex - 3);

console.log(`${titleIndex}, ${tagIndex}, ${sumIndex}`);

const Title = title.match(/[a-zA-Z](.*)/g);
const Tag = tag.match(/[\w\s]+(?:,|\n|$)/g);
console.log(Title.toString());
console.log(Tag);
console.log(summary);
