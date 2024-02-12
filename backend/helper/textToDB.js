/**
# Title
- Embracing Adaptability and Resilience in the Modern Era

# Tags
- Technology
- Innovation
- Adaptability
- Resilience

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
2. Uncertainty may cause anxiety and fear of the unknown.
Summarized notes
 */

/**
# Title
1. Ask not what your country can do for you
# Tags
1. Patriotism, Service, John F. Kennedy
## Summary
20 words: JFK's call to service and patriotism
## Highlight
"Ask not what your country can do for you, ask what you can do for your country." - John F. Kennedy
## Supporting Ideas
1. Emphasizing the importance of individual contribution to the nation
2. Encouraging citizens to take responsibility and be active participants in society
3. Promoting a sense of unity and shared purpose among Americans
## Counter Arguments
1. Some may argue that the government should prioritize helping its citizens first
2. Others might say that not everyone is able to contribute equally due to various circumstances
3. Critics could claim that this mindset perpetuates individualism over collective action
 */
async function formatToDB(userInput) {
  const title = userInput.split("# **title**");
  return Promise.resolve({ title, content, tags });
}

export { formatToDB };
