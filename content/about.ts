/**
 * The About copy. Plain data, so rewriting it never means touching a component.
 *
 * `intro` is the one paragraph on the splash page: what he believes, not what
 * he has done. The record — years, employers, products — is `body`'s job, on
 * /about. Keep both in a speaking voice, first person, and keep `intro` to a
 * claim someone could disagree with; a virtue no one would argue against says
 * nothing.
 */

export const intro =
  'I believe in empowered product teams: give people a hard problem, direct access to their customers, and a strategy they helped shape, and they will build something worth using.';

export const body: string[] = [  'I grew up in Portugal, studied Biochemistry and Bioinformatics, and found product after moving to Germany. Product felt familiar straight away: understand a real-world problem, form a hypothesis, look for evidence, and keep learning until you have a better answer. The medium changed from science to software, but the part I enjoy most did not.',

  'I have worked on products in solar engineering, workplace software, recruitment, marketplaces, and research. The industries differ, but the work usually starts in the same place: someone is trying to get something important done and the current way of doing it is harder than it needs to be. I like taking that complexity apart with the people closest to it.',

  'My approach is not rocket science. I spend as much time with users as the problem requires, understand what they are trying to achieve, map the journey, isolate the painful bits, and work with the team on the best way forward. Empathy, evidence, and honest collaboration beat a polished roadmap built around hype. I care a lot about empowered teams that can make good decisions together, rather than waiting for a PM to hand them answers.',

  'LLMs have become a practical part of how I work. I use them to bring scattered research, feedback, and ideas into a form I can think with and make decisions from. I also use them to turn ideas into simple working prototypes, often live with a team, so we can test behaviour and sharpen the approach before putting it in front of users. A prototype will not settle every question, but it makes assumptions visible and gives people something real to react to.',
];

/**
 * The personal side of /about, shown when the portrait flips. Hugo's own
 * words. "Bacalhau com Natas" in the last paragraph is linkified by
 * AboutFlip; the page passes the href.
 */
export const personal: string[] = [
  'I grew up in a little Portuguese town called Guarda and spent my university years in Porto. As a child of the 80s, I taped songs from the radio, had a first computer with dial-up internet that crashed whenever someone picked up the phone, and enjoyed the absolute best Saturday morning cartoons of any decade.',

  'Suffice to say, all that media growing up shaped who I am today. I didn\'t really discover my fondness for music until a bit later in life. These days I\'m a big fan of the campy 80s, the new 80s revival in the form of retrowave and synthwave, and the post-punk revival vibes of the mid 2000s. When focusing, I prefer to listen to videogame soundtracks.',

  'Which brings me to my other big hobby: gaming. Ever since I was young, I have been drawn to other worlds, digital ones, living adventures that were impossible except on a screen. I had a Sega Mega Drive in the 16-bit era, but I have been part of the PC crew for decades. I gravitate towards turn-based strategy, space-themed games, and RPGs, especially the sword and sorcery ones. My game library is way too large, and I know way too much about way too many games. I really don\'t see myself giving up this hobby anytime soon.',

  'Sometimes I do feel like visiting worlds in a more passive way. Star Trek: The Next Generation was part of my formative years, even if I was a bit too young to appreciate the themes it discussed. Together with Babylon 5 and Stargate SG-1, the three series form my golden triangle of sci-fi, another of my passions. When it comes to books, I tend to read transhumanist fiction, like Foundation or the Culture series, and hard science fiction in general.',

  'Last but not least, you may at times find me in the kitchen trying a new recipe, or at the latest Japanese or Italian place in town. Missing home-cooked meals when you live abroad is not easy! If you ever want to cook my favorite dish for me, here is the recipe: Bacalhau com Natas. Thank you for reading!',
];
